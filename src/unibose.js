/**
 * Unibose
 *
 * @auther 22century
 * @license MIT license.
 * @version 0.1
 */
(function(window){

    var _ = {
        hasDefineProperty        : (typeof Object.defineProperty === 'function'
                                 && typeof Object.defineProperties === 'function'),
        patternAlpha             : new RegExp('[a-zA-Z\uFF21-\uFF3A\uFF41-\uFF5A]+'),
        patternNumeric           : new RegExp('[0-9\uFF10-\uFF19]+'),
        patternAlphaNumeric      : new RegExp('[a-zA-Z\uFF21-\uFF3A\uFF41-\uFF5A0-9\uFF10-\uFF19]+'),
        patternAscii             : new RegExp('[\u0020-\u007E]+'),
        patternHiragana          : new RegExp('[\u3040-\u309F]+'),
        patternKatanaka          : new RegExp('[\u30A0-\u30FF]+'),
        patternHanKana           : new RegExp('[\uFF65-\uFF9F]+'),
        patternHalfWidth         : new RegExp('[0-9a-zA-Z\uFF61-\uFFDC\uFFE8-\uFFEE]+'),
        patternCyrillic          : new RegExp('[\u0400-\u052F\u2DE0-\u2DFF\uA640-\uA69F]'),
        patternBlank             : new RegExp('[\f\n\r\t\v\s\u3000]+'),
        patternLineBreak         : new RegExp('[\r\n]+'),
        patternPageBreak         : new RegExp('[\f]+'),
        patternControlCode       : new RegExp('[\u0000-\u001F\u007F]+'),
        patternOpeningBracket    : new RegExp('[（(\\[｛〔〈《「『【〘〖〝‘“｟«]'),
        patternClosingBracket    : new RegExp('[）)\\]｝〕〉》」』】〙〗〟’”｠»]'),
        patternHyphen            : new RegExp('[ー゠–〜～-]'),
        patternEllipsis          : new RegExp('[\u2024-\u2027]'),
        patternPunctuation       : new RegExp('[｡。．.、，]'),
        patternNotPermittedStart : new RegExp('[）。.,)\\]｝、〕〉》」』】〙〗〟’”｠»・:;/‐゠–〜～？?！!‼⁇⁈⁉]'),
        patternNotPermittedEnd   : new RegExp('[（(\\[｛〔〈《「『【〘〖〝‘“｟«]'),
        patternSurrogatePair     : new RegExp('(?:[\uD800-\uDBFF][\uDC00-\uDFFF])+'),
        patternCJKSymbol         : new RegExp('[\u3000-\u303F]+'),
        patternMathOperator      : new RegExp('[\u2200-\u22FF]+'),
        patternUnicode6Emoji     : new RegExp([
            '[\u00A9\u00AE\u2002\u2003\u2005\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B',
            '\u23E9-\u23EC\u23F0\u23F3\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600\u2601\u260E\u2611',
            '\u2614\u2615\u261D\u263A\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2693\u26A0\u26A1',
            '\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2702\u2705',
            '\u2708-\u270C\u270F\u2712\u2714\u2716\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757',
            '\u2764\u2795-\u2797\u27A1\u27B0\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]+',
            '|(?:[\u0023-\u0039][\u20E3])+',
            '|(?:[\uD83C][\uDC04-\uDFF0])+',
            '|(?:[\uD83D][\uDC0C-\uDEC0])+'
        ].join(''))
    };

    var F = {

        /**
         * 完全一致
         * @param {RegExp} pattern
         * @param {string} str
         * @returns {boolean}
         */
        pMatch: function (pattern, str) {
            var result = pattern.exec(str);
            //console.log('"' + str + '"', str.length, str.charCodeAt(0));
            if (result === null) { return false; }
            //console.log('"' + str + '"', result, str.length, str.charCodeAt(0));
            return (result[0].length === str.length);
        },

        /**
         * オブジェクト拡張
         * @param {object} obj
         * @param {string} prop
         * @param {function} descriptor
         */
        extend: function(obj, prop, descriptor) {
            if (_.hasDefineProperty) {
                Object.defineProperty(obj, prop, {
                    enumerable: false,
                    configurable: false,
                    writable: false,
                    value: descriptor
                });
            } else {
                obj[prop] = descriptor;
            }
        }

    };

    var Unibose = function(){};

    Unibose.prototype = {

        /**
         * 文字列リテラルに変換
         * @param {string} str
         * @returns {string}
         */
        toUnicodeLiteral: function(str){
            var chars = [];
            for (var i = 0, l = str.length; i < l; i++) {
                chars[i] = '\\u' + str.charCodeAt(i).toString(16);
            }
            return chars.join('');
        },

        isAlpha: function(str){
            return F.pMatch(_.patternAlpha, str);
        },

        isNumeric: function(str){
            return F.pMatch(_.patternNumeric, str);
        },

        isAlphaNumeric: function(str){
            return F.pMatch(_.patternAlphaNumeric, str);
        },

        isLineBreak: function(str){
            return F.pMatch(_.patternLineBreak, str);
        },

        isBlank: function(str){
            return str.length === 0 || F.pMatch(_.patternBlank, str);
        },

        /**
         * 始め括弧
         * @param {string} str
         * @returns {boolean}
         */
        isOpeningBracket: function(str){
            return F.pMatch(_.patternOpeningBracket, str);
        },

        /**
         * 閉じ括弧
         * @param {string} str
         * @returns {boolean}
         */
        isClosingBracket: function(str){
            return F.pMatch(_.patternClosingBracket, str);
        },

        /**
         * 長音符
         * @param {string} str
         * @returns {boolean}
         */
        isHyphen: function(str){
            return F.pMatch(_.patternHyphen, str);
        },

        /**
         * 句読点
         * @param {string} str
         * @returns {boolean}
         */
        isPunctuation: function(str){
            return F.pMatch(_.patternPunctuation, str);
        },

        /**
         * リーダー、省略記号
         * @param {string} str
         * @returns {boolean}
         */
        isEllipsis: function(str){
            return F.pMatch(_.patternEllipsis, str);
        },

        /**
         * 行頭禁則文字
         * @param {string} str
         * @returns {boolean}
         */
        isNotPermittedStart : function(str){
            return F.pMatch(_.patternNotPermittedStart, str);
        },

        /**
         * 行末禁則文字
         * @param {string} str
         * @returns {boolean}
         */
        isNotPermittedEnd: function(str){
            return F.pMatch(_.patternNotPermittedEnd, str);
        },

        /**
         * サロゲートペア
         * @param {string} str
         * @returns {boolean}
         */
        isSurrogatePair: function(str){
            return F.pMatch(_.patternSurrogatePair, str);
        },

        /**
         * Unicode6絵文字コード
         * @param {string} str
         * @returns {boolean}
         */
        isUnicode6Emoji: function(str){
            return F.pMatch(_.patternUnicode6Emoji, str);
        },

        /**
         * 改行コード正規化
         * @param {string} string
         * @param {string} breakCode
         * @returns {string}
         */
        normalizeLinebreak: function(string, breakCode){
            if (typeof arguments[1] !== "string") {
                breakCode = "\n";
            }
            return string.split(_.patternLineBreak).join(breakCode);
        }


    };

    window.Unibose = Unibose;

})(window);