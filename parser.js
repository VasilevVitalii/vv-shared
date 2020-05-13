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
 * @property {'final'|'child'} type
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

        /** @type {string[]} */
        let string_border = []
        vvs.toArray(o.string_border, 'string').filter(f => !vvs.isEmptyString(f)).forEach(item => {
            if (item.length > 1) {
                throw new Error(vvs.format('bad string border "{0}": len must be 1 char', item))
            }
            if (string_border.some(f => vvs.equal(f, item))) {
                throw new Error(vvs.format('bad string border "{0}": this value already exists', item))
            }
            string_border.push(item)
        })

        /** @type {string[]} */
        let end_of_command = []
        vvs.toArray(o.end_of_command, 'string').filter(f => !vvs.isEmptyString(f)).forEach(item => {
            if (item.length > 1) {
                throw new Error(vvs.format('bad end of command "{0}": len must be 1 char', item))
            }
            if (end_of_command.some(f => vvs.equal(f, item))) {
                throw new Error(vvs.format('bad end of command "{0}": this value already exists', item))
            }
            end_of_command.push(item)
        })

        /** @type {type_options_bracket[]} */
        let brackets = []
        vvs.toArray(o.brackets).filter(f => !vvs.isEmpty(f)).forEach(item => {
            if (vvs.isEmptyString(item.left)) {
                throw new Error(vvs.format('bad brackets: left bracket is empty'))
            }
            if (vvs.isEmptyString(item.right)) {
                throw new Error(vvs.format('bad brackets: right bracket is empty'))
            }
            if (item.left.length > 1) {
                throw new Error(vvs.format('bad brackets "{0} {1}": left bracket len must be 1 char', [item.left, item.right]))
            }
            if (item.right.length > 1) {
                throw new Error(vvs.format('bad brackets "{0} {1}": right bracket len must be 1 char', [item.left, item.right]))
            }
            if (vvs.equal(item.left, item.right)) {
                throw new Error(vvs.format('bad brackets "{0} {1}": left and right brackets are equal', [item.left, item.right]))
            }
            if (brackets.some(f => vvs.equal(f.left, item.left))) {
                throw new Error(vvs.format('bad brackets "{0} {1}": this value (left bracket) already exists', [item.left, item.right]))
            }
            if (brackets.some(f => vvs.equal(f.left, item.right))) {
                throw new Error(vvs.format('bad brackets "{0} {1}": this value (left bracket) already exists', [item.left, item.right]))
            }
            if (brackets.some(f => vvs.equal(f.right, item.right))) {
                throw new Error(vvs.format('bad brackets "{0} {1}": this value (right bracket) already exists', [item.left, item.right]))
            }
            if (brackets.some(f => vvs.equal(f.right, item.left))) {
                throw new Error(vvs.format('bad brackets "{0} {1}": this value (right bracket) already exists', [item.left, item.right]))
            }
            brackets.push(item)
        })

        this.options = {
            string_border: string_border,
            end_of_command: end_of_command,
            one_string_comment: vvs.toString(o.one_string_comment),
            brackets: brackets,
            important_char: char => {
                return  brackets.some(f => f.left === char || f.right === char) ||
                        end_of_command.includes(char) ||
                        string_border.includes(char)
            }
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

        let eol_to_space = !this.options.important_char(os.EOL)

        for (let i = 0; i < text.length; i++) {
            let char = text[i]
            if (char === os.EOL && eol_to_space) char = ' '

            //maybe escape symb?
            if (char === '\\') {
                let next_char = (text.length > i + 1 ? text[i + 1] : undefined)
                if (!vvs.isEmpty(next_char) && this.options.important_char(next_char)) {
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

            if (opening_bracked.length <= 0 && opening_string.length <= 0 && (char === ' ' || this.options.end_of_command.some(f => vvs.equal(f, char)))) {
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
        tree(text, this, result, vvs.toInt(depth))
        return result
    }
}

/**
 * @param {string} text
 * @param {Parser} parser
 * @param {type_lexem[]} [result]
 * @param {number} depth
 */
function tree(text, parser, result, depth) {
    if (!vvs.isEmpty(depth)) {
        depth--
    }
    let plain = parser.lexemify_plain(text)
    plain.forEach(item => {
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
            type: "child",
            child: []
        })

        tree(item.substring(1, item.length - 1), parser, result[result.length - 1].child, depth)
    })
}

module.exports = Parser