//@ts-check
const os = require('os')
const vvs = require('./index.js')
const lib_parser = require('./parser.js')

/**
 * @typedef type_from_text
 * @property {string} paragraph_prefix example !SECTION_
 * @property {string} [one_string_comment] exampe "//"
 * @property {type_known_paragraph[]} [known_paragraph]
 */

/**
 * @typedef type_known_paragraph
 * @property {string} paragraph
 * @property {string} description
 */

/**
 * @typedef type_paraco
 * @property {string} paragraph
 * @property {string} paragraph_description
 * @property {string} text
 */

exports.from_text = from_text

/**
 * @param {string} text
 * @param {type_from_text} options
 * @returns {type_paraco[]}
 */
function from_text(text, options) {
    if (vvs.isEmptyString(text)) return []

    /** @type {type_paraco[]} */
    let result = []

    /** @type {type_from_text} */
    let o = vvs.isEmpty(options) ? {paragraph_prefix: undefined} : options
    let paragraph_prefix = vvs.toString(o.paragraph_prefix, '')
    let one_string_comment = vvs.toString(o.one_string_comment, '')
    let known_paragraph = vvs.isEmpty(o.known_paragraph) || !Array.isArray(o.known_paragraph) ? [] : o.known_paragraph

    if (vvs.isEmptyString(paragraph_prefix)) {
        throw new Error ('paragraph_prefix is empty')
    }

    let items1 = text.split(os.EOL)
    let items2 = vvs.isEmptyString(one_string_comment) ? [...items1] : new lib_parser({one_string_comment: one_string_comment}).remove_comment(text).split(os.EOL)

    /** @type {string} */
    let current_paragraph = undefined
    /** @type {string} */
    let current_paragraph_description = undefined
    /** @type {string[]} */
    let current_text = []

    let len = items2.length

    items2.forEach((item, idx) => {
        let paragraph_maybe = item.trim()
        if (!vvs.equal(paragraph_maybe.substring(0, paragraph_prefix.length), paragraph_prefix)) {
            current_text.push(items1[idx])
            return
        }

        result.push({
            paragraph: current_paragraph,
            paragraph_description: current_paragraph_description,
            text: current_text.join(os.EOL)
        })
        current_paragraph = paragraph_maybe
        current_paragraph_description = vvs.findPropertyValueInObject(known_paragraph.find(f => vvs.equal(f.paragraph, current_paragraph)), 'description')
        current_text = []
    })

    if (current_text.length > 0) {
        result.push({
            paragraph: current_paragraph,
            paragraph_description: current_paragraph_description,
            text: current_text.join(os.EOL)
        })
    }

    return result
}

// class Paraco {

//     /**
//      * @param {type_options} options
//      */
//     constructor(options) {
//         /** @type {type_options} */
//         let o = vvs.isEmpty(options) ? {paragraph_prefix: undefined} : options

//         let paragraph_prefix = vvs.toString(o.paragraph_prefix, '')
//         if (vvs.isEmptyString(paragraph_prefix)) {
//             throw new Error ('paragraph_prefix is empty')
//         }
//         let one_string_comment = vvs.toString(o.one_string_comment, '')

//         this.options = {
//             paragraph_prefix: paragraph_prefix,
//             one_string_comment: one_string_comment
//         }
//     }
// }

// module.exports = Paraco