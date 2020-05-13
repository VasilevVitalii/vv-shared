// @ts-check
exports.isEmpty=isEmpty
exports.isEmptyString=isEmptyString
exports.isFunction=isFunction
exports.isGuid=isGuid
exports.nz=nz
exports.equal=equal
exports.duplicates=duplicates

exports.toString=toString
exports.toStringDeclension=toStringDeclension
exports.toInt=toInt
exports.toFloat=toFloat
exports.toBool= toBool
exports.toGuid=toGuid
exports.toDate= toDate
exports.toDateWithoutTime= toDateWithoutTime
exports.toTime= toTime
exports.toIp=toIp
exports.toArray=toArray
exports.toCharArray=toCharArray
exports.toErrorMessage=toErrorMessage


exports.split=split
exports.insertAt=insertAt
exports.replaceAll=replaceAll
exports.format=format
exports.formatExt=formatExt
exports.formatDate=formatDate

exports.cutFromArray=cutFromArray

exports.dateAdd = dateAdd

exports.findPropertyInObject=findPropertyInObject
exports.findPropertyExistsInObject=findPropertyExistsInObject
exports.findPropertyValueInObject=findPropertyValueInObject

exports.border_add = border_add
exports.border_del = border_del

exports.parser = parser
exports.text_page_char = text_page_char
exports.text_page_byte = text_page_byte
exports.readdir = readdir

const fs = require('fs')
const path = require('path')
const lib_parser = require('./parser.js')
const REGEX_INT=/^[+\-]?\d+$/
const REGEX_FLOAT=/^[+-]?\d+(\.\d+)?$/
const REGEX_IP=/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
const REGEX_GUID=/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/

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
function isEmpty(object) {
    let type = typeof object

    if (
        type === 'undefined' ||
        object === null ||
        (type === 'number' && isNaN(object))
    ) {
        return true
    }

    return false
}

/**
 * isEmpty + .trim() + check len > 0
 * @static
 * @param {any} object object for check
 * @returns {boolean}
 */
function isEmptyString(object) {
    if (isEmpty(object) === true) return true
    if (typeof object === 'string' && (object.length === 0 || object.trim().length === 0)) return true
    return false
}

/**
 * Check object for function
 * @static
 * @param {any} object object for check
 * @returns {boolean}
 */
function isFunction(object) {
    if (typeof object !== 'function') return false
    return true
}

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
function isGuid(object) {
    if (isEmpty(object)) return false
    return REGEX_GUID.test(object)
}

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
function nz(object1, object2, object3, object4, object5) {
    if (!isEmpty(object1)) return object1
    if (!isEmpty(object2)) return object2
    if (!isEmpty(object3)) return object3
    if (!isEmpty(object4)) return object4
    if (!isEmpty(object5)) return object5
    return undefined
}

/**
 * Equal two objects
 * @static
 * @param {any} object1
 * @param {any} object2
 * @returns {boolean}
 */
function equal(object1, object2) {
    let e1 = isEmpty(object1)
    let e2 = isEmpty(object2)

    if (e1 && e2) return true
    if (e1 && !e2) return false
    if (!e1 && e2) return false

    let t1 = typeof object1
    let t2 = typeof object2

    if (t1 === 'string' && t2 === 'string' && object1.trim().toLowerCase() === object2.trim().toLowerCase()) return true
    if (t1 === 'number' && t2 === 'number' && object1 === object2) return true
    if (t1 === 'boolean' && t2 === 'boolean' && object1 === object2) return true
    if (object1 instanceof Date && object2 instanceof Date) {
        return equal(formatDate(object1, 126), formatDate(object2, 126))
    }
    if (t1 === 'object' && t2 === 'object') {
        try {
            if (JSON.stringify(object1) === JSON.stringify(object2)) return true
        } catch (error) {
            return false
        }
    }

    return false
}

/**
 * Return array with duplicates items from string array (after trim and toLowerCase)
 * @static
 * @param {string[]} where_find_duplicates
 * @returns {string[]}
 */
function duplicates(where_find_duplicates) {
    if (isEmpty(where_find_duplicates) || !Array.isArray(where_find_duplicates)) return []

    let arr = where_find_duplicates.map(m => { return toString(m, '').toLowerCase().trim() }).filter(f => !isEmpty(f))

    const count = cnt => cnt.reduce((a, b) => ({ ...a, [b]: (a[b] || 0) + 1}), {})
    const doubles = dict => Object.keys(dict).filter((a) => dict[a] > 1)

    return (doubles(count(arr)))
}

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
function toString(value, default_value) {
    // if (typeof value === 'string') return value
    // if (typeof default_value === 'string') return default_value

    if (isEmpty(value)) {
        if (isEmpty(default_value)) {
            return undefined
        } else {
            return toString(default_value)
        }
    }
    if (value instanceof Date) return formatDate(value, 126)
    if (typeof value === 'object') return toString(default_value, undefined)
    return value.toString()
}

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
function toStringDeclension(value, phrase_one, phrase_two, phrase_few) {
    value = Math.abs(value)
    let phrases = [phrase_one, phrase_two, phrase_few]
    let cases = [2, 0, 1, 1, 1, 2]
    return phrases[ (value%100>4 && value%100<20)? 2 : cases[(value%10<5)?value%10:5] ]
}

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
function toInt(value, default_value) {
    if (!isEmpty(value)) {
        if (typeof value === 'number') {
            if (Math.round(value) === value) return value
        } else {
            let s = value.toString()
            if (REGEX_INT.test(s)) return parseInt(s)
        }
    }
    if (!isEmpty(default_value)) {
        return toInt(default_value)
    }
    return undefined
}

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
function toFloat(value, default_value) {
    if (!isEmpty(value)) {
        if (typeof value === 'number') {
            return value
        } else {
            let s = value.toString()
            if (REGEX_FLOAT.test(s)) return parseFloat(s)
            s = replaceAll(s,',','.')
            if (REGEX_FLOAT.test(s)) return parseFloat(s)
        }
    }
    if (!isEmpty(default_value)) {
        return toFloat(default_value)
    }
    return undefined
}

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
function toBool(value, default_value) {
    if (!isEmpty(value)) {
        let t = typeof value
        if (
            (t === 'boolean' && value === true) ||
            (t === 'string' && ['1', 'true', 'yes', 'ok'].includes(value.trim().toLowerCase())) ||
            (t === 'number' && value === 1)
        ) {
            return true
        }
        if (
            (t === 'boolean' && value === false) ||
            (t === 'string' && ['0', 'false', 'no', 'cancel'].includes(value.trim().toLowerCase())) ||
            (t === 'number' && value === 0)
        ) {
            return false
        }
    }
    if (!isEmpty(default_value)) {
        return toBool(default_value)
    }
    return undefined
}

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
function toGuid(value, default_value) {
    if (isGuid(value)) return value.toString()
    if (isGuid(default_value)) return default_value.toString()
    return undefined
}

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
 * console.log(require('vv-shared').toDate('20180412')) // return true date
 */
function toDate(value, default_value) {
    if (!isEmpty(value)) {
        if (value instanceof Date) {
            return value
        }
        let year = 0
        let month = 0
        let day = 0
        let hour = 0
        let minute = 0
        let second = 0
        let millisecond = 0

        // 2018.04.12-16:35:49 -> 2018-04-12T16:35:49
        if (value.length === 19
            && value.substring(4,5) === '.'
            && value.substring(7,8) === '.'
            && value.substring(7,8) === '.'
            && value.substring(10,11) === '-'
            && value.substring(13,14) === ':'
            && value.substring(16,17) === ':'
        ) {
            value = value.substring(0,4).concat(
                '-', value.substring(5,7),
                '-', value.substring(8,10),
                'T', value.substring(11,value.length)
            )
        }

        // 2018-04-12T16:35:49.123+03:00
        // 2018-05-12T16:35:49.123Z
        // 2018-04-12T16:35:49.<9 digits>
        // 2018-04-12T16:35:49
        if (value.length >= 19
            && value.length <= 29
            && !isEmpty(toInt(value.substring(0,4)))
            && value.substring(4,5) === '-'
            && !isEmpty(toInt(value.substring(5,7)))
            && value.substring(7,8) === '-'
            && !isEmpty(toInt(value.substring(8,10)))
            && value.substring(10,11) === 'T'
            && value.substring(13,14) === ':'
            && value.substring(16,17) === ':'
        ) {
            if (value[value.length-1].toLowerCase() === 'z') {
                value = value.substring(0,value.length-1)
            }
            year = toInt(value.substring(0,4))
            month = toInt(value.substring(5,7))
            day = toInt(value.substring(8,10))
            hour = toInt(value.substring(11,13))
            minute = toInt(value.substring(14,16))
            second = toInt(value.substring(17,19))
            if (value.length === 29
                && value.substring(19,20) === '.'
                && !isEmpty(toInt(value.substring(20,23)))
                && value.substring(23,24) === '+'
                && !isEmpty(toInt(value.substring(24,26)))
                && value.substring(26,27) === ':'
                && !isEmpty(toInt(value.substring(27,29)))
            ) {
                millisecond = toInt(value.substring(20,23))
            } else if (value.length > 19
                && value.substring(19,20) === '.'
                && !isEmpty(toInt(value.substring(20,value.length)))
            ) {
                if (value.length === 21) {
                    millisecond = toInt(value.substring(20,21)) * 100
                } else if (value.length === 22) {
                    millisecond = toInt(value.substring(20,22)) * 10
                } else {
                    millisecond = toInt(value.substring(20,23))
                }
            } else if (value.length != 19) {
                year = undefined
            }
        } else
        // 12.04.2018 16:35:49
        // 12.04.2018 16:35
        // 12.04.2018
        if (value.length >= 10
            && value.length <= 19
            && !isEmpty(toInt(value.substring(0,2)))
            && value.substring(2,3) === '.'
            && !isEmpty(toInt(value.substring(3,5)))
            && value.substring(5,6) === '.'
            && !isEmpty(toInt(value.substring(6,10)))
        ) {
            day = toInt(value.substring(0,2))
            month = toInt(value.substring(3,5))
            year = toInt(value.substring(6,10))

            if (value.length === 19
                && value.substring(10,11) === ' '
                && !isEmpty(toInt(value.substring(11,13)))
                && value.substring(13,14) === ':'
                && !isEmpty(toInt(value.substring(14,16)))
                && value.substring(16,17) === ':'
                && !isEmpty(toInt(value.substring(17,19)))
            ) {
                hour = toInt(value.substring(11,13))
                minute = toInt(value.substring(14,16))
                second = toInt(value.substring(17,19))
            } else if (value.length === 16
                && value.substring(10,11) === ' '
                && !isEmpty(toInt(value.substring(11,13)))
                && value.substring(13,14) === ':'
                && !isEmpty(toInt(value.substring(14,16)))
            ) {
                hour = toInt(value.substring(11,13))
                minute = toInt(value.substring(14,16))
            } else if (value.length != 10) {
                year = undefined
            }
        } else
        // 2018-04-16
        if (value.length === 10
            && !isEmpty(toInt(value.substring(0,4)))
            && value.substring(4,5) === '-'
            && !isEmpty(toInt(value.substring(5,7)))
            && value.substring(7,8) === '-'
            && !isEmpty(toInt(value.substring(8,10)))
        ) {
            year = toInt(value.substring(0,4))
            month = toInt(value.substring(5,7))
            day = toInt(value.substring(8,10))
        } else
        // 20180416
        if (value.length === 8
            && !isEmpty(toInt(value.substring(0,value.length)))
        ) {
            year = toInt(value.substring(0,4))
            month = toInt(value.substring(4,6))
            day = toInt(value.substring(6,8))
        } else {
            year = undefined
        }

        if (!isEmpty(year)) {
            if (year < 0 || year > 9999 || month < 1 || month > 12 || day < 1 || day > 31 || (month === 2 && day > 29) ||
            hour < 0 || hour > 24 || minute < 0 || minute > 59 || second < 0 || second > 59) {
                year = undefined
            }
        }

        if (!isEmpty(year)) {
            let ret = new Date(year,month-1,day,hour,minute,second,millisecond)
            return ret
        }
    }
    if (!isEmpty(default_value)) {
        return toDate(default_value)
    }
    return undefined
}

/**
 * Convert object to date without time
 * @static
 * @param {any} value object for convert
 * @param {any} [default_value] default value
 * @returns {Date} date without time or undefined
 * @example // because this function based on toDate() with add cut off time, get them examples and change toDate to toDateWithoutTime
 */
function toDateWithoutTime(value, default_value) {
    let d = toDate(value, default_value)
    if (isEmpty(d)) {
        return undefined
    }
    return new Date(d.getFullYear(),d.getMonth(),d.getDate())
}

/**
 * Convert object to date 01.01.1900 with time from object
 * @static
 * @param {any} value object for convert
 * @param {any} [default_value] default value
 * @returns {Date} date 01.01.1900 with time from or undefined
 * @example
 * // because this function based on toDate() with change day,month,year to 01.01.1900, get them examples and change toDate to toTime
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
function toTime(value, default_value) {
    if (!isEmpty(value)) {
        let maybe_date = toDate(value)
        if (!isEmpty(maybe_date)) {
            return new Date(1900,0,1,maybe_date.getHours(),maybe_date.getMinutes(),maybe_date.getSeconds(),maybe_date.getMilliseconds())
        }

        let hour = 0
        let minute = 0
        let second = 0
        let millisecond = 0

        // 16:35:49.<9 digits>
        // 16:35:49
        // 16:35
        if (value.length >= 5
            && value.length <= 18
            && !isEmpty(toInt(value.substring(0,2)))
            && value.substring(2,3) === ':'
            && !isEmpty(toInt(value.substring(3,5)))
        ) {
            hour = toInt(value.substring(0,2))
            minute = toInt(value.substring(3,5))
            if (value.length === 8 && value.substring(5,6) === ':' && !isEmpty(toInt(value.substring(6,8)))) {
                second = toInt(value.substring(6,8))
            } else if (value.length > 8 && value.substring(8,9) === '.' && !isEmpty(toInt(value.substring(9,value.length)))) {
                second = toInt(value.substring(6,8))
                if (value.length === 10) {
                    millisecond = toInt(value.substring(9,10)) * 100
                } else if (value.length === 11) {
                    millisecond = toInt(value.substring(9,11)) * 10
                } else {
                    millisecond = toInt(value.substring(9,12))
                }
            } else if (value.length != 5) {
                hour = undefined
            }
        } else {
            hour = undefined
        }

        if (!isEmpty(hour)) {
            if (hour < 0 || hour > 24 || minute < 0 || minute > 59 || second < 0 || second > 59) {
                hour = undefined
            }
        }

        if (!isEmpty(hour)) {
            return new Date(1900,0,1,hour,minute,second,millisecond)
        }
    }
    if (!isEmpty(default_value)) {
        return toDate(default_value, undefined)
    }
    return undefined
}

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
function toIp(value, default_value) {
    if (REGEX_IP.test(value)) return value
    if (toString(value, '').trim().toLowerCase() === 'localhost') return 'localhost'
    if (!isEmpty(default_value)) {
        return toIp(default_value)
    }
    return undefined
}

/**
 * Convert object to array, use for function params like {string|string[]}
 * @static
 * @param {any|any[]} value object for convert
 * @param {'string'|'int'|'float'|'bool'|'guid'|'date'} [type]
 * @returns {Object[]}
 */
function toArray(value, type) {
    if (isEmpty(value)) return []

    switch (type) {
        case "bool":
            if (Array.isArray(value)) {
                return value.map(m => toBool(m)).filter(f => !isEmpty(f))
            } else {
                return [toBool(value)].filter(f => !isEmpty(f))
            }
        case "date":
            if (Array.isArray(value)) {
                return value.map(m => toDate(m)).filter(f => !isEmpty(f))
            } else {
                return [toDate(value)].filter(f => !isEmpty(f))
            }
        case "float":
            if (Array.isArray(value)) {
            return value.map(m => toFloat(m)).filter(f => !isEmpty(f))
            } else {
                return [toFloat(value)].filter(f => !isEmpty(f))
            }
        case "guid":
            if (Array.isArray(value)) {
                return value.map(m => toGuid(m)).filter(f => !isEmpty(f))
            } else {
                return [toGuid(value)].filter(f => !isEmpty(f))
            }
        case "int":
            if (Array.isArray(value)) {
                return value.map(m => toInt(m)).filter(f => !isEmpty(f))
            } else {
                return [toInt(value)].filter(f => !isEmpty(f))
            }

        case "string":
            if (Array.isArray(value)) {
                return value.map(m => toString(m)).filter(f => !isEmpty(f))
            } else {
                return [toString(value)].filter(f => !isEmpty(f))
            }
        default:
            if (Array.isArray(value)) {
                return value.filter(f => !isEmpty(f))
            } else {
                return [value].filter(f => !isEmpty(f))
            }
    }
}

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
function toCharArray (char, count) {

    if (isEmpty(char)) return ''
    if (!['string','number','boolean'].includes(typeof char)) return ''
    let ch = toString(char, '')

    let cnt = toInt(count)
    if (isEmpty(cnt) || cnt < 1) return ''

    let res = ''
    for (let i = 0; i < cnt; i++) {
        res = res.concat(ch)
    }
    return res
}

/**
 * Returns a nice formatted error message - wrapper for function format()
 * @param {any} error
 * @param {string} [prefix] prefix text for error message
 * @param {any} [replaces] substitutions for prefix string
 * @param {'stack'|'message'} [sourсe] preferred sourсe for extraction text message, default = 'stack'
 * @returns {string} always string (no undefined)
 * @example try {throw new Error('ops')} catch (error) {throw require('vv-shared').toErrorMessage(error, 'in myFunction({0})','value')}
 */
function toErrorMessage (error, prefix, replaces, sourсe) {
    let p = format(prefix, replaces)
    let e = 'UNKNOWN ERROR'
    let s = (sourсe === 'stack' || sourсe==='message' ? sourсe : 'stack')
    if (!isEmpty(error)) {
        if (s === 'stack') {
            if (!isEmpty(error.stack)) {
                e = error.stack.toString()
            } else if (!isEmpty(error.message)) {
                e = error.message.toString()
            } else {
                e = error.toString()
            }
        } else if (s === 'message') {
            if (!isEmpty(error.message)) {
                e = error.message
            } else if (!isEmpty(error.stack)) {
                e = error.stack.toString()
            } else {
                e = error.toString()
            }
        }
    }

    if (p === '') {
        e = border_del(e, '\n', undefined)
    } else {
        p = border_add(p, undefined, ' ')
        e = border_add(e, '\n', undefined)
    }

    return p.concat(e)
}

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
function split(string_for_split, left, right, collapse_doubles) {
    if (isEmpty(string_for_split)) {
        return []
    }
    let ss = toString(string_for_split).trim()
    let l = toString(left).trim()
    let r = toString(right).trim()
    if (isEmpty(ss) || isEmpty(l) || isEmpty(r)) return []
    if (ss.indexOf(l) < 0 && ss.indexOf(r) < 0) {
        return [ss]
    }
    let ret = []

    let ss_by_left = ss.split(left).map(m => { return m.trim() })
    if (ss_by_left.length > 0 && ss_by_left[0] === '') {
        ss_by_left.splice(0, 1)
    }
    // @ts-ignore
    collapse_doubles = toString(collapse_doubles,'no').toLowerCase()

    ss_by_left.forEach((s,idx) => {
        if (s.substring(s.length - r.length, s.length) === r) {
            let push_candidate = s.substring(0, s.length - r.length)
            if (push_candidate.includes(r)) {
                throw new Error(format('in split string "{0}" with borders "{1}" and "{2}" in element #{3}(numbering from 0) excess right border',[ss, l, r, idx]))
            }
            if (collapse_doubles === 'collapse_without_lower') {
                if (!ret.map(m => { return toString(m,'')}).includes(toString(push_candidate,''))) {
                    ret.push(push_candidate)
                }
            } else if (collapse_doubles === 'collapse_with_lower') {
                if (!ret.map(m => { return toString(m,'').toLowerCase() }).includes(toString(push_candidate,'').toLowerCase())) {
                    ret.push(push_candidate)
                }
            } else if (collapse_doubles === 'no') {
                ret.push(push_candidate)
            } else {
                throw new Error(format('in split string "{0}" with borders "{1}" and "{2}" bad param collapse_doubles = {3}',[ss, l, r, collapse_doubles]))
            }
        } else {
            throw new Error(format('in split string "{0}" with borders "{1}" and "{2}" in element #{3}(numbering from 0) excess left border',[ss, l, r, idx]))
        }
    })

    return ret
}

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
function insertAt(string_where_insert, index, substring_for_replace) {
    if (!['string','number'].includes(typeof string_where_insert)) return ''
    if (!['string','number'].includes(typeof substring_for_replace)) return string_where_insert.toString()

    let s = toString(string_where_insert)
    if (isEmpty(s)) return ''

    let i = toInt(index, -1)
    if (i < 0 || i > s.length - 1) return s

    let ss = toString(substring_for_replace)
    if (isEmpty(ss)) return s

    return s.substr (0, index).concat(ss, s.substr(index))
}

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
function replaceAll(string_where_find, find, replace, recursively) {
    if (!['string','number'].includes(typeof string_where_find) || isEmpty(string_where_find)) return ''
    if (!['string','number'].includes(typeof find)) return string_where_find.toString()
    if (!['string','number'].includes(typeof replace)) return string_where_find.toString()

    let s = toString(string_where_find)
    if (isEmpty(s)) return ''

    let f = toString(find)
    if (isEmpty(f) || f === '') return s

    let r = toString(replace)

    let pos = s.toLowerCase().indexOf(f.toLowerCase())
    if (pos < 0) return s

    if (recursively === true) {
        return replaceAll(s.substring(0, pos) + r + s.substring(pos+f.length), find, replace, recursively)
    }

    while (pos >= 0) {
        s = s.substring(0, pos) + r + s.substring(pos+f.length)
        pos = s.toLowerCase().indexOf(f.toLowerCase(), pos + r.length)
    }

    return s
}

/**
 * Replace substrings in string like format function in c#
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
function format(string_for_format, replaces) {
    if (!['string','number'].includes(typeof string_for_format) || isEmpty(string_for_format)) return ''

    let s = toString(string_for_format)
    if (isEmpty(s)) return ''

    let r = []
    if (Array.isArray(replaces)) {
        r = replaces.map(item => {return toString(item, '')})
    } else {
        r.push(toString(replaces, ''))
    }

    r.forEach((item, index) => {
        s = replaceAll(s, '{'.concat(index.toString(),'}'), item)
    })
    return s
}

/**
 * Replace substrings in string like function "format" with specify border characters
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
function formatExt(string_for_format, replaces, left, right) {
    if (!['string','number'].includes(typeof string_for_format) || isEmpty(string_for_format)) return ''

    let s = toString(string_for_format)
    if (isEmpty(s)) return ''

    let b_l = toString(left)
    let b_r = toString(right)
    if (isEmpty(b_l) || isEmpty(b_r)) return string_for_format

    let r = []
    if (Array.isArray(replaces)) {
        r = replaces.map(item => {return toString(item, '')})
    } else {
        r.push(toString(replaces, ''))
    }

    r.forEach((item, index) => {
        s = replaceAll(s, b_l.concat(index.toString(),b_r), item)
    })
    return s
}

/**
 * Format date to string
 * @static
 * @param {any} date date
 * @param {112|1122|1123|1124|126|10126|104|104108|1041082|1041083|1041084|'dy'|'sd'} format variants: 112 (yyyymmdd), 1122 (yyyymmddhh), 1123 (yyyymmddhhmi), 1124 (yyyymmddhhmiss), 126 (yyyy-mm-ddThh:mi:ss.mmm), 10126 (yyyy-mm-dd-hh-mi-ss-mmm), 104 (dd.mm.yyyy), 104108(dd.mm.yyyy hh:mi:ss), 1041082(dd.mm.yyyy hh:mi), 1041083(yyyy.mm.dd hh:mi), 1041084(yyyy.mm.dd hh:mi:ss), , 'dy' (string (length 3) with number day in year), 'sd' (string (length 3) with number second in day)
 * @returns {string} string or undefined
 * @example
 * console.log(require('vv-shared').formatDate(new Date(),126)) // return current date as string in format yyyy-mm-ddThh:mi:ss.mmm
 * console.log(require('vv-shared').formatDate(new Date(),112)) // return current date as string in format yyyymmdd
 */
function formatDate(date, format) {
    let d = toDate(date)
    if (isEmpty(d)) return undefined

    let f = toString(format,'').trim().toLowerCase()
    if (isEmptyString(f)) return undefined

    if (f === 'dy') {
        let numDayPrepare = d.getTime() - new Date(d.getFullYear(), 0, 0).getTime()
        let numDay = Math.floor(numDayPrepare / 86400000).toString()
        return toCharArray('0', 3 - numDay.length).concat(numDay)
    } else if (f === 'sd') {
        let numSecondPrepare = d.getTime() - new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()
        let numSecond = Math.floor(numSecondPrepare / 1000).toString()
        return toCharArray('0', 5 - numSecond.length).concat(numSecond)
    }

    let year = d.getFullYear()
    let month = d.getMonth() + 1
    let day = d.getDate()
    let hour = d.getHours()
    let minute = d.getMinutes()
    let second = d.getSeconds()
    let msec = d.getMilliseconds()

    switch (f) {
        case '112':
            return ''.concat(
                year.toString(),
                (month > 9 ? '' : '0'),
                month.toString(),
                (day > 9 ? '' : '0'),
                day.toString()
            )
        case '1122':
            return ''.concat(
                year.toString(),
                (month > 9 ? '' : '0'),
                month.toString(),
                (day > 9 ? '' : '0'),
                day.toString(),
                (hour > 9 ? '' : '0'),
                hour.toString()
            )
        case '1123':
            return ''.concat(
                year.toString(),
                (month > 9 ? '' : '0'),
                month.toString(),
                (day > 9 ? '' : '0'),
                day.toString(),
                (hour > 9 ? '' : '0'),
                hour.toString(),
                (minute > 9 ? '' : '0'),
                minute.toString()
            )
        case '1124':
            return ''.concat(
                year.toString(),
                (month > 9 ? '' : '0'),
                month.toString(),
                (day > 9 ? '' : '0'),
                day.toString(),
                (hour > 9 ? '' : '0'),
                hour.toString(),
                (minute > 9 ? '' : '0'),
                minute.toString(),
                (second > 9 ? '' : '0'),
                second.toString(),
            )
        case '126':
            return ''.concat(
                year.toString(),
                '-',
                (month > 9 ? '' : '0'),
                month.toString(),
                '-',
                (day > 9 ? '' : '0'),
                day.toString(),
                'T',
                (hour > 9 ? '' : '0'),
                hour.toString(),
                ':',
                (minute > 9 ? '' : '0'),
                minute.toString(),
                ':',
                (second > 9 ? '' : '0'),
                second.toString(),
                '.',
                (msec > 99 ? '' : (msec > 9 ? '0' : '00')),
                msec.toString()
            )
        case '10126':
            return ''.concat(
                year.toString(),
                '-',
                (month > 9 ? '' : '0'),
                month.toString(),
                '-',
                (day > 9 ? '' : '0'),
                day.toString(),
                '-',
                (hour > 9 ? '' : '0'),
                hour.toString(),
                '-',
                (minute > 9 ? '' : '0'),
                minute.toString(),
                '-',
                (second > 9 ? '' : '0'),
                second.toString(),
                '-',
                (msec > 99 ? '' : (msec > 9 ? '0' : '00')),
                msec.toString()
            )
        case '104':
            return ''.concat(
                (day > 9 ? '' : '0'),
                day.toString(),
                '.',
                (month > 9 ? '' : '0'),
                month.toString(),
                '.',
                year.toString()
            )
        case '104108':
            return ''.concat(
                (day > 9 ? '' : '0'),
                day.toString(),
                '.',
                (month > 9 ? '' : '0'),
                month.toString(),
                '.',
                year.toString(),
                ' ',
                (hour > 9 ? '' : '0'),
                hour.toString(),
                ':',
                (minute > 9 ? '' : '0'),
                minute.toString(),
                ':',
                (second > 9 ? '' : '0'),
                second.toString()
            )
        case '1041082':
            return ''.concat(
                (day > 9 ? '' : '0'),
                day.toString(),
                '.',
                (month > 9 ? '' : '0'),
                month.toString(),
                '.',
                year.toString(),
                ' ',
                (hour > 9 ? '' : '0'),
                hour.toString(),
                ':',
                (minute > 9 ? '' : '0'),
                minute.toString(),
            )
        case '1041083':
            return ''.concat(
                year.toString(),
                '.',
                (month > 9 ? '' : '0'),
                month.toString(),
                '.',
                (day > 9 ? '' : '0'),
                day.toString(),
                ' ',
                (hour > 9 ? '' : '0'),
                hour.toString(),
                ':',
                (minute > 9 ? '' : '0'),
                minute.toString(),
            )
        case '1041084':
            return ''.concat(
                year.toString(),
                '.',
                (month > 9 ? '' : '0'),
                month.toString(),
                '.',
                (day > 9 ? '' : '0'),
                day.toString(),
                ' ',
                (hour > 9 ? '' : '0'),
                hour.toString(),
                ':',
                (minute > 9 ? '' : '0'),
                minute.toString(),
                ':',
                (second > 9 ? '' : '0'),
                second.toString()
            )
        default:
            return undefined
    }
}

/**
 * return array without one element - cut it (analog slice), but the original array does not change
 * @static
 * @param {Object[]} arr
 * @param {number} index
 * @returns {Object[]}
 */
function cutFromArray(arr, index) {
    if (isEmpty(arr) || !Array.isArray(arr)) return arr
    let i = toInt(index)
    if (i < 0) return arr
    if (i >= arr.length) return arr
    return arr.slice(0, i).concat(arr.slice(i + 1,arr.length))
}

/**
 * increase (or decrease) date by second or minutes or hours or days
 * @static
 * @param {'second'|'minute'|'hour'|'day'} interval
 * @param {number} value
 * @param {any} date
 * @returns {Date}
 */
function dateAdd(interval, value, date) {
    let d = toDate(date)
    if (isEmpty(d)) {
        return undefined
    }

    let v = toInt(value, 0)
    if (interval === 'second') {
        v = v * 1000
    } else if (interval === 'minute') {
        v = v * 1000 * 60
    } else if (interval === 'hour') {
        v = v * 1000 * 60 * 60
    } else if (interval === 'day') {
        v = v * 1000 * 60 * 60 * 24
    } else {
        return toDate(date)
    }
    return new Date(toDate(d).getTime() + v)
}

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
function findPropertyInObject (object, property_name) {
    if (isEmpty(object)) return undefined

    let pn = toString(property_name,'')
    if (isEmpty(pn)) return undefined

    for (let property in object) {
        if (property.toLowerCase() === pn.toLowerCase()) {
            return property
        }
    }

    return undefined
}

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
function findPropertyExistsInObject (object, property_name) {
    if (isEmpty(findPropertyInObject(object, property_name))) {
        return false
    }
    return true
}

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
function findPropertyValueInObject (object, property_name, default_value) {
    let property_name_list = toArray(property_name, 'string')
    let property_name_list_len = property_name_list.length
    let object_for_find = object
    for (let i = 0; i < property_name_list_len; i++) {
        let property = findPropertyInObject(object_for_find, property_name_list[i])
        if (isEmpty(property)) return default_value
        if (property_name_list_len > i + 1) {
            object_for_find = object_for_find[property]
            continue
        }
        let t = typeof default_value
        if (t === 'string') return toString(object_for_find[property],default_value)
        if (t === 'number') return toFloat(object_for_find[property],default_value)
        if (t === 'boolean') return toBool(object_for_find[property],default_value)
        return object_for_find[property]
    }
}

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
function border_add(string_where_add, left, right) {
    let s = toString(string_where_add,'')
    let b_l = toString(left,'')
    let b_r = toString(right,'')

    if (b_l !== '' && s.substring(0, b_l.length) !== b_l) {
        s = b_l.concat(s)
    }

    if (b_r !== '' && s.substring(s.length - b_r.length, s.length) !== b_r) {
        s = s.concat(b_r)
    }

    return s
}

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
function border_del(string_where_find, left, right) {
    let s = toString(string_where_find,'')
    let b_l = toString(left,'')
    let b_r = toString(right,'')

    if (!isEmpty(b_l) && s.substring(0, b_l.length) === b_l) {
        s = s.substring(b_l.length, s.length)
    }
    if (!isEmpty(b_r) && s.substring(s.length - b_r.length, s.length) === b_r) {
        s = s.substring(0, s.length - b_r.length)
    }

    return s
}

/**
 * @typedef {lib_parser.type_options} parser_options
 */
/**
 * Simple parser for, example, js code or sql code
 * @param {parser_options} parser_options
 * @returns {lib_parser}
 * @example
 * let parser = require('./index.js').parser({ brackets: {left: '(', right: ')'}, end_of_command: [';'], string_border: ['"', "'"], one_string_comment: "//"})
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
 * Text pagination by char count per one page
 * @static
 * @param {string} text
 * @param {number} page_size
 * @returns {type_text_page_char[]}
 */
function text_page_char(text, page_size) {
    /**
     * @private
     * @type {type_text_page_char[]}
     */
    let result = []

    let text_length = text.length
    let step = 0

    let step_position_start = 0
    let step_text_length = 0
    let step_offset_length = 0

    let char_process_length = 0

    /**
     * @private
     * @type {number[]}
     */
    let border_break = [' '.charCodeAt(0), '\t'.charCodeAt(0), 10, 13]
    /**
     * @private
     * @type {number[]}
     */
    let border_along = [':'.charCodeAt(0), '.'.charCodeAt(0), ','.charCodeAt(0), ';'.charCodeAt(0), '?'.charCodeAt(0), '!'.charCodeAt(0)]

    while (char_process_length < text_length) {
        step_position_start = char_process_length
        step_text_length = 0
        step_offset_length = 0

        for (let i = char_process_length + page_size - 1; i > step_position_start; i--) {
            if (border_along.includes(text.charCodeAt(i)) && !border_along.includes(text.charCodeAt(i + 1))) {
                step_text_length = i - step_position_start + 1
                break
            }

            if (border_break.includes(text.charCodeAt(i)) && !border_break.includes(text.charCodeAt(i + 1))) {
                step_text_length = i - step_position_start + 1
                break
            }
        }
        if (step_text_length === 0) {
            step_text_length = page_size
        }

        while (border_break.includes(text.charCodeAt(step_position_start + step_text_length - 1))) {
            step_text_length--
            step_offset_length++
        }

        result.push({
            step: step,
            position_start: step_position_start,
            text_length: step_text_length,
            offset_length: step_offset_length
        })

        char_process_length = step_position_start + step_text_length + step_offset_length
        step++
    }
    return result
}

/**
 * Convert function text_page_char result to byte markup for fs.createReadStream(...)
 * @static
 * @param {string} text
 * @param {type_text_page_char[]} text_page_char_result
 * @returns {type_text_page_byte[]}
 */
function text_page_byte (text, text_page_char_result) {
    /**
     * @private
     * @type {type_text_page_byte[]}
     */
    let result = []

    let process_length = 0

    text_page_char_result.forEach(page => {
        let text_length = Buffer.from(text.substring(page.position_start, page.position_start + page.text_length)).length
        let offset_length = Buffer.from(text.substring(page.position_start + page.text_length, page.position_start + page.text_length + page.offset_length)).length

        let position_start = process_length
        let position_end = process_length + text_length - 1
        result.push({
            step: page.step,
            position_start: position_start,
            position_end: position_end,
        })
        process_length = process_length + text_length + offset_length
    })

    return result
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
 * @param {type_readdir_options} [options]
 * @param {callback_readdir} callback
 * @example
 * require('vv-shared').readdir(__dirname, undefined, (error, files) => {console.log(files)} )
 */
function readdir(dir, options, callback) {
    let already_send_callback = false
    if (isEmpty(options)) {
        options = {
            mode: 'files'
        }
    } else {
        if (isEmpty(options.mode)) options.mode = 'files'
    }
    readdir_private(dir, options, (error, files) => {
        if (already_send_callback) return
        already_send_callback = true
        callback(error, files)
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
        if (!isEmpty(error)) {
            callback(new Error(toErrorMessage(error, 'on read dir "{0}"', dir, 'message')), undefined)
        }
        let pending = list.length
        if (!pending) callback(undefined, files)

        list.forEach(file_relative => {
            let file_absolute = path.resolve(dir, file_relative)
            fs.stat(file_absolute, function(error, stat) {
                if (!isEmpty(error)) {
                    callback(new Error(toErrorMessage(error, 'on get stat for file/dir "{0}"', file_absolute, 'message')), undefined)
                }
                if (!isEmpty(stat)) {
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
                            if (!isEmpty(error)) {
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
