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
<dt><a href="#parser">parser(parser_options)</a> ⇒ <code>lib_parser</code></dt>
<dd><p>Simple parser for, example, js code or sql code</p>
</dd>
<dt><a href="#readdir">readdir(dir, [options], callback)</a></dt>
<dd><p>Recursive scan directory</p>
</dd>
</dl>

## Typedefs

<dl>
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

