/**
 * Unikong
 *
 * @auther 22century
 * @license MIT license.
 * @version 0.2
 */
(function(window){

    /**
     * @const
     */
    var PATTERNS = {
        ALPHA             : new RegExp('[a-zA-Z\uFF21-\uFF3A\uFF41-\uFF5A]+'),
        NUMERIC           : new RegExp('[0-9\uFF10-\uFF19]+'),
        ALPHANUMERIC      : new RegExp('[a-zA-Z\uFF21-\uFF3A\uFF41-\uFF5A0-9\uFF10-\uFF19]+'),
        ASCII             : new RegExp('[\u0020-\u007E]+'),
        HIRAGANA          : new RegExp('[\u3040-\u309F]+'),
        KATANAKA          : new RegExp('[\u30A0-\u30FF]+'),
        HANKANA           : new RegExp('[\uFF65-\uFF9F]+'),
        HALFWIDTH         : new RegExp('[0-9a-zA-Z\u0020-\u007E\uFF61-\uFFDC\uFFE8-\uFFEE]+'),
        FULLWIDTH         : new RegExp('[^0-9a-zA-Z\u0020-\u007E\uFF61-\uFFDC\uFFE8-\uFFEE]+'),
        CYRILLIC          : new RegExp('[\u0400-\u052F\u2DE0-\u2DFF\uA640-\uA69F]+'),
        BLANK             : new RegExp('[\\s\u3000]+'),
        LINEBREAK         : new RegExp('[\r\n]+'),
        PAGEBREAK         : new RegExp('[\f]+'),
        CONTROLCODE       : new RegExp('[\u0000-\u001F\u007F]+'),
        OPENINGBRACKET    : new RegExp('[\\[}("\'\uFF08\uFF5B\u3014\u3008\u300A\u300C\u300E\u3010\u3018\u3016\u301D\u2018\u201C\uFF5F\u00AB]+'),
        CLOSINGBRACKET    : new RegExp('[\\]})"\'\uFF09\uFF5D\u3015\u3009\u300B\u300D\u300F\u3011\u3019\u3017\u301F\u2019\u201D\uFF60\u00BB]+'),
        HYPHEN            : new RegExp('[\u30FC\u30A0\u2013\u301C\uFF5E-]+'),
        ELLIPSIS          : new RegExp('[\u2024-\u2027]'),
        PUNCTUATION       : new RegExp('[.,\uFF61\u3002\uFF0E\u002E\u3001\uFF0C]+'),
        NOTPERMITTEDSTART : new RegExp('[\\]}):;/!?.,\uFF09\u3002\uFF5D\u3001\u3015\u3009\u300B\u300D\u300F\u3011\u3019\u3017\u301F\u2019\u201D\uFF60\u00BB\u30FB\u30A0\u2013\u301C\uFF5E\uFF1F\uFF01\u203C\u2047\u2048\u2049‐]+'),
        NOTPERMITTEDEND   : new RegExp('[\\[}(\uFF08\uFF5B\u3014\u3008\u300A\u300C\u300E\u3010\u3018\u3016\u301D\u2018\u201C\uFF5F\u00AB]+'),
        SURROGATEPAIR     : new RegExp('(?:[\uD800-\uDBFF][\uDC00-\uDFFF])+'),
        CJKSYMBOL         : new RegExp('[\u3000-\u303F]+'),
        MATHOPERATOR      : new RegExp('[\u2200-\u22FF]+'),
        UNICODE6EMOJI     : new RegExp([
            '(?:[\u00A9\u00AE\u2002\u2003\u2005\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B',
            '\u23E9-\u23EC\u23F0\u23F3\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600\u2601\u260E\u2611',
            '\u2614\u2615\u261D\u263A\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2693\u26A0\u26A1',
            '\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2702\u2705',
            '\u2708-\u270C\u270F\u2712\u2714\u2716\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757',
            '\u2764\u2795-\u2797\u27A1\u27B0\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299][\uFE0F]?',
            '|[\u0023-\u0039][\uFE0F]?[\u20E3]',
            '|[\uD83C][\uDC04-\uDFF0]',
            '|[\uD83D][\uDC0C-\uDEC0])+'
        ].join(''))
    };

    var hasDefineProperty = (typeof Object.defineProperty === 'function' && typeof Object.defineProperties === 'function');

    var F = {

        /**
         * 完全一致
         * @param {RegExp} pattern
         * @param {string} str
         * @returns {boolean}
         */
        match: function (pattern, str) {
            var result = PATTERNS.exec(str);
            //console.log(str, pattern, result);//, result[0].length, str.length);
            if (result === null) { return false; }
            return (result[0].length === str.length);
        },

        /**
         * 部分一致
         * @param {RegExp} pattern
         * @param {string} str
         * @returns {boolean}
         */
        search: function (pattern, str) {
            return PATTERNS.test(str);
        },

        /**
         * オブジェクト拡張
         * @param {object} obj
         * @param {string} prop
         * @param {function} descriptor
         */
        extend: function(obj, prop, descriptor) {
            if (hasDefineProperty === true) {
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

    var Unikong = function(){};

    Unikong.prototype = {
        
        /**
         * 文字列リテラルに変換
         * @param {string} str
         * @returns {string}
         */
        toUnicodeLiteral: function(str){
            var chars = [];
            for (var i = 0, l = str.length; i < l; i++) {
                chars[i] = '\\u' + ('0000' + str.charCodeAt(i).toString(16)).toUpperCase().slice(-4);
            }
            return chars.join('');
        },

        /**
         * 改行コード正規化
         * @param {string} str
         * @param {string} breakCode... 置換する改行コード（省略可）
         * @returns {string}
         */
        normalizeLinebreak: function(str, breakCode){
            return str.split(PATTERNS.LINEBREAK).join(
                (arguments.length <= 1) ? '\n' : breakCode
            );
        },

        /**
         * サロゲートペアを除去
         * @param {string} str
         * @param {string} replaceStr... 置換文字（省略可）
         * @returns {string}
         */
        stripSurrogatePair: function(str, replaceStr){
            return str.replace(PATTERNS.SURROGATEPAIR,
                (arguments.length <= 1) ? '' : replaceStr
            );
        },

        /**
         * 絵文字を除去
         * @param {string} str
         * @param {string} replaceStr... 置換文字（省略可）
         * @returns {string}
         */
        stripUnicode6Emoji: function(str, replaceStr){
            return str.replace(PATTERNS.UNICODE6EMOJI,
                (arguments.length <= 1) ? '' : replaceStr
            );
        },

        /**
         * 英字（全角半角混同）
         * @param {string} str
         * @returns {boolean}
         */
        isAlpha: function(str){
            return F.match(PATTERNS.ALPHA, str);
        },

        /**
         * 数字（全角半角混同）
         * @param {string} str
         * @returns {boolean}
         */
        isNumeric: function(str){
            return F.match(PATTERNS.NUMERIC, str);
        },

        /**
         * 英数字（全角半角混同）
         * @param {string} str
         * @returns {boolean}
         */
        isAlphaNumeric: function(str){
            return F.match(PATTERNS.AlphaNumeric, str);
        },

        /**
         * ASCIIコード
         * @param {string} str
         * @returns {boolean}
         */
        isAscii: function(str){
            return F.match(PATTERNS.ASCII, str);
        },

        /**
         * ひらがな
         * @param {string} str
         * @returns {boolean}
         */
        isHiragana: function(str){
            return F.match(PATTERNS.HIRAGANA, str);
        },

        /**
         * カタカナ
         * @param {string} str
         * @returns {boolean}
         */
        isKatakana: function(str){
            return F.match(PATTERNS.KATANAKA, str);
        },

        /**
         * 半角カナ
         * @param {string} str
         * @returns {boolean}
         */
        isHankana: function(str){
            return F.match(PATTERNS.HANKANA, str);
        },

        /**
         * 半角
         * @param {string} str
         * @returns {boolean}
         */
        isHalfWidth: function(str){
            return F.match(PATTERNS.HALFWIDTH, str);
        },

        /**
         * 全角
         * @param {string} str
         * @returns {boolean}
         */
        isFullWidth: function(str){
            return F.match(PATTERNS.FULLWIDTH, str);
        },

        /**
         * キリル文字
         * @param {string} str
         * @returns {boolean}
         */
        isCyrillic: function(str){
            return F.match(PATTERNS.CYRILLIC, str);
        },

        /**
         * 制御コード
         * @param {string} str
         * @returns {boolean}
         */
        isContralCode: function(str){
            return F.match(PATTERNS.CONTROLCODE, str);
        },

        /**
         * 改行コード
         * @param {string} str
         * @returns {boolean}
         */
        isLineBreak: function(str){
            return F.match(PATTERNS.LINEBREAK, str);
        },

        /**
         * 改ページコード
         * @param {string} str
         * @returns {boolean}
         */
        isPageBreak: function(str){
            return F.match(PATTERNS.PAGEBREAK, str);
        },

        /**
         * 空白文字
         * @param {string} str
         * @returns {boolean}
         */
        isBlank: function(str){
            return str.length === 0 || F.match(PATTERNS.BLANK, str);
        },

        /**
         * 始め括弧
         * @param {string} str
         * @returns {boolean}
         */
        isOpeningBracket: function(str){
            return F.match(PATTERNS.OPENINGBRACKET, str);
        },

        /**
         * 閉じ括弧
         * @param {string} str
         * @returns {boolean}
         */
        isClosingBracket: function(str){
            return F.match(PATTERNS.CLOSINGBRACKET, str);
        },

        /**
         * 長音符
         * @param {string} str
         * @returns {boolean}
         */
        isHyphen: function(str){
            return F.match(PATTERNS.HYPHEN, str);
        },

        /**
         * 句読点
         * @param {string} str
         * @returns {boolean}
         */
        isPunctuation: function(str){
            return F.match(PATTERNS.PUNCTUATION, str);
        },

        /**
         * リーダー、省略記号
         * @param {string} str
         * @returns {boolean}
         */
        isEllipsis: function(str){
            return F.match(PATTERNS.ELLIPSIS, str);
        },

        /**
         * 行頭禁則文字
         * @param {string} str
         * @returns {boolean}
         */
        isNotPermittedStart : function(str){
            return F.match(PATTERNS.NOTPERMITTEDSTART, str);
        },

        /**
         * 行末禁則文字
         * @param {string} str
         * @returns {boolean}
         */
        isNotPermittedEnd: function(str){
            return F.match(PATTERNS.NOTPERMITTEDEND, str);
        },

        /**
         * サロゲートペア
         * @param {string} str
         * @returns {boolean}
         */
        isSurrogatePair: function(str){
            return F.match(PATTERNS.SURROGATEPAIR, str);
        },

        /**
         * Unicode6絵文字コード
         * @param {string} str
         * @returns {boolean}
         */
        isUnicode6Emoji: function(str){
            return F.match(PATTERNS.UNICODE6EMOJI, str);
        },

        /**
         * 英字（全角半角混同）
         * @param {string} str
         * @returns {boolean}
         */
        hasAlpha: function(str){
            return F.search(PATTERNS.ALPHA, str);
        },

        /**
         * 数字（全角半角混同）
         * @param {string} str
         * @returns {boolean}
         */
        hasNumeric: function(str){
            return F.search(PATTERNS.NUMERIC, str);
        },

        /**
         * 英数字（全角半角混同）
         * @param {string} str
         * @returns {boolean}
         */
        hasAlphaNumeric: function(str){
            return F.search(PATTERNS.ALPHANUMERIC, str);
        },

        /**
         * ASCIIコード
         * @param {string} str
         * @returns {boolean}
         */
        hasAscii: function(str){
            return F.search(PATTERNS.ASCII, str);
        },

        /**
         * ひらがな
         * @param {string} str
         * @returns {boolean}
         */
        hasHiragana: function(str){
            return F.search(PATTERNS.HIRAGANA, str);
        },

        /**
         * カタカナ
         * @param {string} str
         * @returns {boolean}
         */
        hasKatakana: function(str){
            return F.search(PATTERNS.KATANAKA, str);
        },

        /**
         * 半角カナ
         * @param {string} str
         * @returns {boolean}
         */
        hasHankana: function(str){
            return F.search(PATTERNS.HANKANA, str);
        },

        /**
         * 半角
         * @param {string} str
         * @returns {boolean}
         */
        hasHalfWidth: function(str){
            return F.search(PATTERNS.HALFWIDTH, str);
        },

        /**
         * 全角
         * @param {string} str
         * @returns {boolean}
         */
        hasFullWidth: function(str){
            return F.search(PATTERNS.FULLWIDTH, str);
        },

        /**
         * キリル文字
         * @param {string} str
         * @returns {boolean}
         */
        hasCyrillic: function(str){
            return F.search(PATTERNS.CYRILLIC, str);
        },

        /**
         * 制御コード
         * @param {string} str
         * @returns {boolean}
         */
        hasContralCode: function(str){
            return F.search(PATTERNS.CONTROLCODE, str);
        },

        /**
         * 改行コード
         * @param {string} str
         * @returns {boolean}
         */
        hasLineBreak: function(str){
            return F.search(PATTERNS.LINEBREAK, str);
        },

        /**
         * 改ページコード
         * @param {string} str
         * @returns {boolean}
         */
        hasPageBreak: function(str){
            return F.search(PATTERNS.PAGEBREAK, str);
        },

        /**
         * 空白文字
         * @param {string} str
         * @returns {boolean}
         */
        hasBlank: function(str){
            return str.length === 0 || F.search(PATTERNS.BLANK, str);
        },

        /**
         * 始め括弧
         * @param {string} str
         * @returns {boolean}
         */
        hasOpeningBracket: function(str){
            return F.search(PATTERNS.OPENINGBRACKET, str);
        },

        /**
         * 閉じ括弧
         * @param {string} str
         * @returns {boolean}
         */
        hasClosingBracket: function(str){
            return F.search(PATTERNS.CLOSINGBRACKET, str);
        },

        /**
         * 長音符
         * @param {string} str
         * @returns {boolean}
         */
        hasHyphen: function(str){
            return F.search(PATTERNS.HYPHEN, str);
        },

        /**
         * 句読点
         * @param {string} str
         * @returns {boolean}
         */
        hasPunctuation: function(str){
            return F.search(PATTERNS.PUNCTUATION, str);
        },

        /**
         * リーダー、省略記号
         * @param {string} str
         * @returns {boolean}
         */
        hasEllipsis: function(str){
            return F.search(PATTERNS.ELLIPSIS, str);
        },

        /**
         * 行頭禁則文字
         * @param {string} str
         * @returns {boolean}
         */
        hasNotPermittedStart : function(str){
            return F.search(PATTERNS.NOTPERMITTEDSTART, str);
        },

        /**
         * 行末禁則文字
         * @param {string} str
         * @returns {boolean}
         */
        hasNotPermittedEnd: function(str){
            return F.search(PATTERNS.NOTPERMITTEDEND, str);
        },

        /**
         * サロゲートペア
         * @param {string} str
         * @returns {boolean}
         */
        hasSurrogatePair: function(str){
            return F.search(PATTERNS.SURROGATEPAIR, str);
        },

        /**
         * Unicode6絵文字コード
         * @param {string} str
         * @returns {boolean}
         */
        hasUnicode6Emoji: function(str){
            return F.search(PATTERNS.UNICODE6EMOJI, str);
        }

    };

    window.Unikong = Unikong;

})(window);
