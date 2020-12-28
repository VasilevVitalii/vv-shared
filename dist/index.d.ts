export type parser_options = {
    /**
     * example "'", '"'
     */
    string_border?: string | string[];
    /**
     * exampe ";"
     */
    end_of_command?: string | string[];
    /**
     * exampe "//"
     */
    one_string_comment?: string;
    /**
     * example left = '(', right = ')'
     */
    brackets?: lib_parser.type_options_bracket | lib_parser.type_options_bracket[];
};
export type parser_lexem = {
    type: lib_parser.type_lexem_type;
    final?: string;
    child?: lib_parser.type_lexem[];
};
export type parser_lexem_type = "string" | "lexem" | "brackets" | "command";
export type type_readdir_options = {
    mode: 'files' | 'paths' | 'all';
};
export type type_readdir = {
    path: string;
    file: string;
    size_bytes: number;
    date_create: Date;
    date_edit: Date;
};
export type callback_readdir = (error: Error, files: type_readdir[]) => any;
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
export function parser(parser_options: parser_options): lib_parser;
import lib_paraco = require("./paraco.js");
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
export function readdir(dir: string, options: type_readdir_options, callback: callback_readdir): void;
import lib_parser = require("./parser.js");
export { isEmpty, isEmptyString, isFunction, isGuid, nz, equal, duplicates, toString, toStringDeclension, toInt, toFloat, toBool, toGuid, toDate, toDateWithoutTime, toTime, toIp, toArray, toCharArray, toErrorMessage, toHtml, toHex, roundFload, split, insertAt, replaceAll, format, formatExt, formatDate, cutFromArray, dateAdd, findPropertyInObject, findPropertyExistsInObject, findPropertyValueInObject, border_add, border_del, text_page_char, text_page_byte, guid, lib_paraco as paraco };
