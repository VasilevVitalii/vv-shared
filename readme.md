## Install & Use
```cmd
npm i vv-shared
```
```js
const vvs = require('vv-shared')
console.log(vvs.toString(42))
```
## Functions

<dl>
<dt><a href="#isEmpty">isEmpty(object)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check object for undefined, null, NaN</p>
</dd>
<dt><a href="#isEmptyString">isEmptyString(object)</a> ⇒ <code>boolean</code></dt>
<dd><p>isEmpty + .trim() + check len &gt; 0</p>
</dd>
<dt><a href="#isFunction">isFunction(object)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check object for function</p>
</dd>
<dt><a href="#isGuid">isGuid(object)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check object for GUID</p>
</dd>
<dt><a href="#nz">nz(object1, object2, [object3], [object4], [object5])</a> ⇒ <code>any</code></dt>
<dd><p>Return first non-empty parameter</p>
</dd>
<dt><a href="#equal">equal(object1, object2)</a> ⇒ <code>boolean</code></dt>
<dd><p>Equal two objects</p>
</dd>
<dt><a href="#duplicates">duplicates(where_find_duplicates)</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd><p>Return array with duplicates items from string array (after trim and toLowerCase)</p>
</dd>
<dt><a href="#toString">toString(value, [default_value])</a> ⇒ <code>string</code></dt>
<dd><p>Convert object to string</p>
</dd>
<dt><a href="#toStringDeclension">toStringDeclension(value, phrase_one, phrase_two, phrase_few)</a> ⇒ <code>string</code></dt>
<dd><p>Add phrase to int</p>
</dd>
<dt><a href="#toInt">toInt(value, [default_value])</a> ⇒ <code>number</code></dt>
<dd><p>Convert object to integer</p>
</dd>
<dt><a href="#toFloat">toFloat(value, [default_value])</a> ⇒ <code>number</code></dt>
<dd><p>Convert object to float</p>
</dd>
<dt><a href="#toBool">toBool(value, [default_value])</a> ⇒ <code>boolean</code></dt>
<dd><p>Convert object to boolean</p>
</dd>
<dt><a href="#toGuid">toGuid(value, [default_value])</a> ⇒ <code>string</code></dt>
<dd><p>Convert object to guid</p>
</dd>
<dt><a href="#toDate">toDate([value], [default_value])</a> ⇒ <code>Date</code></dt>
<dd><p>Convert object to date (with current GMT)</p>
</dd>
<dt><a href="#toDateWithoutTime">toDateWithoutTime(value, [default_value])</a> ⇒ <code>Date</code></dt>
<dd><p>Convert object to date without time</p>
</dd>
<dt><a href="#toTime">toTime(value, [default_value])</a> ⇒ <code>Date</code></dt>
<dd><p>Convert object to date 01.01.1900 with time from object</p>
</dd>
<dt><a href="#toIp">toIp(value, [default_value])</a> ⇒ <code>string</code></dt>
<dd><p>Contert object to string with IP format</p>
</dd>
<dt><a href="#toArray">toArray(value, [type])</a> ⇒ <code>Array.&lt;Object&gt;</code></dt>
<dd><p>Convert object to array, use for function params like {string|string[]}</p>
</dd>
<dt><a href="#toCharArray">toCharArray(char, count)</a> ⇒ <code>string</code></dt>
<dd><p>Returns a string filled with the specified character</p>
</dd>
<dt><a href="#toErrorMessage">toErrorMessage(error, [prefix], [replaces], [sourсe])</a> ⇒ <code>string</code></dt>
<dd><p>Returns a nice formatted error message - wrapper for function format()</p>
</dd>
<dt><a href="#split">split(string_for_split, left, right, [collapse_doubles])</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd><p>split string, for example - &#39;{asasdas}{234235}{}{vcvc}&#39;, and return array [&#39;asasdas&#39;,&#39;234235&#39;,&#39;&#39;,&#39;vcvc&#39;]</p>
</dd>
<dt><a href="#insertAt">insertAt(string_where_insert, index, substring_for_replace)</a> ⇒ <code>string</code></dt>
<dd><p>insert substring in string</p>
</dd>
<dt><a href="#replaceAll">replaceAll(string_where_find, find, replace, [recursively])</a> ⇒ <code>string</code></dt>
<dd><p>Replace all substring in string</p>
</dd>
<dt><a href="#format">format(string_for_format, [replaces])</a> ⇒ <code>string</code></dt>
<dd><p>Replace substrings in string like format function in c#</p>
</dd>
<dt><a href="#formatExt">formatExt(string_for_format, [replaces], [left], [right])</a> ⇒ <code>string</code></dt>
<dd><p>Replace substrings in string like function &quot;format&quot; with specify border characters</p>
</dd>
<dt><a href="#formatDate">formatDate(date, format)</a> ⇒ <code>string</code></dt>
<dd><p>Format date to string</p>
</dd>
<dt><a href="#cutFromArray">cutFromArray(arr, index)</a> ⇒ <code>Array.&lt;Object&gt;</code></dt>
<dd><p>return array without one element - cut it (analog slice), but the original array does not change</p>
</dd>
<dt><a href="#dateAdd">dateAdd(interval, value, date)</a> ⇒ <code>Date</code></dt>
<dd><p>increase (or decrease) date by second or minutes or hours or days</p>
</dd>
<dt><a href="#findPropertyInObject">findPropertyInObject(object, property_name)</a> ⇒ <code>string</code></dt>
<dd><p>Search case insensitive property name in object</p>
</dd>
<dt><a href="#findPropertyExistsInObject">findPropertyExistsInObject(object, property_name)</a> ⇒ <code>boolean</code></dt>
<dd><p>Checking if exists insensitive property name in object</p>
</dd>
<dt><a href="#findPropertyValueInObject">findPropertyValueInObject(object, property_name, [default_value])</a> ⇒ <code>any</code></dt>
<dd><p>Search value by case insensitive property name in object</p>
</dd>
<dt><a href="#border_add">border_add(string_where_add, [left], [right])</a> ⇒ <code>string</code></dt>
<dd><p>For left and right in string add border string, if border not exists</p>
</dd>
<dt><a href="#border_del">border_del(string_where_find, [left], [right])</a> ⇒ <code>string</code></dt>
<dd><p>For left and right in string remove border string, if border not exists</p>
</dd>
<dt><a href="#parser">parser(parser_options)</a> ⇒ <code>lib_parser</code></dt>
<dd><p>Simple parser for, example, js code or sql code</p>
</dd>
<dt><a href="#text_page_char">text_page_char(text, page_size)</a> ⇒ <code><a href="#type_text_page_char">Array.&lt;type_text_page_char&gt;</a></code></dt>
<dd><p>Text pagination by char count per one page</p>
</dd>
<dt><a href="#text_page_byte">text_page_byte(text, text_page_char_result)</a> ⇒ <code><a href="#type_text_page_byte">Array.&lt;type_text_page_byte&gt;</a></code></dt>
<dd><p>Convert function text_page_char result to byte markup for fs.createReadStream(...)</p>
</dd>
<dt><a href="#readdir">readdir(dir, [options], callback)</a></dt>
<dd><p>Recursive scan directory</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#type_text_page_char">type_text_page_char</a></dt>
<dd></dd>
<dt><a href="#type_text_page_byte">type_text_page_byte</a></dt>
<dd></dd>
<dt><a href="#parser_options">parser_options</a> : <code>lib_parser.type_options</code></dt>
<dd></dd>
<dt><a href="#parser_lexem">parser_lexem</a> : <code>lib_parser.type_lexem</code></dt>
<dd></dd>
<dt><a href="#parser_lexem_type">parser_lexem_type</a> : <code>lib_parser.type_lexem_type</code></dt>
<dd></dd>
<dt><a href="#type_readdir_options">type_readdir_options</a></dt>
<dd></dd>
<dt><a href="#type_readdir">type_readdir</a></dt>
<dd></dd>
</dl>

<a name="isEmpty"></a>

## isEmpty(object) ⇒ <code>boolean</code>
Check object for undefined, null, NaN

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>any</code> | object for check |

<a name="isEmptyString"></a>

## isEmptyString(object) ⇒ <code>boolean</code>
isEmpty + .trim() + check len > 0

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>any</code> | object for check |

<a name="isFunction"></a>

## isFunction(object) ⇒ <code>boolean</code>
Check object for function

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>any</code> | object for check |

<a name="isGuid"></a>

## isGuid(object) ⇒ <code>boolean</code>
Check object for GUID

**Kind**: global function  
**Returns**: <code>boolean</code> - always boolean (no undefined)  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>any</code> | object for check |

**Example**  
```js
console.log(require('vv-shared').isGuid(undefined)) // return falseconsole.log(require('vv-shared').isGuid(null)) // return falseconsole.log(require('vv-shared').isGuid('')) // return falseconsole.log(require('vv-shared').isGuid('A36E9853-7118-4CC2-B770-765FCF05A82B')) // return true
```
<a name="nz"></a>

## nz(object1, object2, [object3], [object4], [object5]) ⇒ <code>any</code>
Return first non-empty parameter

**Kind**: global function  

| Param | Type |
| --- | --- |
| object1 | <code>any</code> | 
| object2 | <code>any</code> | 
| [object3] | <code>any</code> | 
| [object4] | <code>any</code> | 
| [object5] | <code>any</code> | 

<a name="equal"></a>

## equal(object1, object2) ⇒ <code>boolean</code>
Equal two objects

**Kind**: global function  

| Param | Type |
| --- | --- |
| object1 | <code>any</code> | 
| object2 | <code>any</code> | 

<a name="duplicates"></a>

## duplicates(where_find_duplicates) ⇒ <code>Array.&lt;string&gt;</code>
Return array with duplicates items from string array (after trim and toLowerCase)

**Kind**: global function  

| Param | Type |
| --- | --- |
| where_find_duplicates | <code>Array.&lt;string&gt;</code> | 

<a name="toString"></a>

## toString(value, [default_value]) ⇒ <code>string</code>
Convert object to string

**Kind**: global function  
**Returns**: <code>string</code> - string or undefined  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | object for convert |
| [default_value] | <code>any</code> | default value |

**Example**  
```js
console.log(require('vv-shared').toString(undefined)) // return undefinedconsole.log(require('vv-shared').toString(undefined,'my default string')) // return 'my default string'console.log(require('vv-shared').toString({a: 5},'my default string')) // return 'my default string'console.log(require('vv-shared').toString([1,2,3],'my default string')) // return 'my default string'console.log(require('vv-shared').toString('','my default string')) // return empty stringconsole.log(require('vv-shared').toString(new Date(),'my default string')) // return formatDate(..., 126)console.log(require('vv-shared').toString(45,'my default string')) // return '45'console.log(require('vv-shared').toString('hello','my default string')) // return 'hello'
```
<a name="toStringDeclension"></a>

## toStringDeclension(value, phrase_one, phrase_two, phrase_few) ⇒ <code>string</code>
Add phrase to int

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | int for add phrase |
| phrase_one | <code>string</code> |  |
| phrase_two | <code>string</code> |  |
| phrase_few | <code>string</code> |  |

**Example**  
```js
console.log(require('vv-shared').toStringDeclension(5, 'найдена', 'найдено', 'найдены'))
```
<a name="toInt"></a>

## toInt(value, [default_value]) ⇒ <code>number</code>
Convert object to integer

**Kind**: global function  
**Returns**: <code>number</code> - integer or undefined  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | object for convert |
| [default_value] | <code>any</code> | default value |

**Example**  
```js
console.log(require('vv-shared').toInt('abc')) // return undefinedconsole.log(require('vv-shared').toInt('abc','xyz')) // return undefinedconsole.log(require('vv-shared').toInt('77',42)) // return 77console.log(require('vv-shared').toInt('-77',42)) // return -77console.log(require('vv-shared').toInt('77.2',42)) // return 42
```
<a name="toFloat"></a>

## toFloat(value, [default_value]) ⇒ <code>number</code>
Convert object to float

**Kind**: global function  
**Returns**: <code>number</code> - float or undefined  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | object for convert |
| [default_value] | <code>any</code> | default value |

**Example**  
```js
console.log(require('vv-shared').toFloat('abc')) // return undefinedconsole.log(require('vv-shared').toFloat('abc','xyz')) // return undefinedconsole.log(require('vv-shared').toFloat('abc','-42.42')) // return -42.42console.log(require('vv-shared').toFloat('77',42)) // return 77console.log(require('vv-shared').toFloat('77.2',42)) // return 77.2console.log(require('vv-shared').toFloat('-77.2',42)) // return -77.2
```
<a name="toBool"></a>

## toBool(value, [default_value]) ⇒ <code>boolean</code>
Convert object to boolean

**Kind**: global function  
**Returns**: <code>boolean</code> - boolean or undefined  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | object for convert |
| [default_value] | <code>any</code> | default value |

**Example**  
```js
console.log(require('vv-shared').toBool(2)) // return undefinedconsole.log(require('vv-shared').toBool('abc')) // return undefinedconsole.log(require('vv-shared').toBool('abc','false')) // return falseconsole.log(require('vv-shared').toBool(0)) // return trueconsole.log(require('vv-shared').toBool(1)) // return trueconsole.log(require('vv-shared').toBool('TruE')) // return trueconsole.log(require('vv-shared').toBool('true')) // return trueconsole.log(require('vv-shared').toBool('1')) // return true
```
<a name="toGuid"></a>

## toGuid(value, [default_value]) ⇒ <code>string</code>
Convert object to guid

**Kind**: global function  
**Returns**: <code>string</code> - guid or undefined  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | object for convert |
| [default_value] | <code>any</code> | default value |

**Example**  
```js
console.log(require('vv-shared').toGuid(undefined)) // return undefinedconsole.log(require('vv-shared').toGuid('')) // return undefinedconsole.log(require('vv-shared').toGuid('A36E9853-7118-4CC2-B770-765FCF05A82B')) // return 'A36E9853-7118-4CC2-B770-765FCF05A82B'
```
<a name="toDate"></a>

## toDate([value], [default_value]) ⇒ <code>Date</code>
Convert object to date (with current GMT)

**Kind**: global function  
**Returns**: <code>Date</code> - date or undefined  

| Param | Type | Description |
| --- | --- | --- |
| [value] | <code>any</code> | object for convert |
| [default_value] | <code>any</code> | default value |

**Example**  
```js
console.log(require('vv-shared').toDate('2018-04-12T16:35:49')) // return true dateconsole.log(require('vv-shared').toDate('2018-04-12T16:35:49.1')) // return true dateconsole.log(require('vv-shared').toDate('2018-04-12T16:35:49.12')) // return true dateconsole.log(require('vv-shared').toDate('2018-04-12T16:35:49.123')) // return true dateconsole.log(require('vv-shared').toDate('2018-04-12T16:35:49.1234')) // return true dateconsole.log(require('vv-shared').toDate('2018-04-12T16:35:49.12345')) // return true dateconsole.log(require('vv-shared').toDate('2018-04-12T16:35:49.123456')) // return true dateconsole.log(require('vv-shared').toDate('2018-04-12T16:35:49.1234567')) // return true dateconsole.log(require('vv-shared').toDate('2018-04-12T16:35:49.12345678')) // return true dateconsole.log(require('vv-shared').toDate('2018-04-12T16:35:49.123456789')) // return true dateconsole.log(require('vv-shared').toDate('2018-04-12T16:35:49.123+03:00')) // return true date WITH CURRENT GMT (ignore +03 from example)console.log(require('vv-shared').toDate('2018-04-12T16:35:49.123Z')) // return true dateconsole.log(require('vv-shared').toDate('2018-04-12')) // return true dateconsole.log(require('vv-shared').toDate('12.04.2018')) // return true dateconsole.log(require('vv-shared').toDate('12.04.2018 16:35')) // return true dateconsole.log(require('vv-shared').toDate('12.04.2018 16:35:49')) // return true dateconsole.log(require('vv-shared').toDate('20180412')) // return true date
```
<a name="toDateWithoutTime"></a>

## toDateWithoutTime(value, [default_value]) ⇒ <code>Date</code>
Convert object to date without time

**Kind**: global function  
**Returns**: <code>Date</code> - date without time or undefined  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | object for convert |
| [default_value] | <code>any</code> | default value |

**Example**  
```js
// because this function based on toDate() with add cut off time, get them examples and change toDate to toDateWithoutTime
```
<a name="toTime"></a>

## toTime(value, [default_value]) ⇒ <code>Date</code>
Convert object to date 01.01.1900 with time from object

**Kind**: global function  
**Returns**: <code>Date</code> - date 01.01.1900 with time from or undefined  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | object for convert |
| [default_value] | <code>any</code> | default value |

**Example**  
```js
// because this function based on toDate() with change day,month,year to 01.01.1900, get them examples and change toDate to toTimeconsole.log(require('vv-shared').toTime('16:35')) // return true dateconsole.log(require('vv-shared').toTime('16:35.49')) // return true dateconsole.log(require('vv-shared').toTime('16:35.49.1')) // return true dateconsole.log(require('vv-shared').toTime('16:35.49.12')) // return true dateconsole.log(require('vv-shared').toTime('16:35.49.123')) // return true dateconsole.log(require('vv-shared').toTime('16:35.49.1234')) // return true dateconsole.log(require('vv-shared').toTime('16:35.49.12345')) // return true dateconsole.log(require('vv-shared').toTime('16:35.49.123456')) // return true dateconsole.log(require('vv-shared').toTime('16:35.49.1234567')) // return true dateconsole.log(require('vv-shared').toTime('16:35.49.12345678')) // return true dateconsole.log(require('vv-shared').toTime('16:35.49.123456789')) // return true date
```
<a name="toIp"></a>

## toIp(value, [default_value]) ⇒ <code>string</code>
Contert object to string with IP format

**Kind**: global function  
**Returns**: <code>string</code> - string with IP format or undefined  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | object for convert |
| [default_value] | <code>any</code> | default value |

**Example**  
```js
console.log(require('vv-shared').toIp('LOCALHOST')) // return 'localhost'console.log(require('vv-shared').toIp('localhost')) // return 'localhost'console.log(require('vv-shared').toIp('192.168.1.2')) // return '192.168.1.2'console.log(require('vv-shared').toIp('abc','192.168.1.2')) // return '192.168.1.2'console.log(require('vv-shared').toIp('abc')) // return undefined
```
<a name="toArray"></a>

## toArray(value, [type]) ⇒ <code>Array.&lt;Object&gt;</code>
Convert object to array, use for function params like {string|string[]}

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> \| <code>Array.&lt;any&gt;</code> | object for convert |
| [type] | <code>&#x27;string&#x27;</code> \| <code>&#x27;int&#x27;</code> \| <code>&#x27;float&#x27;</code> \| <code>&#x27;bool&#x27;</code> \| <code>&#x27;guid&#x27;</code> \| <code>&#x27;date&#x27;</code> |  |

<a name="toCharArray"></a>

## toCharArray(char, count) ⇒ <code>string</code>
Returns a string filled with the specified character

**Kind**: global function  
**Returns**: <code>string</code> - always string (no undefined)  

| Param | Type | Description |
| --- | --- | --- |
| char | <code>string</code> | char or string for fill |
| count | <code>number</code> | count fill |

**Example**  
```js
console.log(require('vv-shared').toCharArray('abc',2)) // return 'abcabc'console.log(require('vv-shared').toCharArray(undefined,2)) // return empty stringconsole.log(require('vv-shared').toCharArray('abc',undefined)) // return empty string
```
<a name="toErrorMessage"></a>

## toErrorMessage(error, [prefix], [replaces], [sourсe]) ⇒ <code>string</code>
Returns a nice formatted error message - wrapper for function format()

**Kind**: global function  
**Returns**: <code>string</code> - always string (no undefined)  

| Param | Type | Description |
| --- | --- | --- |
| error | <code>any</code> |  |
| [prefix] | <code>string</code> | prefix text for error message |
| [replaces] | <code>any</code> | substitutions for prefix string |
| [sourсe] | <code>&#x27;stack&#x27;</code> \| <code>&#x27;message&#x27;</code> | preferred sourсe for extraction text message, default = 'stack' |

**Example**  
```js
try {throw new Error('ops')} catch (error) {throw require('vv-shared').toErrorMessage(error, 'in myFunction({0})','value')}
```
<a name="split"></a>

## split(string_for_split, left, right, [collapse_doubles]) ⇒ <code>Array.&lt;string&gt;</code>
split string, for example - '{asasdas}{234235}{}{vcvc}', and return array ['asasdas','234235','','vcvc']

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| string_for_split | <code>any</code> |  |
| left | <code>string</code> | left border |
| right | <code>string</code> | right border |
| [collapse_doubles] | <code>&#x27;no&#x27;</code> \| <code>&#x27;collapse\_with\_lower&#x27;</code> \| <code>&#x27;collapse\_without\_lower&#x27;</code> | default = 'no' |

**Example**  
```js
console.log(require('vv-shared').split('{asasdas}{234235}{}{vcvc}','{','}'))
```
<a name="insertAt"></a>

## insertAt(string_where_insert, index, substring_for_replace) ⇒ <code>string</code>
insert substring in string

**Kind**: global function  
**Returns**: <code>string</code> - always string (no undefined)  

| Param | Type | Description |
| --- | --- | --- |
| string_where_insert | <code>any</code> | string, where need insert |
| index | <code>number</code> | position for insert substring |
| substring_for_replace | <code>any</code> | substring |

**Example**  
```js
console.log(require('vv-shared').insertAt('ab',1,'XXX')) // return 'aXXXb'console.log(require('vv-shared').insertAt(42,1,'Z')) // return '4Z2'console.log(require('vv-shared').insertAt('ab',1,42)) // return 'a42b'console.log(require('vv-shared').insertAt('ab',99,'X')) // return 'ab'console.log(require('vv-shared').insertAt('ab','aa','X')) // return 'ab'console.log(require('vv-shared').insertAt(undefined,1,'X')) // return empty stringconsole.log(require('vv-shared').insertAt('ab',1,undefined)) // return 'ab'
```
<a name="replaceAll"></a>

## replaceAll(string_where_find, find, replace, [recursively]) ⇒ <code>string</code>
Replace all substring in string

**Kind**: global function  
**Returns**: <code>string</code> - always string (no undefined)  

| Param | Type | Description |
| --- | --- | --- |
| string_where_find | <code>any</code> | string where find substring |
| find | <code>any</code> | substring for find |
| replace | <code>any</code> | substring for replace |
| [recursively] | <code>boolean</code> | default = false |

**Example**  
```js
console.log(require('vv-shared').replaceAll('abcabc','b','X')) // return 'aXcaXc'console.log(require('vv-shared').replaceAll('abcabc','B','X')) // return 'aXcaXc'console.log(require('vv-shared').replaceAll(411,11,'2')) // return '42'console.log(require('vv-shared').replaceAll('412',1,'')) // return '42'console.log(require('vv-shared').replaceAll('412',undefined,undefined)) // return '412'console.log(require('vv-shared').replaceAll('412','1',undefined)) // return '412'console.log(require('vv-shared').replaceAll('412',undefined,'1')) // return '412'
```
<a name="format"></a>

## format(string_for_format, [replaces]) ⇒ <code>string</code>
Replace substrings in string like format function in c#

**Kind**: global function  
**Returns**: <code>string</code> - always string (no undefined)  

| Param | Type | Description |
| --- | --- | --- |
| string_for_format | <code>any</code> | a string, on the basis of which to return a new formatted string |
| [replaces] | <code>any</code> \| <code>Array.&lt;any&gt;</code> | substitutions |

**Example**  
```js
console.log(require('vv-shared').format('Hello, {0}!','world')) // return 'Hello, world!'console.log(require('vv-shared').format('Hello, {0} & {0}!','Johnson')) // return 'Hello, Johnson & Johnson!'console.log(require('vv-shared').format('{0}, {1}!',['Hello','world'])) // return 'Hello, world!'console.log(require('vv-shared').format('abc {0}','')) // return 'abc 'console.log(require('vv-shared').format('abc {0}',undefined)) // return 'abc 'console.log(require('vv-shared').format(42,'x')) // return '42'console.log(require('vv-shared').format(undefined,'x')) // return empty string
```
<a name="formatExt"></a>

## formatExt(string_for_format, [replaces], [left], [right]) ⇒ <code>string</code>
Replace substrings in string like function "format" with specify border characters

**Kind**: global function  
**Returns**: <code>string</code> - always string (no undefined)  

| Param | Type | Description |
| --- | --- | --- |
| string_for_format | <code>any</code> | a string, on the basis of which to return a new formatted string |
| [replaces] | <code>any</code> \| <code>Array.&lt;any&gt;</code> | substitutions |
| [left] | <code>any</code> | string left border |
| [right] | <code>any</code> | string right border |

**Example**  
```js
console.log(require('vv-shared').formatExt('Hello, [[[0]]]!','world','[[[',']]]')) // return 'Hello, world!'console.log(require('vv-shared').formatExt('Hello, {0} & {0}!','Johnson','{','}')) // return 'Hello, Johnson & Johnson!'console.log(require('vv-shared').formatExt('{{0}}, {{1}}!',['Hello','world'], '{{', '}}')) // return 'Hello, world!'
```
<a name="formatDate"></a>

## formatDate(date, format) ⇒ <code>string</code>
Format date to string

**Kind**: global function  
**Returns**: <code>string</code> - string or undefined  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>any</code> | date |
| format | <code>112</code> \| <code>1122</code> \| <code>1123</code> \| <code>1124</code> \| <code>126</code> \| <code>10126</code> \| <code>104</code> \| <code>104108</code> \| <code>1041082</code> \| <code>1041083</code> \| <code>1041084</code> \| <code>&#x27;dy&#x27;</code> \| <code>&#x27;sd&#x27;</code> | variants: 112 (yyyymmdd), 1122 (yyyymmddhh), 1123 (yyyymmddhhmi), 1124 (yyyymmddhhmiss), 126 (yyyy-mm-ddThh:mi:ss.mmm), 10126 (yyyy-mm-dd-hh-mi-ss-mmm), 104 (dd.mm.yyyy), 104108(dd.mm.yyyy hh:mi:ss), 1041082(dd.mm.yyyy hh:mi), 1041083(yyyy.mm.dd hh:mi), 1041084(yyyy.mm.dd hh:mi:ss), , 'dy' (string (length 3) with number day in year), 'sd' (string (length 3) with number second in day) |

**Example**  
```js
console.log(require('vv-shared').formatDate(new Date(),126)) // return current date as string in format yyyy-mm-ddThh:mi:ss.mmmconsole.log(require('vv-shared').formatDate(new Date(),112)) // return current date as string in format yyyymmdd
```
<a name="cutFromArray"></a>

## cutFromArray(arr, index) ⇒ <code>Array.&lt;Object&gt;</code>
return array without one element - cut it (analog slice), but the original array does not change

**Kind**: global function  

| Param | Type |
| --- | --- |
| arr | <code>Array.&lt;Object&gt;</code> | 
| index | <code>number</code> | 

<a name="dateAdd"></a>

## dateAdd(interval, value, date) ⇒ <code>Date</code>
increase (or decrease) date by second or minutes or hours or days

**Kind**: global function  

| Param | Type |
| --- | --- |
| interval | <code>&#x27;second&#x27;</code> \| <code>&#x27;minute&#x27;</code> \| <code>&#x27;hour&#x27;</code> \| <code>&#x27;day&#x27;</code> | 
| value | <code>number</code> | 
| date | <code>any</code> | 

<a name="findPropertyInObject"></a>

## findPropertyInObject(object, property_name) ⇒ <code>string</code>
Search case insensitive property name in object

**Kind**: global function  
**Returns**: <code>string</code> - property name - string or undefined  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>any</code> | object for search |
| property_name | <code>any</code> | case insensitive property name |

**Example**  
```js
console.log(require('vv-shared').findPropertyInObject({a: 5},'a')) // return 'a'console.log(require('vv-shared').findPropertyInObject({a: 5},'A')) // return 'a'console.log(require('vv-shared').findPropertyInObject({a: 5},'b')) // return undefinedconsole.log(require('vv-shared').findPropertyInObject({a: 5},undefined)) // return undefinedconsole.log(require('vv-shared').findPropertyInObject(undefined,'a')) // return undefined
```
<a name="findPropertyExistsInObject"></a>

## findPropertyExistsInObject(object, property_name) ⇒ <code>boolean</code>
Checking if exists insensitive property name in object

**Kind**: global function  
**Returns**: <code>boolean</code> - always boolean (no undefined)  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>any</code> | object for search |
| property_name | <code>any</code> | case insensitive property name |

**Example**  
```js
console.log(require('vv-shared').findPropertyExistsInObject({a: 5},'a')) // return trueconsole.log(require('vv-shared').findPropertyExistsInObject({a: 5},'A')) // return trueconsole.log(require('vv-shared').findPropertyExistsInObject({a: 5},'b')) // return falseconsole.log(require('vv-shared').findPropertyExistsInObject({a: 5},undefined)) // return falseconsole.log(require('vv-shared').findPropertyExistsInObject(undefined,'a')) // return false
```
<a name="findPropertyValueInObject"></a>

## findPropertyValueInObject(object, property_name, [default_value]) ⇒ <code>any</code>
Search value by case insensitive property name in object

**Kind**: global function  
**Returns**: <code>any</code> - value or undefined  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>any</code> | object for search |
| property_name | <code>string</code> \| <code>Array.&lt;string&gt;</code> | case insensitive property name |
| [default_value] | <code>any</code> | return this value, if property not find |

**Example**  
```js
console.log(require('vv-shared').findPropertyValueInObject({a: 5},'a')) // 5console.log(require('vv-shared').findPropertyValueInObject({a: 5},'A')) // 5console.log(require('vv-shared').findPropertyValueInObject({a: 5},'b')) // return undefinedconsole.log(require('vv-shared').findPropertyValueInObject({a: 5},undefined)) // return undefinedconsole.log(require('vv-shared').findPropertyValueInObject(undefined,'a')) // return undefined
```
<a name="border_add"></a>

## border\_add(string_where_add, [left], [right]) ⇒ <code>string</code>
For left and right in string add border string, if border not exists

**Kind**: global function  
**Returns**: <code>string</code> - always string (no undefined)  

| Param | Type | Description |
| --- | --- | --- |
| string_where_add | <code>any</code> | string where need add border |
| [left] | <code>any</code> | string left border for add |
| [right] | <code>any</code> | string right border for add |

**Example**  
```js
console.log(require('vv-shared').border_add('aaa','[',']')) // return '[aaa]'console.log(require('vv-shared').border_add('[aaa]','[',']')) // return '[aaa]'console.log(require('vv-shared').border_add(42,'[',']')) // return '[42]'console.log(require('vv-shared').border_add('b','*',undefined)) // return '*b'console.log(require('vv-shared').border_add('*b','*',undefined)) // return '*b'console.log(require('vv-shared').border_add(undefined,'[',']')) // return '[]'
```
<a name="border_del"></a>

## border\_del(string_where_find, [left], [right]) ⇒ <code>string</code>
For left and right in string remove border string, if border not exists

**Kind**: global function  
**Returns**: <code>string</code> - always string (no undefined)  

| Param | Type | Description |
| --- | --- | --- |
| string_where_find | <code>any</code> | string where need remove border |
| [left] | <code>any</code> | string left border for remove |
| [right] | <code>any</code> | string right border for remove |

**Example**  
```js
console.log(require('vv-shared').border_del('aaa','[',']')) // return 'aaa'console.log(require('vv-shared').border_del('[aaa]','[',']')) // return 'aaa'console.log(require('vv-shared').border_del(42,'[',']')) // return '42'console.log(require('vv-shared').border_del('b','*',undefined)) // return 'b'console.log(require('vv-shared').border_del('*b','*',undefined)) // return 'b'console.log(require('vv-shared').border_del(undefined,'[',']')) // return empty string
```
<a name="parser"></a>

## parser(parser_options) ⇒ <code>lib\_parser</code>
Simple parser for, example, js code or sql code

**Kind**: global function  

| Param | Type |
| --- | --- |
| parser_options | [<code>parser\_options</code>](#parser_options) | 

**Example**  
```js
let parser = require('vv-shared').parser({ brackets: {left: '(', right: ')'}, end_of_command: [';'], string_border: ['"', "'"], one_string_comment: "//"})let text = [    'let a = "hello!"  // i am comment',    'let b = (2 + 3) * 5'].join(require('os').EOL)let a = parser.remove_comment(text)let b = parser.lexemify_plain(text)let c = parser.lexemify_tree(text)
```
<a name="text_page_char"></a>

## text\_page\_char(text, page_size) ⇒ [<code>Array.&lt;type\_text\_page\_char&gt;</code>](#type_text_page_char)
Text pagination by char count per one page

**Kind**: global function  

| Param | Type |
| --- | --- |
| text | <code>string</code> | 
| page_size | <code>number</code> | 

<a name="text_page_byte"></a>

## text\_page\_byte(text, text_page_char_result) ⇒ [<code>Array.&lt;type\_text\_page\_byte&gt;</code>](#type_text_page_byte)
Convert function text_page_char result to byte markup for fs.createReadStream(...)

**Kind**: global function  

| Param | Type |
| --- | --- |
| text | <code>string</code> | 
| text_page_char_result | [<code>Array.&lt;type\_text\_page\_char&gt;</code>](#type_text_page_char) | 

<a name="readdir"></a>

## readdir(dir, [options], callback)
Recursive scan directory

**Kind**: global function  

| Param | Type |
| --- | --- |
| dir | <code>string</code> | 
| [options] | [<code>type\_readdir\_options</code>](#type_readdir_options) | 
| callback | <code>callback\_readdir</code> | 

**Example**  
```js
require('vv-shared').readdir(__dirname, undefined, (error, files) => {console.log(files)} )
```
<a name="type_text_page_char"></a>

## type\_text\_page\_char
**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| step | <code>number</code> | 
| position_start | <code>number</code> | 
| text_length | <code>number</code> | 
| offset_length | <code>number</code> | 

<a name="type_text_page_byte"></a>

## type\_text\_page\_byte
**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| step | <code>number</code> | 
| position_start | <code>number</code> | 
| position_end | <code>number</code> | 

<a name="parser_options"></a>

## parser\_options : <code>lib\_parser.type\_options</code>
**Kind**: global typedef  
<a name="parser_lexem"></a>

## parser\_lexem : <code>lib\_parser.type\_lexem</code>
**Kind**: global typedef  
<a name="parser_lexem_type"></a>

## parser\_lexem\_type : <code>lib\_parser.type\_lexem\_type</code>
**Kind**: global typedef  
<a name="type_readdir_options"></a>

## type\_readdir\_options
**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| mode | <code>&#x27;files&#x27;</code> \| <code>&#x27;paths&#x27;</code> \| <code>&#x27;all&#x27;</code> | 

<a name="type_readdir"></a>

## type\_readdir
**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| path | <code>string</code> | 
| file | <code>string</code> | 
| size_bytes | <code>number</code> | 
| date_create | <code>Date</code> | 
| date_edit | <code>Date</code> | 

