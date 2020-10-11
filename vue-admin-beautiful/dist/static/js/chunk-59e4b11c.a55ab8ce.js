/*!
 *  build: vue-admin-beautiful 
 *  copyright: chuzhixin 1204505056@qq.com 
 *  time: 2020-10-12 00:25:38
 */
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-59e4b11c"],{"0e54":function(e,t,n){(function(t,n){e.exports=n()})(0,(function(){"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function t(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}function n(e,t){if(e){if("string"===typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}}function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function i(e,t){var r;if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(r=n(e))||t&&e&&"number"===typeof e.length){r&&(e=r);var i=0;return function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return r=e[Symbol.iterator](),r.next.bind(r)}function s(e,t){return t={exports:{}},e(t,t.exports),t.exports}var l=s((function(e){function t(){return{baseUrl:null,breaks:!1,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartLists:!1,smartypants:!1,tokenizer:null,walkTokens:null,xhtml:!1}}function n(t){e.exports.defaults=t}e.exports={defaults:t(),getDefaults:t,changeDefaults:n}})),a=(l.defaults,l.getDefaults,l.changeDefaults,/[&<>"']/),o=/[&<>"']/g,c=/[<>"']|&(?!#?\w+;)/,u=/[<>"']|&(?!#?\w+;)/g,p={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},h=function(e){return p[e]};function g(e,t){if(t){if(a.test(e))return e.replace(o,h)}else if(c.test(e))return e.replace(u,h);return e}var f=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;function d(e){return e.replace(f,(function(e,t){return t=t.toLowerCase(),"colon"===t?":":"#"===t.charAt(0)?"x"===t.charAt(1)?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):""}))}var k=/(^|[^\[])\^/g;function b(e,t){e=e.source||e,t=t||"";var n={replace:function(t,r){return r=r.source||r,r=r.replace(k,"$1"),e=e.replace(t,r),n},getRegex:function(){return new RegExp(e,t)}};return n}var m=/[^\w:]/g,x=/^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;function v(e,t,n){if(e){var r;try{r=decodeURIComponent(d(n)).replace(m,"").toLowerCase()}catch(i){return null}if(0===r.indexOf("javascript:")||0===r.indexOf("vbscript:")||0===r.indexOf("data:"))return null}t&&!x.test(n)&&(n=S(t,n));try{n=encodeURI(n).replace(/%25/g,"%")}catch(i){return null}return n}var w={},_=/^[^:]+:\/*[^/]*$/,y=/^([^:]+:)[\s\S]*$/,z=/^([^:]+:\/*[^/]*)[\s\S]*$/;function S(e,t){w[" "+e]||(_.test(e)?w[" "+e]=e+"/":w[" "+e]=T(e,"/",!0)),e=w[" "+e];var n=-1===e.indexOf(":");return"//"===t.substring(0,2)?n?t:e.replace(y,"$1")+t:"/"===t.charAt(0)?n?t:e.replace(z,"$1")+t:e+t}var $={exec:function(){}};function A(e){for(var t,n,r=1;r<arguments.length;r++)for(n in t=arguments[r],t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}function R(e,t){var n=e.replace(/\|/g,(function(e,t,n){var r=!1,i=t;while(--i>=0&&"\\"===n[i])r=!r;return r?"|":" |"})),r=n.split(/ \|/),i=0;if(r.length>t)r.splice(t);else while(r.length<t)r.push("");for(;i<r.length;i++)r[i]=r[i].trim().replace(/\\\|/g,"|");return r}function T(e,t,n){var r=e.length;if(0===r)return"";var i=0;while(i<r){var s=e.charAt(r-i-1);if(s!==t||n){if(s===t||!n)break;i++}else i++}return e.substr(0,r-i)}function I(e,t){if(-1===e.indexOf(t[1]))return-1;for(var n=e.length,r=0,i=0;i<n;i++)if("\\"===e[i])i++;else if(e[i]===t[0])r++;else if(e[i]===t[1]&&(r--,r<0))return i;return-1}function Z(e){e&&e.sanitize&&!e.silent&&console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options")}var q={escape:g,unescape:d,edit:b,cleanUrl:v,resolveUrl:S,noopTest:$,merge:A,splitCells:R,rtrim:T,findClosingBracket:I,checkSanitizeDeprecation:Z},C=l.defaults,O=q.rtrim,U=q.splitCells,j=q.escape,E=q.findClosingBracket;function D(e,t,n){var r=t.href,i=t.title?j(t.title):null,s=e[1].replace(/\\([\[\]])/g,"$1");return"!"!==e[0].charAt(0)?{type:"link",raw:n,href:r,title:i,text:s}:{type:"image",raw:n,href:r,title:i,text:j(s)}}function P(e,t){var n=e.match(/^(\s+)(?:```)/);if(null===n)return t;var r=n[1];return t.split("\n").map((function(e){var t=e.match(/^\s+/);if(null===t)return e;var n=t[0];return n.length>=r.length?e.slice(r.length):e})).join("\n")}var L=function(){function e(e){this.options=e||C}var t=e.prototype;return t.space=function(e){var t=this.rules.block.newline.exec(e);if(t)return t[0].length>1?{type:"space",raw:t[0]}:{raw:"\n"}},t.code=function(e,t){var n=this.rules.block.code.exec(e);if(n){var r=t[t.length-1];if(r&&"paragraph"===r.type)return{raw:n[0],text:n[0].trimRight()};var i=n[0].replace(/^ {4}/gm,"");return{type:"code",raw:n[0],codeBlockStyle:"indented",text:this.options.pedantic?i:O(i,"\n")}}},t.fences=function(e){var t=this.rules.block.fences.exec(e);if(t){var n=t[0],r=P(n,t[3]||"");return{type:"code",raw:n,lang:t[2]?t[2].trim():t[2],text:r}}},t.heading=function(e){var t=this.rules.block.heading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[1].length,text:t[2]}},t.nptable=function(e){var t=this.rules.block.nptable.exec(e);if(t){var n={type:"table",header:U(t[1].replace(/^ *| *\| *$/g,"")),align:t[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:t[3]?t[3].replace(/\n$/,"").split("\n"):[],raw:t[0]};if(n.header.length===n.align.length){var r,i=n.align.length;for(r=0;r<i;r++)/^ *-+: *$/.test(n.align[r])?n.align[r]="right":/^ *:-+: *$/.test(n.align[r])?n.align[r]="center":/^ *:-+ *$/.test(n.align[r])?n.align[r]="left":n.align[r]=null;for(i=n.cells.length,r=0;r<i;r++)n.cells[r]=U(n.cells[r],n.header.length);return n}}},t.hr=function(e){var t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:t[0]}},t.blockquote=function(e){var t=this.rules.block.blockquote.exec(e);if(t){var n=t[0].replace(/^ *> ?/gm,"");return{type:"blockquote",raw:t[0],text:n}}},t.list=function(e){var t=this.rules.block.list.exec(e);if(t){for(var n,r,i,s,l,a,o,c=t[0],u=t[2],p=u.length>1,h=")"===u[u.length-1],g={type:"list",raw:c,ordered:p,start:p?+u.slice(0,-1):"",loose:!1,items:[]},f=t[0].match(this.rules.block.item),d=!1,k=f.length,b=0;b<k;b++)n=f[b],c=n,r=n.length,n=n.replace(/^ *([*+-]|\d+[.)]) */,""),~n.indexOf("\n ")&&(r-=n.length,n=this.options.pedantic?n.replace(/^ {1,4}/gm,""):n.replace(new RegExp("^ {1,"+r+"}","gm"),"")),b!==k-1&&(i=this.rules.block.bullet.exec(f[b+1])[0],(p?1===i.length||!h&&")"===i[i.length-1]:i.length>1||this.options.smartLists&&i!==u)&&(s=f.slice(b+1).join("\n"),g.raw=g.raw.substring(0,g.raw.length-s.length),b=k-1)),l=d||/\n\n(?!\s*$)/.test(n),b!==k-1&&(d="\n"===n.charAt(n.length-1),l||(l=d)),l&&(g.loose=!0),a=/^\[[ xX]\] /.test(n),o=void 0,a&&(o=" "!==n[1],n=n.replace(/^\[[ xX]\] +/,"")),g.items.push({type:"list_item",raw:c,task:a,checked:o,loose:l,text:n});return g}},t.html=function(e){var t=this.rules.block.html.exec(e);if(t)return{type:this.options.sanitize?"paragraph":"html",raw:t[0],pre:!this.options.sanitizer&&("pre"===t[1]||"script"===t[1]||"style"===t[1]),text:this.options.sanitize?this.options.sanitizer?this.options.sanitizer(t[0]):j(t[0]):t[0]}},t.def=function(e){var t=this.rules.block.def.exec(e);if(t){t[3]&&(t[3]=t[3].substring(1,t[3].length-1));var n=t[1].toLowerCase().replace(/\s+/g," ");return{tag:n,raw:t[0],href:t[2],title:t[3]}}},t.table=function(e){var t=this.rules.block.table.exec(e);if(t){var n={type:"table",header:U(t[1].replace(/^ *| *\| *$/g,"")),align:t[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:t[3]?t[3].replace(/\n$/,"").split("\n"):[]};if(n.header.length===n.align.length){n.raw=t[0];var r,i=n.align.length;for(r=0;r<i;r++)/^ *-+: *$/.test(n.align[r])?n.align[r]="right":/^ *:-+: *$/.test(n.align[r])?n.align[r]="center":/^ *:-+ *$/.test(n.align[r])?n.align[r]="left":n.align[r]=null;for(i=n.cells.length,r=0;r<i;r++)n.cells[r]=U(n.cells[r].replace(/^ *\| *| *\| *$/g,""),n.header.length);return n}}},t.lheading=function(e){var t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:"="===t[2].charAt(0)?1:2,text:t[1]}},t.paragraph=function(e){var t=this.rules.block.paragraph.exec(e);if(t)return{type:"paragraph",raw:t[0],text:"\n"===t[1].charAt(t[1].length-1)?t[1].slice(0,-1):t[1]}},t.text=function(e,t){var n=this.rules.block.text.exec(e);if(n){var r=t[t.length-1];return r&&"text"===r.type?{raw:n[0],text:n[0]}:{type:"text",raw:n[0],text:n[0]}}},t.escape=function(e){var t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:j(t[1])}},t.tag=function(e,t,n){var r=this.rules.inline.tag.exec(e);if(r)return!t&&/^<a /i.test(r[0])?t=!0:t&&/^<\/a>/i.test(r[0])&&(t=!1),!n&&/^<(pre|code|kbd|script)(\s|>)/i.test(r[0])?n=!0:n&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(r[0])&&(n=!1),{type:this.options.sanitize?"text":"html",raw:r[0],inLink:t,inRawBlock:n,text:this.options.sanitize?this.options.sanitizer?this.options.sanitizer(r[0]):j(r[0]):r[0]}},t.link=function(e){var t=this.rules.inline.link.exec(e);if(t){var n=E(t[2],"()");if(n>-1){var r=0===t[0].indexOf("!")?5:4,i=r+t[1].length+n;t[2]=t[2].substring(0,n),t[0]=t[0].substring(0,i).trim(),t[3]=""}var s=t[2],l="";if(this.options.pedantic){var a=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(s);a?(s=a[1],l=a[3]):l=""}else l=t[3]?t[3].slice(1,-1):"";s=s.trim().replace(/^<([\s\S]*)>$/,"$1");var o=D(t,{href:s?s.replace(this.rules.inline._escapes,"$1"):s,title:l?l.replace(this.rules.inline._escapes,"$1"):l},t[0]);return o}},t.reflink=function(e,t){var n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){var r=(n[2]||n[1]).replace(/\s+/g," ");if(r=t[r.toLowerCase()],!r||!r.href){var i=n[0].charAt(0);return{type:"text",raw:i,text:i}}var s=D(n,r,n[0]);return s}},t.strong=function(e,t,n){void 0===n&&(n="");var r=this.rules.inline.strong.start.exec(e);if(r&&(!r[1]||r[1]&&(""===n||this.rules.inline.punctuation.exec(n)))){t=t.slice(-1*e.length);var i,s="**"===r[0]?this.rules.inline.strong.endAst:this.rules.inline.strong.endUnd;s.lastIndex=0;while(null!=(r=s.exec(t)))if(i=this.rules.inline.strong.middle.exec(t.slice(0,r.index+3)),i)return{type:"strong",raw:e.slice(0,i[0].length),text:e.slice(2,i[0].length-2)}}},t.em=function(e,t,n){void 0===n&&(n="");var r=this.rules.inline.em.start.exec(e);if(r&&(!r[1]||r[1]&&(""===n||this.rules.inline.punctuation.exec(n)))){t=t.slice(-1*e.length);var i,s="*"===r[0]?this.rules.inline.em.endAst:this.rules.inline.em.endUnd;s.lastIndex=0;while(null!=(r=s.exec(t)))if(i=this.rules.inline.em.middle.exec(t.slice(0,r.index+2)),i)return{type:"em",raw:e.slice(0,i[0].length),text:e.slice(1,i[0].length-1)}}},t.codespan=function(e){var t=this.rules.inline.code.exec(e);if(t){var n=t[2].replace(/\n/g," "),r=/[^ ]/.test(n),i=n.startsWith(" ")&&n.endsWith(" ");return r&&i&&(n=n.substring(1,n.length-1)),n=j(n,!0),{type:"codespan",raw:t[0],text:n}}},t.br=function(e){var t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}},t.del=function(e){var t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[1]}},t.autolink=function(e,t){var n,r,i=this.rules.inline.autolink.exec(e);if(i)return"@"===i[2]?(n=j(this.options.mangle?t(i[1]):i[1]),r="mailto:"+n):(n=j(i[1]),r=n),{type:"link",raw:i[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}},t.url=function(e,t){var n;if(n=this.rules.inline.url.exec(e)){var r,i;if("@"===n[2])r=j(this.options.mangle?t(n[0]):n[0]),i="mailto:"+r;else{var s;do{s=n[0],n[0]=this.rules.inline._backpedal.exec(n[0])[0]}while(s!==n[0]);r=j(n[0]),i="www."===n[1]?"http://"+r:r}return{type:"link",raw:n[0],text:r,href:i,tokens:[{type:"text",raw:r,text:r}]}}},t.inlineText=function(e,t,n){var r,i=this.rules.inline.text.exec(e);if(i)return r=t?this.options.sanitize?this.options.sanitizer?this.options.sanitizer(i[0]):j(i[0]):i[0]:j(this.options.smartypants?n(i[0]):i[0]),{type:"text",raw:i[0],text:r}},e}(),B=q.noopTest,N=q.edit,F=q.merge,J={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:/^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?:\n+|$)|$)/,hr:/^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,heading:/^ {0,3}(#{1,6}) +([^\n]*?)(?: +#+)? *(?:\n+|$)/,blockquote:/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,list:/^( {0,3})(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:"^ {0,3}(?:<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$))",def:/^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,nptable:B,table:B,lheading:/^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,_paragraph:/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html)[^\n]+)*)/,text:/^[^\n]+/,_label:/(?!\s*\])(?:\\[\[\]]|[^\[\]])+/,_title:/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/};J.def=N(J.def).replace("label",J._label).replace("title",J._title).getRegex(),J.bullet=/(?:[*+-]|\d{1,9}[.)])/,J.item=/^( *)(bull) ?[^\n]*(?:\n(?!\1bull ?)[^\n]*)*/,J.item=N(J.item,"gm").replace(/bull/g,J.bullet).getRegex(),J.list=N(J.list).replace(/bull/g,J.bullet).replace("hr","\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def","\\n+(?="+J.def.source+")").getRegex(),J._tag="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",J._comment=/<!--(?!-?>)[\s\S]*?(?:-->|$)/,J.html=N(J.html,"i").replace("comment",J._comment).replace("tag",J._tag).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),J.paragraph=N(J._paragraph).replace("hr",J.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag",J._tag).getRegex(),J.blockquote=N(J.blockquote).replace("paragraph",J.paragraph).getRegex(),J.normal=F({},J),J.gfm=F({},J.normal,{nptable:"^ *([^|\\n ].*\\|.*)\\n {0,3}([-:]+ *\\|[-| :]*)(?:\\n((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)",table:"^ *\\|(.+)\\n {0,3}\\|?( *[-:]+[-| :]*)(?:\\n *((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"}),J.gfm.nptable=N(J.gfm.nptable).replace("hr",J.hr).replace("heading"," {0,3}#{1,6} ").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag",J._tag).getRegex(),J.gfm.table=N(J.gfm.table).replace("hr",J.hr).replace("heading"," {0,3}#{1,6} ").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag",J._tag).getRegex(),J.pedantic=F({},J.normal,{html:N("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment",J._comment).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/,fences:B,paragraph:N(J.normal._paragraph).replace("hr",J.hr).replace("heading"," *#{1,6} *[^\n]").replace("lheading",J.lheading).replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").getRegex()});var M={escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,autolink:/^<(scheme:[^\s\x00-\x1f<>]*|email)>/,url:B,tag:"^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",link:/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,reflink:/^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,nolink:/^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,reflinkSearch:"reflink|nolink(?!\\()",strong:{start:/^(?:(\*\*(?=[*punctuation]))|\*\*)(?![\s])|__/,middle:/^\*\*(?:(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)|\*(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)*?\*)+?\*\*$|^__(?![\s])((?:(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)|_(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)*?_)+?)__$/,endAst:/[^punctuation\s]\*\*(?!\*)|[punctuation]\*\*(?!\*)(?:(?=[punctuation_\s]|$))/,endUnd:/[^\s]__(?!_)(?:(?=[punctuation*\s])|$)/},em:{start:/^(?:(\*(?=[punctuation]))|\*)(?![*\s])|_/,middle:/^\*(?:(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)|\*(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)*?\*)+?\*$|^_(?![_\s])(?:(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)|_(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)*?_)+?_$/,endAst:/[^punctuation\s]\*(?!\*)|[punctuation]\*(?!\*)(?:(?=[punctuation_\s]|$))/,endUnd:/[^\s]_(?!_)(?:(?=[punctuation*\s])|$)/},code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,br:/^( {2,}|\\)\n(?!\s*$)/,del:B,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*]|\b_|$)|[^ ](?= {2,}\n)))/,punctuation:/^([\s*punctuation])/,_punctuation:"!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~"};M.punctuation=N(M.punctuation).replace(/punctuation/g,M._punctuation).getRegex(),M._blockSkip="\\[[^\\]]*?\\]\\([^\\)]*?\\)|`[^`]*?`|<[^>]*?>",M._overlapSkip="__[^_]*?__|\\*\\*\\[^\\*\\]*?\\*\\*",M._comment=N(J._comment).replace("(?:--\x3e|$)","--\x3e").getRegex(),M.em.start=N(M.em.start).replace(/punctuation/g,M._punctuation).getRegex(),M.em.middle=N(M.em.middle).replace(/punctuation/g,M._punctuation).replace(/overlapSkip/g,M._overlapSkip).getRegex(),M.em.endAst=N(M.em.endAst,"g").replace(/punctuation/g,M._punctuation).getRegex(),M.em.endUnd=N(M.em.endUnd,"g").replace(/punctuation/g,M._punctuation).getRegex(),M.strong.start=N(M.strong.start).replace(/punctuation/g,M._punctuation).getRegex(),M.strong.middle=N(M.strong.middle).replace(/punctuation/g,M._punctuation).replace(/overlapSkip/g,M._overlapSkip).getRegex(),M.strong.endAst=N(M.strong.endAst,"g").replace(/punctuation/g,M._punctuation).getRegex(),M.strong.endUnd=N(M.strong.endUnd,"g").replace(/punctuation/g,M._punctuation).getRegex(),M.blockSkip=N(M._blockSkip,"g").getRegex(),M.overlapSkip=N(M._overlapSkip,"g").getRegex(),M._escapes=/\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g,M._scheme=/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/,M._email=/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/,M.autolink=N(M.autolink).replace("scheme",M._scheme).replace("email",M._email).getRegex(),M._attribute=/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/,M.tag=N(M.tag).replace("comment",M._comment).replace("attribute",M._attribute).getRegex(),M._label=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,M._href=/<(?:\\[<>]?|[^\s<>\\])*>|[^\s\x00-\x1f]*/,M._title=/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/,M.link=N(M.link).replace("label",M._label).replace("href",M._href).replace("title",M._title).getRegex(),M.reflink=N(M.reflink).replace("label",M._label).getRegex(),M.reflinkSearch=N(M.reflinkSearch,"g").replace("reflink",M.reflink).replace("nolink",M.nolink).getRegex(),M.normal=F({},M),M.pedantic=F({},M.normal,{strong:{start:/^__|\*\*/,middle:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,endAst:/\*\*(?!\*)/g,endUnd:/__(?!_)/g},em:{start:/^_|\*/,middle:/^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,endAst:/\*(?!\*)/g,endUnd:/_(?!_)/g},link:N(/^!?\[(label)\]\((.*?)\)/).replace("label",M._label).getRegex(),reflink:N(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",M._label).getRegex()}),M.gfm=F({},M.normal,{escape:N(M.escape).replace("])","~|])").getRegex(),_extended_email:/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,url:/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,_backpedal:/(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,del:/^~+(?=\S)([\s\S]*?\S)~+/,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*~]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))/}),M.gfm.url=N(M.gfm.url,"i").replace("email",M.gfm._extended_email).getRegex(),M.breaks=F({},M.gfm,{br:N(M.br).replace("{2,}","*").getRegex(),text:N(M.gfm.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()});var W={block:J,inline:M},X=l.defaults,G=W.block,V=W.inline;function H(e){return e.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…")}function K(e){var t,n,r="",i=e.length;for(t=0;t<i;t++)n=e.charCodeAt(t),Math.random()>.5&&(n="x"+n.toString(16)),r+="&#"+n+";";return r}var Q=function(){function e(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||X,this.options.tokenizer=this.options.tokenizer||new L,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options;var t={block:G.normal,inline:V.normal};this.options.pedantic?(t.block=G.pedantic,t.inline=V.pedantic):this.options.gfm&&(t.block=G.gfm,this.options.breaks?t.inline=V.breaks:t.inline=V.gfm),this.tokenizer.rules=t}e.lex=function(t,n){var r=new e(n);return r.lex(t)},e.lexInline=function(t,n){var r=new e(n);return r.inlineTokens(t)};var n=e.prototype;return n.lex=function(e){return e=e.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    "),this.blockTokens(e,this.tokens,!0),this.inline(this.tokens),this.tokens},n.blockTokens=function(e,t,n){var r,i,s,l;void 0===t&&(t=[]),void 0===n&&(n=!0),e=e.replace(/^ +$/gm,"");while(e)if(r=this.tokenizer.space(e))e=e.substring(r.raw.length),r.type&&t.push(r);else if(r=this.tokenizer.code(e,t))e=e.substring(r.raw.length),r.type?t.push(r):(l=t[t.length-1],l.raw+="\n"+r.raw,l.text+="\n"+r.text);else if(r=this.tokenizer.fences(e))e=e.substring(r.raw.length),t.push(r);else if(r=this.tokenizer.heading(e))e=e.substring(r.raw.length),t.push(r);else if(r=this.tokenizer.nptable(e))e=e.substring(r.raw.length),t.push(r);else if(r=this.tokenizer.hr(e))e=e.substring(r.raw.length),t.push(r);else if(r=this.tokenizer.blockquote(e))e=e.substring(r.raw.length),r.tokens=this.blockTokens(r.text,[],n),t.push(r);else if(r=this.tokenizer.list(e)){for(e=e.substring(r.raw.length),s=r.items.length,i=0;i<s;i++)r.items[i].tokens=this.blockTokens(r.items[i].text,[],!1);t.push(r)}else if(r=this.tokenizer.html(e))e=e.substring(r.raw.length),t.push(r);else if(n&&(r=this.tokenizer.def(e)))e=e.substring(r.raw.length),this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});else if(r=this.tokenizer.table(e))e=e.substring(r.raw.length),t.push(r);else if(r=this.tokenizer.lheading(e))e=e.substring(r.raw.length),t.push(r);else if(n&&(r=this.tokenizer.paragraph(e)))e=e.substring(r.raw.length),t.push(r);else if(r=this.tokenizer.text(e,t))e=e.substring(r.raw.length),r.type?t.push(r):(l=t[t.length-1],l.raw+="\n"+r.raw,l.text+="\n"+r.text);else if(e){var a="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(a);break}throw new Error(a)}return t},n.inline=function(e){var t,n,r,i,s,l,a=e.length;for(t=0;t<a;t++)switch(l=e[t],l.type){case"paragraph":case"text":case"heading":l.tokens=[],this.inlineTokens(l.text,l.tokens);break;case"table":for(l.tokens={header:[],cells:[]},i=l.header.length,n=0;n<i;n++)l.tokens.header[n]=[],this.inlineTokens(l.header[n],l.tokens.header[n]);for(i=l.cells.length,n=0;n<i;n++)for(s=l.cells[n],l.tokens.cells[n]=[],r=0;r<s.length;r++)l.tokens.cells[n][r]=[],this.inlineTokens(s[r],l.tokens.cells[n][r]);break;case"blockquote":this.inline(l.tokens);break;case"list":for(i=l.items.length,n=0;n<i;n++)this.inline(l.items[n].tokens);break}return e},n.inlineTokens=function(e,t,n,r,i){var s;void 0===t&&(t=[]),void 0===n&&(n=!1),void 0===r&&(r=!1),void 0===i&&(i="");var l,a=e;if(this.tokens.links){var o=Object.keys(this.tokens.links);if(o.length>0)while(null!=(l=this.tokenizer.rules.inline.reflinkSearch.exec(a)))o.includes(l[0].slice(l[0].lastIndexOf("[")+1,-1))&&(a=a.slice(0,l.index)+"["+"a".repeat(l[0].length-2)+"]"+a.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}while(null!=(l=this.tokenizer.rules.inline.blockSkip.exec(a)))a=a.slice(0,l.index)+"["+"a".repeat(l[0].length-2)+"]"+a.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);while(e)if(s=this.tokenizer.escape(e))e=e.substring(s.raw.length),t.push(s);else if(s=this.tokenizer.tag(e,n,r))e=e.substring(s.raw.length),n=s.inLink,r=s.inRawBlock,t.push(s);else if(s=this.tokenizer.link(e))e=e.substring(s.raw.length),"link"===s.type&&(s.tokens=this.inlineTokens(s.text,[],!0,r)),t.push(s);else if(s=this.tokenizer.reflink(e,this.tokens.links))e=e.substring(s.raw.length),"link"===s.type&&(s.tokens=this.inlineTokens(s.text,[],!0,r)),t.push(s);else if(s=this.tokenizer.strong(e,a,i))e=e.substring(s.raw.length),s.tokens=this.inlineTokens(s.text,[],n,r),t.push(s);else if(s=this.tokenizer.em(e,a,i))e=e.substring(s.raw.length),s.tokens=this.inlineTokens(s.text,[],n,r),t.push(s);else if(s=this.tokenizer.codespan(e))e=e.substring(s.raw.length),t.push(s);else if(s=this.tokenizer.br(e))e=e.substring(s.raw.length),t.push(s);else if(s=this.tokenizer.del(e))e=e.substring(s.raw.length),s.tokens=this.inlineTokens(s.text,[],n,r),t.push(s);else if(s=this.tokenizer.autolink(e,K))e=e.substring(s.raw.length),t.push(s);else if(n||!(s=this.tokenizer.url(e,K))){if(s=this.tokenizer.inlineText(e,r,H))e=e.substring(s.raw.length),i=s.raw.slice(-1),t.push(s);else if(e){var c="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(c);break}throw new Error(c)}}else e=e.substring(s.raw.length),t.push(s);return t},t(e,null,[{key:"rules",get:function(){return{block:G,inline:V}}}]),e}(),Y=l.defaults,ee=q.cleanUrl,te=q.escape,ne=function(){function e(e){this.options=e||Y}var t=e.prototype;return t.code=function(e,t,n){var r=(t||"").match(/\S*/)[0];if(this.options.highlight){var i=this.options.highlight(e,r);null!=i&&i!==e&&(n=!0,e=i)}return r?'<pre><code class="'+this.options.langPrefix+te(r,!0)+'">'+(n?e:te(e,!0))+"</code></pre>\n":"<pre><code>"+(n?e:te(e,!0))+"</code></pre>\n"},t.blockquote=function(e){return"<blockquote>\n"+e+"</blockquote>\n"},t.html=function(e){return e},t.heading=function(e,t,n,r){return this.options.headerIds?"<h"+t+' id="'+this.options.headerPrefix+r.slug(n)+'">'+e+"</h"+t+">\n":"<h"+t+">"+e+"</h"+t+">\n"},t.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"},t.list=function(e,t,n){var r=t?"ol":"ul",i=t&&1!==n?' start="'+n+'"':"";return"<"+r+i+">\n"+e+"</"+r+">\n"},t.listitem=function(e){return"<li>"+e+"</li>\n"},t.checkbox=function(e){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"'+(this.options.xhtml?" /":"")+"> "},t.paragraph=function(e){return"<p>"+e+"</p>\n"},t.table=function(e,t){return t&&(t="<tbody>"+t+"</tbody>"),"<table>\n<thead>\n"+e+"</thead>\n"+t+"</table>\n"},t.tablerow=function(e){return"<tr>\n"+e+"</tr>\n"},t.tablecell=function(e,t){var n=t.header?"th":"td",r=t.align?"<"+n+' align="'+t.align+'">':"<"+n+">";return r+e+"</"+n+">\n"},t.strong=function(e){return"<strong>"+e+"</strong>"},t.em=function(e){return"<em>"+e+"</em>"},t.codespan=function(e){return"<code>"+e+"</code>"},t.br=function(){return this.options.xhtml?"<br/>":"<br>"},t.del=function(e){return"<del>"+e+"</del>"},t.link=function(e,t,n){if(e=ee(this.options.sanitize,this.options.baseUrl,e),null===e)return n;var r='<a href="'+te(e)+'"';return t&&(r+=' title="'+t+'"'),r+=">"+n+"</a>",r},t.image=function(e,t,n){if(e=ee(this.options.sanitize,this.options.baseUrl,e),null===e)return n;var r='<img src="'+e+'" alt="'+n+'"';return t&&(r+=' title="'+t+'"'),r+=this.options.xhtml?"/>":">",r},t.text=function(e){return e},e}(),re=function(){function e(){}var t=e.prototype;return t.strong=function(e){return e},t.em=function(e){return e},t.codespan=function(e){return e},t.del=function(e){return e},t.html=function(e){return e},t.text=function(e){return e},t.link=function(e,t,n){return""+n},t.image=function(e,t,n){return""+n},t.br=function(){return""},e}(),ie=function(){function e(){this.seen={}}var t=e.prototype;return t.serialize=function(e){return e.toLowerCase().trim().replace(/<[!\/a-z].*?>/gi,"").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,"").replace(/\s/g,"-")},t.getNextSafeSlug=function(e,t){var n=e,r=0;if(this.seen.hasOwnProperty(n)){r=this.seen[e];do{r++,n=e+"-"+r}while(this.seen.hasOwnProperty(n))}return t||(this.seen[e]=r,this.seen[n]=0),n},t.slug=function(e,t){void 0===t&&(t={});var n=this.serialize(e);return this.getNextSafeSlug(n,t.dryrun)},e}(),se=l.defaults,le=q.unescape,ae=function(){function e(e){this.options=e||se,this.options.renderer=this.options.renderer||new ne,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new re,this.slugger=new ie}e.parse=function(t,n){var r=new e(n);return r.parse(t)},e.parseInline=function(t,n){var r=new e(n);return r.parseInline(t)};var t=e.prototype;return t.parse=function(e,t){void 0===t&&(t=!0);var n,r,i,s,l,a,o,c,u,p,h,g,f,d,k,b,m,x,v="",w=e.length;for(n=0;n<w;n++)switch(p=e[n],p.type){case"space":continue;case"hr":v+=this.renderer.hr();continue;case"heading":v+=this.renderer.heading(this.parseInline(p.tokens),p.depth,le(this.parseInline(p.tokens,this.textRenderer)),this.slugger);continue;case"code":v+=this.renderer.code(p.text,p.lang,p.escaped);continue;case"table":for(c="",o="",s=p.header.length,r=0;r<s;r++)o+=this.renderer.tablecell(this.parseInline(p.tokens.header[r]),{header:!0,align:p.align[r]});for(c+=this.renderer.tablerow(o),u="",s=p.cells.length,r=0;r<s;r++){for(a=p.tokens.cells[r],o="",l=a.length,i=0;i<l;i++)o+=this.renderer.tablecell(this.parseInline(a[i]),{header:!1,align:p.align[i]});u+=this.renderer.tablerow(o)}v+=this.renderer.table(c,u);continue;case"blockquote":u=this.parse(p.tokens),v+=this.renderer.blockquote(u);continue;case"list":for(h=p.ordered,g=p.start,f=p.loose,s=p.items.length,u="",r=0;r<s;r++)k=p.items[r],b=k.checked,m=k.task,d="",k.task&&(x=this.renderer.checkbox(b),f?k.tokens.length>0&&"text"===k.tokens[0].type?(k.tokens[0].text=x+" "+k.tokens[0].text,k.tokens[0].tokens&&k.tokens[0].tokens.length>0&&"text"===k.tokens[0].tokens[0].type&&(k.tokens[0].tokens[0].text=x+" "+k.tokens[0].tokens[0].text)):k.tokens.unshift({type:"text",text:x}):d+=x),d+=this.parse(k.tokens,f),u+=this.renderer.listitem(d,m,b);v+=this.renderer.list(u,h,g);continue;case"html":v+=this.renderer.html(p.text);continue;case"paragraph":v+=this.renderer.paragraph(this.parseInline(p.tokens));continue;case"text":u=p.tokens?this.parseInline(p.tokens):p.text;while(n+1<w&&"text"===e[n+1].type)p=e[++n],u+="\n"+(p.tokens?this.parseInline(p.tokens):p.text);v+=t?this.renderer.paragraph(u):u;continue;default:var _='Token with "'+p.type+'" type was not found.';if(this.options.silent)return void console.error(_);throw new Error(_)}return v},t.parseInline=function(e,t){t=t||this.renderer;var n,r,i="",s=e.length;for(n=0;n<s;n++)switch(r=e[n],r.type){case"escape":i+=t.text(r.text);break;case"html":i+=t.html(r.text);break;case"link":i+=t.link(r.href,r.title,this.parseInline(r.tokens,t));break;case"image":i+=t.image(r.href,r.title,r.text);break;case"strong":i+=t.strong(this.parseInline(r.tokens,t));break;case"em":i+=t.em(this.parseInline(r.tokens,t));break;case"codespan":i+=t.codespan(r.text);break;case"br":i+=t.br();break;case"del":i+=t.del(this.parseInline(r.tokens,t));break;case"text":i+=t.text(r.text);break;default:var l='Token with "'+r.type+'" type was not found.';if(this.options.silent)return void console.error(l);throw new Error(l)}return i},e}(),oe=q.merge,ce=q.checkSanitizeDeprecation,ue=q.escape,pe=l.getDefaults,he=l.changeDefaults,ge=l.defaults;function fe(e,t,n){if("undefined"===typeof e||null===e)throw new Error("marked(): input parameter is undefined or null");if("string"!==typeof e)throw new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected");if("function"===typeof t&&(n=t,t=null),t=oe({},fe.defaults,t||{}),ce(t),n){var r,i=t.highlight;try{r=Q.lex(e,t)}catch(o){return n(o)}var s=function(e){var s;if(!e)try{s=ae.parse(r,t)}catch(o){e=o}return t.highlight=i,e?n(e):n(null,s)};if(!i||i.length<3)return s();if(delete t.highlight,!r.length)return s();var l=0;return fe.walkTokens(r,(function(e){"code"===e.type&&(l++,setTimeout((function(){i(e.text,e.lang,(function(t,n){if(t)return s(t);null!=n&&n!==e.text&&(e.text=n,e.escaped=!0),l--,0===l&&s()}))}),0))})),void(0===l&&s())}try{var a=Q.lex(e,t);return t.walkTokens&&fe.walkTokens(a,t.walkTokens),ae.parse(a,t)}catch(o){if(o.message+="\nPlease report this to https://github.com/markedjs/marked.",t.silent)return"<p>An error occurred:</p><pre>"+ue(o.message+"",!0)+"</pre>";throw o}}fe.options=fe.setOptions=function(e){return oe(fe.defaults,e),he(fe.defaults),fe},fe.getDefaults=pe,fe.defaults=ge,fe.use=function(e){var t=oe({},e);if(e.renderer&&function(){var n=fe.defaults.renderer||new ne,r=function(t){var r=n[t];n[t]=function(){for(var i=arguments.length,s=new Array(i),l=0;l<i;l++)s[l]=arguments[l];var a=e.renderer[t].apply(n,s);return!1===a&&(a=r.apply(n,s)),a}};for(var i in e.renderer)r(i);t.renderer=n}(),e.tokenizer&&function(){var n=fe.defaults.tokenizer||new L,r=function(t){var r=n[t];n[t]=function(){for(var i=arguments.length,s=new Array(i),l=0;l<i;l++)s[l]=arguments[l];var a=e.tokenizer[t].apply(n,s);return!1===a&&(a=r.apply(n,s)),a}};for(var i in e.tokenizer)r(i);t.tokenizer=n}(),e.walkTokens){var n=fe.defaults.walkTokens;t.walkTokens=function(t){e.walkTokens(t),n&&n(t)}}fe.setOptions(t)},fe.walkTokens=function(e,t){for(var n,r=i(e);!(n=r()).done;){var s=n.value;switch(t(s),s.type){case"table":for(var l,a=i(s.tokens.header);!(l=a()).done;){var o=l.value;fe.walkTokens(o,t)}for(var c,u=i(s.tokens.cells);!(c=u()).done;)for(var p,h=c.value,g=i(h);!(p=g()).done;){var f=p.value;fe.walkTokens(f,t)}break;case"list":fe.walkTokens(s.items,t);break;default:s.tokens&&fe.walkTokens(s.tokens,t)}}},fe.parseInline=function(e,t){if("undefined"===typeof e||null===e)throw new Error("marked.parseInline(): input parameter is undefined or null");if("string"!==typeof e)throw new Error("marked.parseInline(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected");t=oe({},fe.defaults,t||{}),ce(t);try{var n=Q.lexInline(e,t);return t.walkTokens&&fe.walkTokens(n,t.walkTokens),ae.parseInline(n,t)}catch(r){if(r.message+="\nPlease report this to https://github.com/markedjs/marked.",t.silent)return"<p>An error occurred:</p><pre>"+ue(r.message+"",!0)+"</pre>";throw r}},fe.Parser=ae,fe.parser=ae.parse,fe.Renderer=ne,fe.TextRenderer=re,fe.Lexer=Q,fe.lexer=Q.lex,fe.Tokenizer=L,fe.Slugger=ie,fe.parse=fe;var de=fe;return de}))},e4cb:function(e,t,n){}}]);