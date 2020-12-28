export = Simplest;
declare class Simplest {
    /**
     * @typedef type_text_page_char
     * @property {number} step
     * @property {number} position_start
     * @property {number} text_length
     * @property {number} offset_length
    */
    /**
     * @typedef type_text_page_byte
     * @property {number} step
     * @property {number} position_start
     * @property {number} position_end
    */
    /**
     * Check object for undefined, null, NaN
     * @static
     * @param {any} object object for check
     * @returns {boolean}
     */
    isEmpty(object: any): boolean;
    /**
     * isEmpty + .trim() + check len > 0
     * @static
     * @param {any} object object for check
     * @returns {boolean}
     */
    isEmptyString(object: any): boolean;
    /**
     * Check object for function
     * @static
     * @param {any} object object for check
     * @returns {boolean}
     */
    isFunction(object: any): boolean;
    /**
     * Check object for GUID
     * @static
     * @param {any} object object for check
     * @returns {boolean} always boolean (no undefined)
     * @example
     * console.log(require('vv-shared').isGuid(undefined)) // return false
     * console.log(require('vv-shared').isGuid(null)) // return false
     * console.log(require('vv-shared').isGuid('')) // return false
     * console.log(require('vv-shared').isGuid('A36E9853-7118-4CC2-B770-765FCF05A82B')) // return true
     */
    isGuid(object: any): boolean;
    /**
     * Return first non-empty parameter
     * @static
     * @param {any} object1
     * @param {any} object2
     * @param {any} [object3]
     * @param {any} [object4]
     * @param {any} [object5]
     * @returns {any}
     */
    nz(object1: any, object2: any, object3?: any, object4?: any, object5?: any): any;
    /**
     * Equal two objects
     * @static
     * @param {any} object1
     * @param {any} object2
     * @returns {boolean}
     */
    equal(object1: any, object2: any): boolean;
    /**
     * Return array with duplicates items from string array (after trim and toLowerCase)
     * @static
     * @param {string[]} where_find_duplicates
     * @returns {string[]}
     */
    duplicates(where_find_duplicates: string[]): string[];
    /**
     * Convert object to string
     * @static
     * @param {any} value object for convert
     * @param {any} [default_value] default value
     * @returns {string} string or undefined
     * @example
     * console.log(require('vv-shared').toString(undefined)) // return undefined
     * console.log(require('vv-shared').toString(undefined,'my default string')) // return 'my default string'
     * console.log(require('vv-shared').toString({a: 5},'my default string')) // return 'my default string'
     * console.log(require('vv-shared').toString([1,2,3],'my default string')) // return 'my default string'
     * console.log(require('vv-shared').toString('','my default string')) // return empty string
     * console.log(require('vv-shared').toString(new Date(),'my default string')) // return formatDate(..., 126)
     * console.log(require('vv-shared').toString(45,'my default string')) // return '45'
     * console.log(require('vv-shared').toString('hello','my default string')) // return 'hello'
     */
    toString(value: any, default_value?: any): string;
    /**
     * Add phrase to int
     * @static
     * @param {number} value int for add phrase
     * @param {string} phrase_one
     * @param {string} phrase_two
     * @param {string} phrase_few
     * @returns {string}
     * @example console.log(require('vv-shared').toStringDeclension(5, 'найдена', 'найдено', 'найдены'))
     */
    toStringDeclension(value: number, phrase_one: string, phrase_two: string, phrase_few: string): string;
    /**
     * Convert object to integer
     * @static
     * @param {any} value object for convert
     * @param {any} [default_value] default value
     * @returns {number} integer or undefined
     * @example
     * console.log(require('vv-shared').toInt('abc')) // return undefined
     * console.log(require('vv-shared').toInt('abc','xyz')) // return undefined
     * console.log(require('vv-shared').toInt('77',42)) // return 77
     * console.log(require('vv-shared').toInt('-77',42)) // return -77
     * console.log(require('vv-shared').toInt('77.2',42)) // return 42
     */
    toInt(value: any, default_value?: any): number;
    /**
     * Convert object to float
     * @static
     * @param {any} value object for convert
     * @param {any} [default_value] default value
     * @returns {number} float or undefined
     * @example
     * console.log(require('vv-shared').toFloat('abc')) // return undefined
     * console.log(require('vv-shared').toFloat('abc','xyz')) // return undefined
     * console.log(require('vv-shared').toFloat('abc','-42.42')) // return -42.42
     * console.log(require('vv-shared').toFloat('77',42)) // return 77
     * console.log(require('vv-shared').toFloat('77.2',42)) // return 77.2
     * console.log(require('vv-shared').toFloat('-77.2',42)) // return -77.2
     */
    toFloat(value: any, default_value?: any): number;
    /**
     * Convert object to boolean
     * @static
     * @param {any} value object for convert
     * @param {any} [default_value] default value
     * @returns {boolean} boolean or undefined
     * @example
     * console.log(require('vv-shared').toBool(2)) // return undefined
     * console.log(require('vv-shared').toBool('abc')) // return undefined
     * console.log(require('vv-shared').toBool('abc','false')) // return false
     * console.log(require('vv-shared').toBool(0)) // return true
     * console.log(require('vv-shared').toBool(1)) // return true
     * console.log(require('vv-shared').toBool('TruE')) // return true
     * console.log(require('vv-shared').toBool('true')) // return true
     * console.log(require('vv-shared').toBool('1')) // return true
     */
    toBool(value: any, default_value?: any): boolean;
    /**
     * Convert object to guid
     * @static
     * @param {any} value object for convert
     * @param {any} [default_value] default value
     * @returns {string} guid or undefined
     * @example
     * console.log(require('vv-shared').toGuid(undefined)) // return undefined
     * console.log(require('vv-shared').toGuid('')) // return undefined
     * console.log(require('vv-shared').toGuid('A36E9853-7118-4CC2-B770-765FCF05A82B')) // return 'A36E9853-7118-4CC2-B770-765FCF05A82B'
     */
    toGuid(value: any, default_value?: any): string;
    /**
     * Convert object to date (with current GMT)
     * @static
     * @param {any} [value] object for convert
     * @param {any} [default_value] default value
     * @returns {Date} date or undefined
     * @example
     * console.log(require('vv-shared').toDate('2018-04-12T16:35:49')) // return true date
     * console.log(require('vv-shared').toDate('2018-04-12T16:35:49.1')) // return true date
     * console.log(require('vv-shared').toDate('2018-04-12T16:35:49.12')) // return true date
     * console.log(require('vv-shared').toDate('2018-04-12T16:35:49.123')) // return true date
     * console.log(require('vv-shared').toDate('2018-04-12T16:35:49.1234')) // return true date
     * console.log(require('vv-shared').toDate('2018-04-12T16:35:49.12345')) // return true date
     * console.log(require('vv-shared').toDate('2018-04-12T16:35:49.123456')) // return true date
     * console.log(require('vv-shared').toDate('2018-04-12T16:35:49.1234567')) // return true date
     * console.log(require('vv-shared').toDate('2018-04-12T16:35:49.12345678')) // return true date
     * console.log(require('vv-shared').toDate('2018-04-12T16:35:49.123456789')) // return true date
     * console.log(require('vv-shared').toDate('2018-04-12T16:35:49.123+03:00')) // return true date WITH CURRENT GMT (ignore +03 from example)
     * console.log(require('vv-shared').toDate('2018-04-12T16:35:49.123Z')) // return true date
     * console.log(require('vv-shared').toDate('2018-04-12')) // return true date
     * console.log(require('vv-shared').toDate('12.04.2018')) // return true date
     * console.log(require('vv-shared').toDate('12.04.2018 16:35')) // return true date
     * console.log(require('vv-shared').toDate('12.04.2018 16:35:49')) // return true date
     * console.log(require('vv-shared').toDate('12-04-2018')) // return true date
     * console.log(require('vv-shared').toDate('12-04-2018 16:35')) // return true date
     * console.log(require('vv-shared').toDate('12-04-2018 16:35:49')) // return true date
     * console.log(require('vv-shared').toDate('20180412')) // return true date
     */
    toDate(value?: any, default_value?: any): Date;
    /**
     * Convert object to date without time
     * @static
     * @param {any} value object for convert
     * @param {any} [default_value] default value
     * @returns {Date} date without time or undefined
     * @example // because this based on toDate() with add cut off time, get them examples and change toDate to toDateWithoutTime
     */
    toDateWithoutTime(value: any, default_value?: any): Date;
    /**
     * Convert object to date 01.01.1900 with time from object
     * @static
     * @param {any} value object for convert
     * @param {any} [default_value] default value
     * @returns {Date} date 01.01.1900 with time from or undefined
     * @example
     * // because this based on toDate() with change day,month,year to 01.01.1900, get them examples and change toDate to toTime
     * console.log(require('vv-shared').toTime('16:35')) // return true date
     * console.log(require('vv-shared').toTime('16:35.49')) // return true date
     * console.log(require('vv-shared').toTime('16:35.49.1')) // return true date
     * console.log(require('vv-shared').toTime('16:35.49.12')) // return true date
     * console.log(require('vv-shared').toTime('16:35.49.123')) // return true date
     * console.log(require('vv-shared').toTime('16:35.49.1234')) // return true date
     * console.log(require('vv-shared').toTime('16:35.49.12345')) // return true date
     * console.log(require('vv-shared').toTime('16:35.49.123456')) // return true date
     * console.log(require('vv-shared').toTime('16:35.49.1234567')) // return true date
     * console.log(require('vv-shared').toTime('16:35.49.12345678')) // return true date
     * console.log(require('vv-shared').toTime('16:35.49.123456789')) // return true date
     */
    toTime(value: any, default_value?: any): Date;
    /**
     * convert Buffer or Array[int] to hex
     * @static
     * @param {Buffer|Number[]} value
     * @param {Buffer} [default_value]
     * @returns {string}
     */
    toHex(value: Buffer | number[], default_value?: Buffer): string;
    /**
     * Contert object to string with IP format
     * @static
     * @param {any} value object for convert
     * @param {any} [default_value] default value
     * @returns {string} string with IP format or undefined
     * @example
     * console.log(require('vv-shared').toIp('LOCALHOST')) // return 'localhost'
     * console.log(require('vv-shared').toIp('localhost')) // return 'localhost'
     * console.log(require('vv-shared').toIp('192.168.1.2')) // return '192.168.1.2'
     * console.log(require('vv-shared').toIp('abc','192.168.1.2')) // return '192.168.1.2'
     * console.log(require('vv-shared').toIp('abc')) // return undefined
     */
    toIp(value: any, default_value?: any): string;
    /**
     * Convert object to array, use for params like {string|string[]}
     * @static
     * @param {any|any[]} value object for convert
     * @param {'string'|'int'|'float'|'bool'|'guid'|'date'} [type]
     * @returns {Object[]}
     */
    toArray(value: any | any[], type?: 'string' | 'int' | 'float' | 'bool' | 'guid' | 'date'): any[];
    /**
     * Returns a string filled with the specified character
     * @param {string} char char or string for fill
     * @param {number} count count fill
     * @returns {string} always string (no undefined)
     * @example
     * console.log(require('vv-shared').toCharArray('abc',2)) // return 'abcabc'
     * console.log(require('vv-shared').toCharArray(undefined,2)) // return empty string
     * console.log(require('vv-shared').toCharArray('abc',undefined)) // return empty string
     */
    toCharArray(char: string, count: number): string;
    /**
     * Returns a nice formatted error message - wrapper for format()
     * @param {any} error
     * @param {string} [prefix] prefix text for error message
     * @param {any} [replaces] substitutions for prefix string
     * @param {'stack'|'message'} [sourсe] preferred sourсe for extraction text message, default = 'stack'
     * @returns {string} always string (no undefined)
     * @example try {throw new Error('ops')} catch (error) {throw require('vv-shared').toErrorMessage(error, 'in myFunction({0})','value')}
     */
    toErrorMessage(error: any, prefix?: string, replaces?: any, sourсe?: 'stack' | 'message'): string;
    /**
     * Return string for inject in html
     * @param {string} value
     * @returns {string}
     */
    toHtml(value: string): string;
    /**
     * True round
     * @param {number} value
     * @param {number} digits
     * @returns {number}
     * @example console.log(require('vv-shared').round(1.121212, 4))
     */
    roundFload(value: number, digits: number): number;
    /**
     * split string, for example - '{asasdas}{234235}{}{vcvc}', and return array ['asasdas','234235','','vcvc']
     * @static
     * @param {any} string_for_split
     * @param {string} left left border
     * @param {string} right right border
     * @param {'no'|'collapse_with_lower'|'collapse_without_lower'} [collapse_doubles] default = 'no'
     * @returns {string[]}
     * @example console.log(require('vv-shared').split('{asasdas}{234235}{}{vcvc}','{','}'))
     */
    split(string_for_split: any, left: string, right: string, collapse_doubles?: 'no' | 'collapse_with_lower' | 'collapse_without_lower'): string[];
    /**
     * insert substring in string
     * @static
     * @param {any} string_where_insert string, where need insert
     * @param {number} index position for insert substring
     * @param {any} substring_for_replace substring
     * @returns {string} always string (no undefined)
     * @example
     * console.log(require('vv-shared').insertAt('ab',1,'XXX')) // return 'aXXXb'
     * console.log(require('vv-shared').insertAt(42,1,'Z')) // return '4Z2'
     * console.log(require('vv-shared').insertAt('ab',1,42)) // return 'a42b'
     * console.log(require('vv-shared').insertAt('ab',99,'X')) // return 'ab'
     * console.log(require('vv-shared').insertAt('ab','aa','X')) // return 'ab'
     * console.log(require('vv-shared').insertAt(undefined,1,'X')) // return empty string
     * console.log(require('vv-shared').insertAt('ab',1,undefined)) // return 'ab'
     */
    insertAt(string_where_insert: any, index: number, substring_for_replace: any): string;
    /**
     * Replace all substring in string
     * @static
     * @param {any} string_where_find string where find substring
     * @param {any} find substring for find
     * @param {any} replace substring for replace
     * @param {boolean} [recursively] default = false
     * @returns {string} always string (no undefined)
     * @example
     * console.log(require('vv-shared').replaceAll('abcabc','b','X')) // return 'aXcaXc'
     * console.log(require('vv-shared').replaceAll('abcabc','B','X')) // return 'aXcaXc'
     * console.log(require('vv-shared').replaceAll(411,11,'2')) // return '42'
     * console.log(require('vv-shared').replaceAll('412',1,'')) // return '42'
     * console.log(require('vv-shared').replaceAll('412',undefined,undefined)) // return '412'
     * console.log(require('vv-shared').replaceAll('412','1',undefined)) // return '412'
     * console.log(require('vv-shared').replaceAll('412',undefined,'1')) // return '412'
     */
    replaceAll(string_where_find: any, find: any, replace: any, recursively?: boolean): string;
    /**
     * Replace substrings in string like format in c#
     * @static
     * @param {any} string_for_format a string, on the basis of which to return a new formatted string
     * @param {any|any[]} [replaces] substitutions
     * @returns {string} always string (no undefined)
     * @example
     * console.log(require('vv-shared').format('Hello, {0}!','world')) // return 'Hello, world!'
     * console.log(require('vv-shared').format('Hello, {0} & {0}!','Johnson')) // return 'Hello, Johnson & Johnson!'
     * console.log(require('vv-shared').format('{0}, {1}!',['Hello','world'])) // return 'Hello, world!'
     * console.log(require('vv-shared').format('abc {0}','')) // return 'abc '
     * console.log(require('vv-shared').format('abc {0}',undefined)) // return 'abc '
     * console.log(require('vv-shared').format(42,'x')) // return '42'
     * console.log(require('vv-shared').format(undefined,'x')) // return empty string
     */
    format(string_for_format: any, replaces?: any | any[]): string;
    /**
     * Replace substrings in string like "format" with specify border characters
     * @static
     * @param {any} string_for_format a string, on the basis of which to return a new formatted string
     * @param {any|any[]} [replaces] substitutions
     * @param {any} [left] string left border
     * @param {any} [right] string right border
     * @returns {string} always string (no undefined)
     * @example
     * console.log(require('vv-shared').formatExt('Hello, [[[0]]]!','world','[[[',']]]')) // return 'Hello, world!'
     * console.log(require('vv-shared').formatExt('Hello, {0} & {0}!','Johnson','{','}')) // return 'Hello, Johnson & Johnson!'
     * console.log(require('vv-shared').formatExt('{{0}}, {{1}}!',['Hello','world'], '{{', '}}')) // return 'Hello, world!'
     */
    formatExt(string_for_format: any, replaces?: any | any[], left?: any, right?: any): string;
    /**
     * Format date to string
     * @static
     * @param {any} date date
     * @param {23|111|112|114|1141|1122|1123|1124|126|10126|101262|101263|104|104108|1041082|1041083|1041084|'dy'|'sd'} format variants: 23 (yyyy-mm-dd), 111 (yyyy/mm/dd), 112 (yyyymmdd), 114 (hh:mi:ss:mmm), 1141 (hh:mi:ss.mmm), 1122 (yyyymmddhh), 1123 (yyyymmddhhmi), 1124 (yyyymmddhhmiss), 126 (yyyy-mm-ddThh:mi:ss.mmm), 10126 (yyyy-mm-dd-hh-mi-ss-mmm), 101262 (yyyy-mm-dd hh:mi:ss.mmm), 101263 (yyyy-mm-dd hh:mi), 104 (dd.mm.yyyy), 104108(dd.mm.yyyy hh:mi:ss), 1041082(dd.mm.yyyy hh:mi), 1041083(yyyy.mm.dd hh:mi), 1041084(yyyy.mm.dd hh:mi:ss), , 'dy' (string (length 3) with number day in year), 'sd' (string (length 3) with number second in day)
     * @returns {string} string or undefined
     * @example
     * console.log(require('vv-shared').formatDate(new Date(),126)) // return current date as string in format yyyy-mm-ddThh:mi:ss.mmm
     * console.log(require('vv-shared').formatDate(new Date(),112)) // return current date as string in format yyyymmdd
     */
    formatDate(date: any, format: 23 | 111 | 112 | 114 | 1141 | 1122 | 1123 | 1124 | 126 | 10126 | 101262 | 101263 | 104 | 104108 | 1041082 | 1041083 | 1041084 | 'dy' | 'sd'): string;
    /**
     * return array without one element - cut it (analog slice), but the original array does not change
     * @static
     * @param {Object[]} arr
     * @param {number} index
     * @returns {Object[]}
     */
    cutFromArray(arr: any[], index: number): any[];
    /**
     * increase (or decrease) date by second or minutes or hours or days
     * @static
     * @param {'second'|'minute'|'hour'|'day'} interval
     * @param {number} value
     * @param {any} date
     * @returns {Date}
     */
    dateAdd(interval: 'second' | 'minute' | 'hour' | 'day', value: number, date: any): Date;
    /**
     * Search case insensitive property name in object
     * @static
     * @param {any} object object for search
     * @param {any} property_name case insensitive property name
     * @returns {string} property name - string or undefined
     * @example
     * console.log(require('vv-shared').findPropertyInObject({a: 5},'a')) // return 'a'
     * console.log(require('vv-shared').findPropertyInObject({a: 5},'A')) // return 'a'
     * console.log(require('vv-shared').findPropertyInObject({a: 5},'b')) // return undefined
     * console.log(require('vv-shared').findPropertyInObject({a: 5},undefined)) // return undefined
     * console.log(require('vv-shared').findPropertyInObject(undefined,'a')) // return undefined
     */
    findPropertyInObject(object: any, property_name: any): string;
    /**
     * Checking if exists insensitive property name in object
     * @static
     * @param {any} object object for search
     * @param {any} property_name case insensitive property name
     * @returns {boolean} always boolean (no undefined)
     * @example
     * console.log(require('vv-shared').findPropertyExistsInObject({a: 5},'a')) // return true
     * console.log(require('vv-shared').findPropertyExistsInObject({a: 5},'A')) // return true
     * console.log(require('vv-shared').findPropertyExistsInObject({a: 5},'b')) // return false
     * console.log(require('vv-shared').findPropertyExistsInObject({a: 5},undefined)) // return false
     * console.log(require('vv-shared').findPropertyExistsInObject(undefined,'a')) // return false
     */
    findPropertyExistsInObject(object: any, property_name: any): boolean;
    /**
     * Search value by case insensitive property name in object
     * @static
     * @param {any} object object for search
     * @param {string|string[]} property_name case insensitive property name
     * @param {any} [default_value] return this value, if property not find
     * @returns {any} value or undefined
     * @example
     * console.log(require('vv-shared').findPropertyValueInObject({a: 5},'a')) // 5
     * console.log(require('vv-shared').findPropertyValueInObject({a: 5},'A')) // 5
     * console.log(require('vv-shared').findPropertyValueInObject({a: 5},'b')) // return undefined
     * console.log(require('vv-shared').findPropertyValueInObject({a: 5},undefined)) // return undefined
     * console.log(require('vv-shared').findPropertyValueInObject(undefined,'a')) // return undefined
     */
    findPropertyValueInObject(object: any, property_name: string | string[], default_value?: any): any;
    /**
     * For left and right in string add border string, if border not exists
     * @static
     * @param {any} string_where_add string where need add border
     * @param {any} [left] string left border for add
     * @param {any} [right] string right border for add
     * @returns {string} always string (no undefined)
     * @example
     * console.log(require('vv-shared').border_add('aaa','[',']')) // return '[aaa]'
     * console.log(require('vv-shared').border_add('[aaa]','[',']')) // return '[aaa]'
     * console.log(require('vv-shared').border_add(42,'[',']')) // return '[42]'
     * console.log(require('vv-shared').border_add('b','*',undefined)) // return '*b'
     * console.log(require('vv-shared').border_add('*b','*',undefined)) // return '*b'
     * console.log(require('vv-shared').border_add(undefined,'[',']')) // return '[]'
     */
    border_add(string_where_add: any, left?: any, right?: any): string;
    /**
     * For left and right in string remove border string, if border not exists
     * @static
     * @param {any} string_where_find string where need remove border
     * @param {any} [left] string left border for remove
     * @param {any} [right] string right border for remove
     * @returns {string} always string (no undefined)
     * @example
     * console.log(require('vv-shared').border_del('aaa','[',']')) // return 'aaa'
     * console.log(require('vv-shared').border_del('[aaa]','[',']')) // return 'aaa'
     * console.log(require('vv-shared').border_del(42,'[',']')) // return '42'
     * console.log(require('vv-shared').border_del('b','*',undefined)) // return 'b'
     * console.log(require('vv-shared').border_del('*b','*',undefined)) // return 'b'
     * console.log(require('vv-shared').border_del(undefined,'[',']')) // return empty string
     */
    border_del(string_where_find: any, left?: any, right?: any): string;
    /**
     * Text pagination by char count per one page
     * @static
     * @param {string} text
     * @param {number} page_size
     * @returns {type_text_page_char[]}
     */
    text_page_char(text: string, page_size: number): {
        step: number;
        position_start: number;
        text_length: number;
        offset_length: number;
    }[];
    /**
     * Convert text_page_char result to byte markup for fs.createReadStream(...)
     * @static
     * @param {string} text
     * @param {type_text_page_char[]} text_page_char_result
     * @returns {type_text_page_byte[]}
     */
    text_page_byte(text: string, text_page_char_result: {
        step: number;
        position_start: number;
        text_length: number;
        offset_length: number;
    }[]): {
        step: number;
        position_start: number;
        position_end: number;
    }[];
    /**
     * Generate NON-UNIQUE guid by very-sery simple idea, based only on Math.random()
     */
    guid(): string;
}
