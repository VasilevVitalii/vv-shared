//@ts-check
const os = require('os')
const vvs = require('./index.js')



/**
 * @typedef type_options_bracket
 * @property {string} left
 * @property {string} right
 */

/**
 * @typedef type_options
 * @property {string|string[]} [string_border] example "'", '"'
 * @property {string|string[]} [end_of_command] exampe ";"
 * @property {string} [one_string_comment] exampe "//"
 * @property {type_options_bracket|type_options_bracket[]} [brackets] example left = '(', right = ')'
 */

/**
 * @typedef type_lexem
 * @property {'final'|'bracked'|'command'} type
 * @property {string} [final]
 * @property {type_lexem[]} [child]
 */

class Parser {

    /**
     * @param {type_options} options
     */
    constructor(options) {
        /** @type {type_options} */
        let o = vvs.isEmpty(options) ? {} : options

        let string_border = vvs.toArray(o.string_border, 'string').filter(f => !vvs.isEmptyString(f))
        let end_of_command = vvs.toArray(o.end_of_command, 'string').filter(f => !vvs.isEmptyString(f))
        let brackets = vvs.toArray(o.brackets).filter(f => !vvs.isEmpty(f) && !vvs.isEmptyString(f.left) && !vvs.isEmptyString(f.right)).map(m => { return {left: vvs.toString(m.left), right: vvs.toString(m.right)} })
        let one_string_comment = vvs.toString(o.one_string_comment, '')

        let all_lexems = [].concat(
            string_border,
            end_of_command,
            [one_string_comment].filter(f => !vvs.isEmptyString(f)),
            brackets.map(m => { return m.left }),
            brackets.map(m => { return m.right }),
        )

        let doubles_in_lexems = vvs.duplicates(all_lexems)
        if (doubles_in_lexems.length > 0) {
            throw new Error(vvs.format('lexem(s) "{0}" occur more than once', doubles_in_lexems.join('", "') ))
        }

        let long_lexems = all_lexems.filter(f => f.length > 1 && !vvs.equal(f, one_string_comment))
        if (long_lexems.length > 0) {
            throw new Error(vvs.format('lexem(s) "{0}" too long, permissible maximum length = 1 char', long_lexems.join('", "') ))
        }

        this.options = {
            string_border: string_border,
            end_of_command: end_of_command,
            one_string_comment: one_string_comment,
            brackets: brackets,
            all_lexems: all_lexems
        }
    }

    /**
     * @param {string} text
     * @returns {string}
     */
    remove_comment(text) {
        if (vvs.isEmptyString(text) || vvs.isEmptyString(this.options.one_string_comment)) return text
        let text_without_comment = []
        text.split(os.EOL).forEach(line => {
            let sublines = line.split(this.options.one_string_comment)
            if (sublines.length <= 1) {
                text_without_comment.push(line)
                return
            }

            let count_string_border = this.options.string_border.map(m => { return 0 })
            let regex_string_border = this.options.string_border.map(m => { return new RegExp(m, 'g') })

            for (let s_idx = 0; s_idx < sublines.length; s_idx++) {
                regex_string_border.forEach((b, b_idx) => {
                    count_string_border[b_idx] = count_string_border[b_idx] + (sublines[s_idx].match(b) || []).length
                })
                let even = true
                count_string_border.forEach(cnt => {
                    if (cnt > 0 && cnt % 2 !== 0) {
                        even = false
                    }
                })
                if (even === true) {
                    text_without_comment.push(sublines.slice(0, s_idx + 1).join(this.options.one_string_comment))
                    return
                }
            }
        })
        return text_without_comment.join(os.EOL)
    }

    /**
    * @param {string} text
    * @returns {string[]}
    */
    lexemify_plain(text) {
        text = vvs.toString(text, '')
        let result = []
        let line = ''

        /** @type {string[]} */
        let opening_string = []
        /** @type {string[]} */
        let opening_bracked = []

        let spaces = [
            String.fromCharCode(160),   //non-breaking space
            String.fromCharCode(9),     //tab
        ]
        spaces.forEach(b_s => {
            text = vvs.replaceAll(text, b_s, ' ')
        })
        text = this.remove_comment(text).trim()
        if (this.options.end_of_command.length > 0) {
            text = vvs.border_del(text, this.options.end_of_command[0], undefined)
            text = vvs.border_add(text, undefined, this.options.end_of_command[0])
        }

        let eol_to_space = !this.options.all_lexems.includes(os.EOL)

        for (let i = 0; i < text.length; i++) {
            let char = text[i]
            if (char === os.EOL && eol_to_space) char = ' '

            //maybe escape symb?
            if (char === '\\') {
                let next_char = (text.length > i + 1 ? text[i + 1] : undefined)
                if (!vvs.isEmpty(next_char) && this.options.all_lexems.includes(next_char)) {
                    line = line.concat(next_char)
                    i++
                } else {
                    line = line.concat(char)
                }
                continue
            }

            //processing string
            if (this.options.string_border.some(f => vvs.equal(f, char)) && opening_bracked.length <= 0) {
                if (opening_string.length <= 0) {
                    result.push(line)
                    line=''
                }
                if (opening_string.length > 0) {
                    if (opening_string[opening_string.length - 1] === char) {
                        opening_string.splice(opening_string.length - 1, opening_string.length)
                    } else {
                        opening_string.push(char)
                        line = line.concat(char)
                    }
                } else {
                    opening_string.push(char)
                    line = line.concat(char)
                }
                if (opening_string.length <= 0) {
                    line = line.concat(char)
                    result.push(line)
                    line=''
                }
                continue
            }

            //processing open brackets
            if (this.options.brackets.some(f => f.left === char) && opening_string.length <= 0) {
                if (opening_bracked.length <= 0) {
                    result.push(line)
                    line=''
                }
                line = line.concat(char)
                opening_bracked.push(char)
                continue
            }

            //processing close brackets
            if (opening_string.length <= 0) {
                let bracket = this.options.brackets.find(f => vvs.equal(f.right, char))
                if (!vvs.isEmpty(bracket)) {
                    if (opening_bracked.length <= 0 || vvs.equal(opening_bracked[opening_bracked.length - 1], bracket.right)) {
                        throw new Error (vvs.format('incorrect sequence of opening and closing brackets detected'))
                    }
                    opening_bracked.splice(opening_bracked.length - 1, opening_bracked.length)
                    if (opening_bracked.length <= 0) {
                        line = line.concat(char)
                        result.push(line)
                        line=''
                    } else {
                        line = line.concat(char)
                    }
                    continue
                }
            }

            //processing end of command
            if (opening_bracked.length <= 0 && opening_string.length <= 0 && this.options.end_of_command.some(f => vvs.equal(f, char))) {
                if (!vvs.isEmptyString(line)) {
                    result.push(line)
                    line = ''
                }
                result.push(char)
                continue
            }

            if (opening_bracked.length <= 0 && opening_string.length <= 0 && char === ' ') {
                if (!vvs.isEmptyString(line)) {
                    result.push(line)
                    line = ''
                }
                continue
            }

            line = line.concat(char)
        }
        if (opening_bracked.length > 0) {
            throw new Error (vvs.format('incorrect sequence of opening and closing brackets detected'))
        }
        if (opening_string.length > 0) {
            throw new Error (vvs.format('incorrect sequence of opening and closing string detected'))
        }

        return result.filter(f => !vvs.isEmptyString(f)).map(m => { return m.trim() })
    }

    /**
    * @param {string} text
    * @param {number} [depth]
    * @returns {type_lexem[]}
    */
    lexemify_tree(text, depth) {
        /** @type {type_lexem[]} */
        let result = []
        tree_bracked(text, this, result, vvs.toInt(depth))
        return result
    }
}

/**
 * @param {string} text
 * @param {Parser} parser
 * @param {type_lexem[]} [result]
 * @param {number} depth
 */
function tree_command(text, parser, result, depth) {
    if (!vvs.isEmpty(depth)) {
        depth--
    }
    let plain = parser.lexemify_plain(text)
    /** @type {type_lexem[]} */
    let commands = []


    // plain.forEach((item, idx_item) => {
    //     if (vvs.isEmptyString(item)) return

    //     if (!vvs.isEmpty(depth) && depth < 0) {
    //         result.push({type: 'final', final: item})
    //         return
    //     }

    //     let end_of_command = parser.options.end_of_command.find(f => vvs.equal(f, item[0]))
    //     if (vvs.isEmpty(fnd_bracked)) {
    //         result.push({type: 'final', final: item})
    //         return
    //     }

    //     result.push({
    //         type: "bracked",
    //         child: []
    //     })

    //     tree_bracked(item.substring(1, item.length - 1), parser, result[result.length - 1].child, depth)
    // })
}

/**
 * @param {string} text
 * @param {Parser} parser
 * @param {type_lexem[]} [result]
 * @param {number} depth
 */
function tree_bracked(text, parser, result, depth) {
    if (!vvs.isEmpty(depth)) {
        depth--
    }
    let plain = parser.lexemify_plain(text)
    plain.forEach((item, idx_item) => {
        if (vvs.isEmptyString(item)) return

        if (!vvs.isEmpty(depth) && depth < 0) {
            result.push({type: 'final', final: item})
            return
        }

        let fnd_bracked = parser.options.brackets.find(f => vvs.equal(f.left, item[0]))
        if (vvs.isEmpty(fnd_bracked)) {
            result.push({type: 'final', final: item})
            return
        }

        result.push({
            type: "bracked",
            child: []
        })

        tree_bracked(item.substring(1, item.length - 1), parser, result[result.length - 1].child, depth)
    })
}

module.exports = Parser