export = Parser;
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
 * @typedef {'lexem'|'brackets'|'string'|'command'} type_lexem_type
 */
/**
 * @typedef type_lexem
 * @property {type_lexem_type} type
 * @property {string} [final]
 * @property {type_lexem[]} [child]
 */
declare class Parser {
    /**
     * @param {type_options} options
     */
    constructor(options: type_options);
    options: {
        string_border: any[];
        end_of_command: any[];
        end_of_command_has_enter: () => boolean;
        one_string_comment: string;
        brackets: {
            left: string;
            right: string;
        }[];
        all_lexems: any[];
    };
    /**
     * @param {string} text
     * @returns {string}
     */
    remove_comment(text: string): string;
    /**
    * @param {string} text
    * @returns {string[]}
    */
    lexemify_plain(text: string): string[];
    /**
    * @param {string} text
    * @param {number} [depth]
    * @returns {type_lexem[]}
    */
    lexemify_tree(text: string, depth?: number): type_lexem[];
    /**
     * @param {type_lexem[]} lexems
     * @returns {type_lexem[][]}
     */
    commandify_lexem_tree(lexems: type_lexem[]): type_lexem[][];
    /**
     * @param {type_lexem_type} type
     * @param {type_lexem[]} lexems
     * @returns {type_lexem}
     * */
    lexem_splice(type: type_lexem_type, lexems: type_lexem[]): type_lexem;
}
declare namespace Parser {
    export { type_options_bracket, type_options, type_lexem_type, type_lexem };
}
type type_lexem = {
    type: type_lexem_type;
    final?: string;
    child?: type_lexem[];
};
type type_lexem_type = "string" | "lexem" | "brackets" | "command";
type type_options = {
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
    brackets?: type_options_bracket | type_options_bracket[];
};
type type_options_bracket = {
    left: string;
    right: string;
};
