export type type_from_text = {
    /**
     * example !SECTION_
     */
    paragraph_prefix: string;
    /**
     * exampe "//"
     */
    one_string_comment?: string;
    known_paragraph?: type_known_paragraph[];
};
export type type_known_paragraph = {
    paragraph: string;
    description: string;
};
export type type_paraco = {
    paragraph: string;
    paragraph_description: string;
    text: string;
};
/**
 * @param {string} text
 * @param {type_from_text} options
 * @returns {type_paraco[]}
 */
export function from_text(text: string, options: type_from_text): type_paraco[];
import vvs = require("./index.js");
