// @ts-check
const fs = require('fs')
const path = require('path')
const { isDate } = require('util')
const lib_simplest = require('./simplest.js')
const lib_parser = require('./parser.js')
const lib_paraco = require('./paraco.js')

const simplest = new lib_simplest()

exports.isEmpty=simplest.isEmpty
exports.isEmptyString=simplest.isEmptyString
exports.isFunction=simplest.isFunction
exports.isGuid=simplest.isGuid
exports.nz=simplest.nz
exports.equal=simplest.equal
exports.duplicates=simplest.duplicates

exports.toString=simplest.toString
exports.toStringDeclension=simplest.toStringDeclension
exports.toInt=simplest.toInt
exports.toFloat=simplest.toFloat
exports.toBool= simplest.toBool
exports.toGuid=simplest.toGuid
exports.toDate= simplest.toDate
exports.toDateWithoutTime=simplest.toDateWithoutTime
exports.toTime= simplest.toTime
exports.toIp=simplest.toIp
exports.toArray=simplest.toArray
exports.toCharArray=simplest.toCharArray
exports.toErrorMessage=simplest.toErrorMessage
exports.toHtml=simplest.toHtml
exports.toHex=simplest.toHex
exports.roundFload = simplest.roundFload

exports.split=simplest.split
exports.insertAt=simplest.insertAt
exports.replaceAll=simplest.replaceAll
exports.format=simplest.format
exports.formatExt=simplest.formatExt
exports.formatDate=simplest.formatDate

exports.cutFromArray=simplest.cutFromArray

exports.dateAdd = simplest.dateAdd

exports.findPropertyInObject=simplest.findPropertyInObject
exports.findPropertyExistsInObject=simplest.findPropertyExistsInObject
exports.findPropertyValueInObject=simplest.findPropertyValueInObject

exports.border_add = simplest.border_add
exports.border_del = simplest.border_del

exports.text_page_char = simplest.text_page_char
exports.text_page_byte = simplest.text_page_byte
exports.guid = simplest.guid

exports.parser = parser
exports.paraco = lib_paraco
exports.readdir = readdir

/**
 * @typedef {lib_parser.type_options} parser_options
 */
/**
 * @typedef {lib_parser.type_lexem} parser_lexem
 */
/**
 * @typedef {lib_parser.type_lexem_type} parser_lexem_type
 */

/**
 * Simple parser for, example, js code or sql code
 * @param {parser_options} parser_options
 * @returns {lib_parser}
 * @example
 * let parser = require('vv-shared').parser({ brackets: {left: '(', right: ')'}, end_of_command: [';'], string_border: ['"', "'"], one_string_comment: "//"})
 * let text = [
 *     'let a = "hello!"  // i am comment',
 *     'let b = (2 + 3) * 5'
 * ].join(require('os').EOL)
 *
 * let a = parser.remove_comment(text)
 * let b = parser.lexemify_plain(text)
 * let c = parser.lexemify_tree(text)
 */
function parser(parser_options) {
    return new lib_parser(parser_options)
}

/**
 * @typedef type_readdir_options
 * @property {'files'|'paths'|'all'} mode
 */
/**
 * @typedef type_readdir
 * @property {string} path
 * @property {string} file
 * @property {number} size_bytes
 * @property {Date} date_create
 * @property {Date} date_edit
 */
/**
 * @private
 * @callback callback_readdir
 * @param {Error} error
 * @param {type_readdir[]} files
 */
/**
 * Recursive scan directory
 * @static
 * @param {string} dir
 * @param {type_readdir_options} options
 * @param {callback_readdir} callback
 * @example
 * require('vv-shared').readdir(__dirname, undefined, (error, files) => {console.log(files)} )
 */
function readdir(dir, options, callback) {
    let already_send_callback = false
    if (simplest.isEmpty(options)) {
        options = {
            mode: 'files'
        }
    } else {
        if (simplest.isEmpty(options.mode)) options.mode = 'files'
    }
    readdir_private(dir, options, (error, files) => {
        if (already_send_callback) return
        already_send_callback = true
        callback(
            error,
            simplest.isEmpty(files) || !Array.isArray(files) ? undefined : files.sort((a,b) => {
                if (a.path < b.path) return -1
                if (a.path > b.path) return 1
                let e_a = simplest.isEmptyString(a)
                let e_b = simplest.isEmptyString(b)
                if (e_a && !e_b) return -1
                if (!e_a && e_b) return 1
                if (a.file < b.file) return -1
                if (a.file > b.file) return 1
                return 0
            })
        )
    })
}

/**
 * @private
 * @param {string} dir
 * @param {type_readdir_options} options
 * @param {callback_readdir} callback
 */
function readdir_private(dir, options, callback) {
    /** @type {type_readdir[]} */
    let files = []

    fs.readdir(dir, (error, list) => {
        if (!simplest.isEmpty(error)) {
            callback(new Error(simplest.toErrorMessage(error, 'on read dir "{0}"', dir, 'message')), undefined)
        }
        let pending = list.length
        if (!pending) callback(undefined, files)

        list.forEach(file_relative => {
            let file_absolute = path.resolve(dir, file_relative)
            fs.stat(file_absolute, function(error, stat) {
                if (!simplest.isEmpty(error)) {
                    callback(new Error(simplest.toErrorMessage(error, 'on get stat for file/dir "{0}"', file_absolute, 'message')), undefined)
                }
                if (!simplest.isEmpty(stat)) {
                    if (stat.isDirectory()) {
                        if ((options.mode === 'all' || options.mode === 'paths')) {
                            files.push({
                                file: undefined,
                                path: file_absolute,
                                size_bytes: undefined,
                                date_create: stat.birthtime,
                                date_edit: stat.mtime
                            })
                        }
                        readdir_private(file_absolute, options, function(error, res) {
                            if (!simplest.isEmpty(error)) {
                                callback(error, undefined)
                            }
                            files = files.concat(res)
                            if (!--pending) callback(undefined, files)
                        })
                    } else if (stat.isFile()) {
                        if ((options.mode === 'all' || options.mode === 'files')) {
                            files.push({
                                file: file_relative,
                                path: dir,
                                size_bytes: stat.size,
                                date_create: stat.birthtime,
                                date_edit: stat.mtime
                            })
                        }
                        if (!--pending) callback(undefined, files)
                    }
                }
            })
        })
    })
}