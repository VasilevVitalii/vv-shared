// @ts-check

// @ts-ignore
const assert = require('assert');
const testing_lib = require('./index.js')
const os = require('os')

let objects = [
    {id: 'undefine', param: undefined},
    {id: 'NaN', param: NaN},
    {id: 'null', param: null},
    {id: 'empty array', param: []},
    {id: 'array', param: [1, 2, 3]},
    {id: 'object', param: {a: 1, b: 2, c: 3}},
    {id: 'empty object', param: {}},
    {id: 'date', param: new Date(2018,10,16,20,14,28)},
    {id: 'boolean', param: false},
    {id: 'number', param: 42},
    {id: 'string', param: 'str42'},
    {id: 'empty string', param: ''},
    {id: 'function', param: (() => {console.log('hello')})}
]

describe("isEmpty", function() {
    objects.forEach(o => {
        let extra = undefined
        let title = ''.concat('for ',o.id,' return false')
        let result = false
        if (['undefine','NaN','null','empty string'].includes(o.id)) {
            title = ''.concat('for ',o.id,' return true')
            result = true
            if (o.id === 'empty string') {
                extra = 'empty_string'
            }
        }
        it(title, function() {
            assert.equal(testing_lib.isEmpty(o.param, extra), result)
        })
    })
})

describe("isFunction", function() {
    objects.forEach(o => {
        let title = ''.concat('for ',o.id,' return false')
        let result = false
        if (['function'].includes(o.id)) {
            title = ''.concat('for ',o.id,' return true')
            result = true
        }
        it(title, function() {
            assert.equal(testing_lib.isFunction(o.param), result)
        })
    })
})

describe("isGuid", function() {
    it('for guid return true', function() {
        assert.equal(testing_lib.isGuid('525C249B-AE8E-4EB6-8E4C-41BFDED87531'), true)
    })
    it('for bad guid return false', function() {
        assert.equal(testing_lib.isGuid('X25C249B-AE8E-4EB6-8E4C-41BFDED87531'), false)
    })
    objects.forEach(o => {
        let title = ''.concat('for ',o.id,' return false')
        let result = false
        it(title, function() {
            assert.equal(testing_lib.isGuid(o.param), result)
        })
    })
})

describe("nz", function() {
    it(' for (1, undefined) return 1  ', function() {
        assert.equal(testing_lib.nz(1, undefined), 1)
    })
    it(' for (42, 13) return 42  ', function() {
        assert.equal(testing_lib.nz(42, 13), 42)
    })
    it(' for (undefined, 2, 3) return 2  ', function() {
        assert.equal(testing_lib.nz(undefined, 2, 3), 2)
    })
    it(' for (undefined, undefined, 4) return 4  ', function() {
        assert.equal(testing_lib.nz(undefined, undefined, 4), 4)
    })
})

describe("equal", function() {
    it(' for ("aaa", "aaa") return true  ', function() {
        assert.equal(testing_lib.equal("aaa", "aaa"), true)
    })
    it(' for ("aaa", " aaa ") return true  ', function() {
        assert.equal(testing_lib.equal("aaa", " aaa "), true)
    })
    it(' for ("aaa", "aa") return false  ', function() {
        assert.equal(testing_lib.equal("aaa", "aa"), false)
    })
    it(' for (undefined, undefined) return true  ', function() {
        assert.equal(testing_lib.equal(undefined, undefined), true)
    })
    it(' for (undefined, null) return true  ', function() {
        assert.equal(testing_lib.equal(undefined, null), true)
    })
    it(' for (42, 42) return true  ', function() {
        assert.equal(testing_lib.equal(42, 42), true)
    })
    it(' for (42, "42") return false  ', function() {
        assert.equal(testing_lib.equal(42, "42"), false)
    })
})


describe("toString", function() {
    objects.forEach(o => {
        let title = ''.concat('for ',o.id,' return default string')
        let result = 'default string'
        if (o.id === 'date') {
            title = ''.concat('for ',o.id,' return "2018-11-16T20:14:28.000"')
            result = '2018-11-16T20:14:28.000'
        } else if (!['undefine','NaN','null','empty array','array','object','empty object'].includes(o.id)) {
            title = ''.concat('for ',o.id,' return .toString()')
            result = o.param.toString()
        }
        it(title, function() {
            assert.equal(testing_lib.toString(o.param,'default string'), result)
        })
    })
})

describe("toInt", function() {
    it('for negative number return -42', function() {
        assert.equal(testing_lib.toInt(-42,999), -42)
    })
    it('for float return default 999', function() {
        assert.equal(testing_lib.toInt(1.9,999), 999)
    })
    objects.forEach(o => {
        let title = ''.concat('for ',o.id,' return default 999')
        let result = 999
        if (['number'].includes(o.id)) {
            title = ''.concat('for ',o.id,' return 42')
            result = 42
        }
        it(title, function() {
            assert.equal(testing_lib.toInt(o.param,999), result)
        })
    })
})

describe("toFloat", function() {
    it('for float return 42.9', function() {
        assert.equal(testing_lib.toFloat(42.9,999), 42.9)
    })
    it('for negative float return -42.9', function() {
        assert.equal(testing_lib.toFloat(-42.9,999), -42.9)
    })
    objects.forEach(o => {
        let title = ''.concat('for ',o.id,' return default 999')
        let result = 999
        if (['number'].includes(o.id)) {
            title = ''.concat('for ',o.id,' return 42')
            result = 42
        }
        it(title, function() {
            assert.equal(testing_lib.toFloat(o.param,999), result)
        })
    })
})

describe("toBool", function() {
    it('for value=true return true', function() {
        assert.equal(testing_lib.toBool(true), true)
    })
    it('for value="TRUE" return true', function() {
        assert.equal(testing_lib.toBool('TRUE'), true)
    })
    it('for value=1 return true', function() {
        assert.equal(testing_lib.toBool(1), true)
    })
    it('for value="1" return true', function() {
        assert.equal(testing_lib.toBool('1'), true)
    })
    it('for value=false return false', function() {
        assert.equal(testing_lib.toBool(false), false)
    })
    it('for value=0 return false', function() {
        assert.equal(testing_lib.toBool(0), false)
    })
    it('for value="0" return false', function() {
        assert.equal(testing_lib.toBool('0'), false)
    })
    objects.forEach(o => {
        let title = ''.concat('for ',o.id,' return default false')
        let result = false
        let param = o.param
        if (['boolean'].includes(o.id)) {
            title = ''.concat('for ',o.id,' return true')
            result = true
            param = true
        }
        it(title, function() {
            assert.equal(testing_lib.toBool(param, false), result)
        })
    })
})

describe("toGuid", function() {
    it('for guid return guid', function() {
        assert.equal(testing_lib.toGuid('525C249B-AE8E-4EB6-8E4C-41BFDED87531'), '525C249B-AE8E-4EB6-8E4C-41BFDED87531')
    })
    it('for bad guid return undefined', function() {
        assert.equal(testing_lib.toGuid('X25C249B-AE8E-4EB6-8E4C-41BFDED87531'), undefined)
    })
    objects.forEach(o => {
        let title = ''.concat('for ',o.id,' return undefined')
        it(title, function() {
            assert.equal(testing_lib.toGuid(o.param), undefined)
        })
    })
})

describe("toDate", function() {
    let d = new Date(2018,5,26,13,52,41).toString()
    let d_without_s = new Date(2018,5,26,13,52).toString()
    let d_without_h = new Date(2018,5,26).toString()

    it('for string "2018.06.26-13:52:41" return date 2018-06-26T13:52:41', function() {
        assert.equal(testing_lib.toDate('2018.06.26-13:52:41').toString(), d)
    })
    it('for string "2018-06-26T13:52:41" return date 2018-06-26T13:52:41', function() {
        assert.equal(testing_lib.toDate('2018-06-26T13:52:41').toString(), d)
    })
    it('for string "2018-06-26T13:52:41.999+03:00" return date 2018-06-26T13:52:41', function() {
        assert.equal(testing_lib.toDate('2018-06-26T13:52:41.999+03:00').toString(), d)
    })
    it('for string "2018-06-26T13:52:41.999Z" return date 2018-06-26T13:52:41', function() {
        assert.equal(testing_lib.toDate('2018-06-26T13:52:41.999Z').toString(), d)
    })
    let value = '2018-06-26T13:52:41.'
    for (let i = 0; i < 9; i++) {
        value = value.concat('9')
        it('for string "' + value + '" return date 2018-06-26T13:52:41', function() {
            assert.equal(testing_lib.toDate(value).toString(), d)
        })
    }
    it('for string "26.06.2018 13:52:41" return date 2018-06-26T13:52:41', function() {
        assert.equal(testing_lib.toDate('26.06.2018 13:52:41').toString(), d)
    })
    it('for string "26.06.2018 13:52" return date 2018-06-26T13:52:00', function() {
        assert.equal(testing_lib.toDate('26.06.2018 13:52').toString(), d_without_s)
    })
    it('for string "26.06.2018" return date 2018-06-26T00:00:00', function() {
        assert.equal(testing_lib.toDate('26.06.2018').toString(), d_without_h)
    })
    it('for string "2018-06-26" return date 2018-06-26T00:00:00', function() {
        assert.equal(testing_lib.toDate('2018-06-26').toString(), d_without_h)
    })
    it('for string "20180626" return date 2018-06-26T00:00:00', function() {
        assert.equal(testing_lib.toDate('20180626').toString(), d_without_h)
    })

    objects.forEach(o => {
        let title = ''.concat('for ',o.id,' return undefined')
        let result = undefined
        if (['date'].includes(o.id)) {
            title = ''.concat('for ',o.id,' return date')
            result = o.param
        }
        it(title, function() {
            assert.equal(testing_lib.toDate(o.param), result)
        })
    })
})

describe("toDateWithoutTime", function() {
    let d_without_h = new Date(2018,5,26).toString()

    it('for string "2018.06.26-13:52:41" return date 2018-06-26T00:00:00', function() {
        assert.equal(testing_lib.toDateWithoutTime('2018.06.26-13:52:41').toString(), d_without_h)
    })
    it('for string "2018-06-26T13:52:41" return date 2018-06-26T00:00:00', function() {
        assert.equal(testing_lib.toDateWithoutTime('2018-06-26T13:52:41').toString(), d_without_h)
    })
    it('for string "2018-06-26T13:52:41.999+03:00" return date 2018-06-26T00:00:00', function() {
        assert.equal(testing_lib.toDateWithoutTime('2018-06-26T13:52:41.999+03:00').toString(), d_without_h)
    })
    it('for string "2018-06-26T13:52:41.999Z" return date 2018-06-26T00:00:00', function() {
        assert.equal(testing_lib.toDateWithoutTime('2018-06-26T13:52:41.999Z').toString(), d_without_h)
    })
    let value = '2018-06-26T13:52:41.'
    for (let i = 0; i < 9; i++) {
        value = value.concat('9')
        it('for string "' + value + '" return date 2018-06-26T00:00:00', function() {
            assert.equal(testing_lib.toDateWithoutTime(value).toString(), d_without_h)
        })
    }
    it('for string "26.06.2018 13:52:41" return date 2018-06-26T00:00:00', function() {
        assert.equal(testing_lib.toDateWithoutTime('26.06.2018 13:52:41').toString(), d_without_h)
    })
    it('for string "26.06.2018 13:52" return date 2018-06-26T10:52:00', function() {
        assert.equal(testing_lib.toDateWithoutTime('26.06.2018 13:52').toString(), d_without_h)
    })
    it('for string "26.06.2018" return date 2018-06-26T00:00:00', function() {
        assert.equal(testing_lib.toDateWithoutTime('26.06.2018').toString(), d_without_h)
    })
    it('for string "2018-06-26" return date 2018-06-26T00:00:00', function() {
        assert.equal(testing_lib.toDateWithoutTime('2018-06-26').toString(), d_without_h)
    })
    it('for string "20180626" return date 2018-06-26T00:00:00', function() {
        assert.equal(testing_lib.toDateWithoutTime('20180626').toString(), d_without_h)
    })

    objects.forEach(o => {
        let title = ''.concat('for ',o.id,' return undefined')
        let result = undefined
        if (['date'].includes(o.id)) {
            title = ''.concat('for ',o.id,' return date without time')
            result = new Date(2018,10,16)
        }
        it(title, function() {
            assert.equal(testing_lib.toString(testing_lib.toDateWithoutTime(o.param),''), testing_lib.toString(result,''))
        })

    })
})

describe("toTime", function() {
    let t = new Date(1900,0,1,13,52,41).toString()
    let t_without_s = new Date(1900,0,1,13,52,0).toString()

    it('for string "13:52" return date 1900-01-01T13:52:00', function() {
        assert.equal(testing_lib.toTime('13:52').toString(), t_without_s)
    })

    it('for string "13:52:41" return date 1900-01-01T13:52:41', function() {
        assert.equal(testing_lib.toTime('13:52:41').toString(), t)
    })

    let value = '13:52:41.'
    for (let i = 0; i < 9; i++) {
        value = value.concat('9')
        it('for string "' + value + '" return date 1900-01-01T13:52:41', function() {
            assert.equal(testing_lib.toTime(value).toString(), t)
        })
    }

    objects.forEach(o => {
        let title = ''.concat('for ',o.id,' return undefined')
        let result = undefined
        if (['date'].includes(o.id)) {
            title = ''.concat('for ',o.id,' return time')
            result = '1900-01-01T20:14:28.000'
        }
        it(title, function() {
            assert.equal(testing_lib.toString(testing_lib.toTime(o.param),''), testing_lib.toString(result,''))
        })
    })
})

describe("toIp", function() {
    it('for 192.168.0.199 return 192.168.0.199', function() {
        assert.equal(testing_lib.toIp('192.168.0.199'), '192.168.0.199')
    })
    it('for localhost return localhost', function() {
        assert.equal(testing_lib.toIp('localhost'), 'localhost')
    })
    objects.forEach(o => {
        let title = ''.concat('for ',o.id,' return undefined')
        let result = undefined
        it(title, function() {
            assert.equal(testing_lib.toIp(o.param), result)
        })
    })
})

describe("toArray", function() {
    it('for [true, "true", 3, "no"] (bool) return [true, true, false]', function() {
        assert.equal(testing_lib.toArray([true, "true", 3, "no"],'bool').join(), [true, true, false].join())
    })
    it('for ["1.1", -2.2, 3, "no"] (float) return [1.1, -2.2, 3]', function() {
        assert.equal(testing_lib.toArray(["1.1", -2.2, 3, "no"],'float').join(), [1.1, -2.2, 3].join())
    })
    it('for ["25190E38-8125-4A69-9AEF-F403F923787D", -2.2] (float) return ["25190E38-8125-4A69-9AEF-F403F923787D"]', function() {
        assert.equal(testing_lib.toArray(["25190E38-8125-4A69-9AEF-F403F923787D", -2.2],'guid').join(), ["25190E38-8125-4A69-9AEF-F403F923787D"].join())
    })
    it('for ["1.1", -2.2, 3, "no"] (int) return [3]', function() {
        assert.equal(testing_lib.toArray(["1.1", -2.2, 3, "no"],'int').join(), [3].join())
    })
    it('for ["1.1", -2.2, 3, undefined, "no", null] (string) return ["1.1", "-2.2", "3", "no"]', function() {
        assert.equal(testing_lib.toArray(["1.1", -2.2, 3, undefined, "no", null],'string').join(), ["1.1", "-2.2", "3", "no"].join())
    })
    it('for "1.1" (string) return ["1.1"]', function() {
        assert.equal(testing_lib.toArray("1.1",'string').join(), ["1.1"].join())
    })
})


describe("toCharArray", function() {
    objects.forEach(o => {
        let title = ''.concat('for ',o.id,' return empty string')
        let result = ''
        if (['string','number','boolean'].includes(o.id)) {
            result = ''.concat(o.param.toString(),o.param.toString(),o.param.toString())
            title = ''.concat('for ',o.id,' return ', result)
        }

        it(title, function() {
            // @ts-ignore
            assert.equal(testing_lib.toCharArray(o.param, 3), result)
        })
    })
})

describe("split", function() {
    it('for string "" return empty array', function() {
        assert.equal(testing_lib.split('','','').join('#'), '')
    })
    it('for string "{1}" and borders "{","}" return array ["1"]', function() {
        assert.equal(testing_lib.split('{1}','{','}').join('#'), '1')
    })
    it('for string "{1} {2} {3}" and borders "{","}" return array ["1","2","3"]', function() {
        assert.equal(testing_lib.split('{1} {2} {3}','{','}').join('#'), '1#2#3')
    })
    it('for string "{}{1}{2}" and borders "{","}" return array ["","2","3"]', function() {
        assert.equal(testing_lib.split('{}{1}{2}','{','}').join('#'), '#1#2')
    })
    it('for string "{1}{}{2}" and borders "{","}" return array ["1","","2"]', function() {
        assert.equal(testing_lib.split('{1}{}{2}','{','}').join('#'), '1##2')
    })
    it('for string "{1}{2}{}" and borders "{","}" return array ["1","2",""]', function() {
        assert.equal(testing_lib.split('{1}{2}{}','{','}').join('#'), '1#2#')
    })

    it('for string "{{1}}" and borders "{{","}}" return array ["1"]', function() {
        assert.equal(testing_lib.split('{{1}}','{{','}}').join('#'), '1')
    })
    it('for string "{{1}} {{2}} {{3}}" and borders "{{","}}" return array ["1","2","3"]', function() {
        assert.equal(testing_lib.split('{{1}} {{2}} {{3}}','{{','}}').join('#'), '1#2#3')
    })
    it('for string "{{}}{{1}}{{2}}" and borders "{{","}}" return array ["","2","3"]', function() {
        assert.equal(testing_lib.split('{{}}{{1}}{{2}}','{{','}}').join('#'), '#1#2')
    })
    it('for string "{{1}}{{}}{{2}}" and borders "{{","}}" return array ["1","","2"]', function() {
        assert.equal(testing_lib.split('{{1}}{{}}{{2}}','{{','}}').join('#'), '1##2')
    })
    it('for string "{{1}}{{2}}{{}}" and borders "{{","}}" return array ["1","2",""]', function() {
        assert.equal(testing_lib.split('{{1}}{{2}}{{}}','{{','}}').join('#'), '1#2#')
    })
    it('for string "{a} {b} {A} {b}", borders "{","}" and collapse_doubles = "collapse_without_lower" return array ["a","b","A"]', function() {
        assert.equal(testing_lib.split('{a} {b} {A} {b}','{','}','collapse_without_lower').join('#'), 'a#b#A')
    })
    it('for string "{a} {b} {A} {b}", borders "{","}" and collapse_doubles = "collapse_with_lower" return array ["a","b"]', function() {
        assert.equal(testing_lib.split('{a} {b} {A} {b}','{','}','collapse_with_lower').join('#'), 'a#b')
    })

})

describe("insertAt", function() {
    it('for string return initially string, because index is float', function() {
        assert.equal(testing_lib.insertAt('YYYYYYY', 2.1, '_XXXXX_'), 'YYYYYYY')
    })
    it('for string return initially string, because index more then initially string length', function() {
        assert.equal(testing_lib.insertAt('A', 42, 'B'), 'A')
    })

    objects.forEach(o => {
        let title = ''.concat('for ',o.id,' as string and ',o.id,' as substring return empty string')
        let result = ''
        let pos = 3
        if (['string'].includes(o.id)) {
            result = 'str_XXXXX_42'
            title = ''.concat('for ',o.id,' return ', result)
        } else if (['number'].includes(o.id)) {
            result = '4_XXXXX_2'
            title = ''.concat('for ',o.id,' return ', result)
            pos = 1
        }
        it(title, function() {
            assert.equal(testing_lib.insertAt(o.param, pos, '_XXXXX_'), result)
        })
    })
})

describe("replaceAll", function() {
    it('for ("hello, Ann","ann","John") return "hello, John"', function() {
        assert.equal(testing_lib.replaceAll("hello, Ann", "ann", "John"), "hello, John")
    })
    it('for ("1231","1","9") return "9239"', function() {
        assert.equal(testing_lib.replaceAll("1231", "1", "9"), "9239")
    })
    it('for ("123","8","1") return "123"', function() {
        assert.equal(testing_lib.replaceAll("123", "8", "1"), "123")
    })
    it('for ("1 2"," ","a") return "1a2"', function() {
        assert.equal(testing_lib.replaceAll("1 2", " ", "a"), "1a2")
    })
    it('for ("1<enter>2"," ","b") return "1b2"', function() {
        assert.equal(testing_lib.replaceAll("".concat("1",os.EOL,"2"), os.EOL, "b"), "1b2")
    })
    it('for ("1###2","##","#") without recursively return "1##2"', function() {
        assert.equal(testing_lib.replaceAll("1###2", "##", "#"), "1##2")
    })
    it('for ("1###2","##","#") with recursively return "1#2"', function() {
        assert.equal(testing_lib.replaceAll("1###2", "##", "#", true), "1#2")
    })
    it('for ("1####2","##","#") with recursively return "1#2"', function() {
        assert.equal(testing_lib.replaceAll("1####2", "##", "#", true), "1#2")
    })
    it('for ("1#####2","##","#") with recursively return "1#2"', function() {
        assert.equal(testing_lib.replaceAll("1#####2", "##", "#", true), "1#2")
    })
    objects.forEach(o => {
        let title = ''.concat('for ',o.id,' as string and undefine in other params return empty string')
        let result = ''
        if (['string','number'].includes(o.id)) {
            result = o.param.toString()
            title = ''.concat('for ',o.id,' as string and undefine in other params return string')
        }
        it(title, function() {
            assert.equal(testing_lib.replaceAll(o.param, undefined, undefined), result)
        })
    })
    objects.forEach(o => {
        let title = ''.concat('for ',o.id,' as find and undefine in other params return empty string')
        let result = ''
        it(title, function() {
            assert.equal(testing_lib.replaceAll(undefined, o.param, undefined), result)
        })
    })
    objects.forEach(o => {
        let title = ''.concat('for ',o.id,' as replace and undefine in other params return empty string')
        let result = ''
        it(title, function() {
            assert.equal(testing_lib.replaceAll(undefined, undefined, o.param), result)
        })
    })
})

describe("format", function() {
    it('for ("hello, {0}","John") return "hello, John"', function() {
        assert.equal(testing_lib.format("hello, {0}", "John"), "hello, John")
    })
    it('for ("complete {0} tasks of {1}",[35,100]) return "complete 35 tasks of 100"', function() {
        assert.equal(testing_lib.format("complete {0} tasks of {1}", [35,100]), "complete 35 tasks of 100")
    })

    objects.forEach(o => {
        let title = ''.concat('for ',o.id,' as string and undefine in replace return empty string')
        let result = ''
        if (['string','number'].includes(o.id)) {
            result = o.param.toString()
            title = ''.concat('for ',o.id,' as string and undefine in replace return string')
        }
        it(title, function() {
            assert.equal(testing_lib.format(o.param, undefined), result)
        })
    })
    objects.forEach(o => {
        let title = ''.concat('for ',o.id,' as replaces and undefine in string return empty string')
        let result = ''
        it(title, function() {
            assert.equal(testing_lib.format(undefined, o.param), result)
        })
    })
})

describe("formatExt", function() {
    it('for ("hello, [{0}]","John","[{","}]") return "hello, John"', function() {
        assert.equal(testing_lib.formatExt("hello, [{0}]", "John","[{","}]"), "hello, John")
    })
    it('for ("complete {{0}} tasks of {{1}}",[35,100],"{{","}}") return "complete 35 tasks of 100"', function() {
        assert.equal(testing_lib.formatExt("complete {{0}} tasks of {{1}}", [35,100],"{{","}}"), "complete 35 tasks of 100")
    })

    objects.forEach(o => {
        let title = ''.concat('for ',o.id,' as string and undefine in replace return empty string')
        let result = ''
        if (['string','number'].includes(o.id)) {
            result = o.param.toString()
            title = ''.concat('for ',o.id,' as string and undefine in replace return string')
        }
        it(title, function() {
            assert.equal(testing_lib.formatExt(o.param, undefined), result)
        })
    })
    objects.forEach(o => {
        let title = ''.concat('for ',o.id,' as replaces and undefine in string return empty string')
        let result = ''
        it(title, function() {
            assert.equal(testing_lib.formatExt(undefined, o.param), result)
        })
    })
})

describe("formatDate", function() {
    it('for "2018.06.26-13:52:41" and format 112 return "20180626"', function() {
        assert.equal(testing_lib.formatDate("2018.06.26-13:52:41", 112), "20180626")
    })
    it('for "2018.06.26-13:52:41" and format 126 return "2018-06-26T13:52:41.000"', function() {
        assert.equal(testing_lib.formatDate("2018.06.26-13:52:41", 126), "2018-06-26T13:52:41.000")
    })
    it('for "2018.06.26-13:52:41" and format 10126 return "2018-06-26-13-52-41-000"', function() {
        assert.equal(testing_lib.formatDate("2018.06.26-13:52:41", 10126), "2018-06-26-13-52-41-000")
    })
    objects.forEach(o => {
        let title = ''.concat('for ',o.id,' return undefined')
        let result = undefined
        if (['date'].includes(o.id)) {
            result = '20181116'
            title = ''.concat('for ',o.id,' return ', result)
        }

        it(title, function() {
            assert.equal(testing_lib.formatDate(o.param, 112), result)
        })
    })
})

describe("formatDayOfYear", function() {
    it('for "01.01.2019" return "001"', function() {
        assert.equal(testing_lib.formatDayOfYear('20190101'), '001')
    })
    it('for "01.04.2019" return "091"', function() {
        assert.equal(testing_lib.formatDayOfYear('20190401'), '091')
    })
    it('for "31.12.2019" return "365"', function() {
        assert.equal(testing_lib.formatDayOfYear('20191231'), '365')
    })
})

describe("findPropertyInObject", function() {
    it('for ({a: 1, XXX: 2},"xxx") return "XXX"', function() {
        assert.equal(testing_lib.findPropertyInObject({a: 1, XXX: 2},"xxx"), "XXX")
    })
    objects.forEach(o => {
        let title = ''.concat('for ',o.id,' as string and undefined as property name return undefined')
        it(title, function() {
            assert.equal(testing_lib.findPropertyInObject(o.param, undefined), undefined)
        })
    })
    objects.forEach(o => {
        let title = ''.concat('for ',o.id,' as string and "unknown_property" as property name return undefined')
        it(title, function() {
            assert.equal(testing_lib.findPropertyInObject(o.param, "unknown_property"), undefined)
        })
    })
})

describe("findPropertyExistsInObject", function() {
    it('for ({a: 1, XXX: 2},"xxx") return true', function() {
        assert.equal(testing_lib.findPropertyExistsInObject({a: 1, XXX: 2},"xxx"), true)
    })
    objects.forEach(o => {
        let title = ''.concat('for ',o.id,' as string and undefined as property name return false')
        it(title, function() {
            assert.equal(testing_lib.findPropertyExistsInObject(o.param, undefined), false)
        })
    })
    objects.forEach(o => {
        let title = ''.concat('for ',o.id,' as string and "unknown_property" as property name return false')
        it(title, function() {
            assert.equal(testing_lib.findPropertyExistsInObject(o.param, "unknown_property"), false)
        })
    })
})

describe("findPropertyValueInObject", function() {
    it('for ({a: 1, XXX: 2},"xxx") return 2', function() {
        assert.equal(testing_lib.findPropertyValueInObject({a: 1, XXX: 2},"xxx"), 2)
    })
    objects.forEach(o => {
        let title = ''.concat('for ',o.id,' as string and undefined as property name return undefined')
        it(title, function() {
            assert.equal(testing_lib.findPropertyValueInObject(o.param, undefined), undefined)
        })
    })
    objects.forEach(o => {
        let title = ''.concat('for ',o.id,' as string and "unknown_property" as property name return undefined')
        it(title, function() {
            assert.equal(testing_lib.findPropertyValueInObject(o.param, "unknown_property"), undefined)
        })
    })
})

describe("border_add", function() {
    it('for string "[zzz]" return "[zzz]"', function() {
        assert.equal(testing_lib.border_add('[zzz]', '[', ']'), '[zzz]')
    })
    it('for string "[42" return "[42]"', function() {
        assert.equal(testing_lib.border_add('[42', '[', ']'), '[42]')
    })
    it('for string "true]" return "[true]"', function() {
        assert.equal(testing_lib.border_add('true]', '[', ']'), '[true]')
    })

    objects.forEach(o => {
        let result = '[]'
        let title = ''.concat('for ',o.id,' as string return ', result)

        if (['date'].includes(o.id)) {
            result = '[2018-11-16T20:14:28.000]'
            title = ''.concat('for ',o.id,' return ', result)
        } else if (['boolean','number','string','function'].includes(o.id)) {
            result = ''.concat('[',o.param.toString(),']')
        }

        it(title, function() {
            assert.equal(testing_lib.border_add(o.param, '[', ']'), result)
        })
    })
})

describe("border_del", function() {
    it('for string "[zzz]" return "zzz"', function() {
        assert.equal(testing_lib.border_del('[zzz]', '[', ']'), 'zzz')
    })
    it('for string "[42" return "42"', function() {
        assert.equal(testing_lib.border_del('[42', '[', ']'), '42')
    })
    it('for string "true]" return "true"', function() {
        assert.equal(testing_lib.border_del('true]', '[', ']'), 'true')
    })

    objects.forEach(o => {
        let result = ''
        let title = ''.concat('for ',o.id,' as string return empty string')
        if (['date'].includes(o.id)) {
            result = '2018-11-16T20:14:28.000'
            title = ''.concat('for ',o.id,' return ', result)
        } else if (['boolean','number','string','function'].includes(o.id)) {
            result = ''.concat(o.param.toString())
        }

        it(title, function() {
            assert.equal(testing_lib.border_del(o.param, '[', ']'), result)
        })
    })
})
