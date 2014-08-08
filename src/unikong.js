/**
 *      Unikong
 *
 *       ."`".
 *   .-./ _=_ \.-.
 *  {  (,(oYo),) }}
 *  {{ |   "   |} }
 *  { { \(---)/  }}
 *  {{  }'-=-'{ } }
 *  { { }._:_.{  }}
 *  {{  } -:- { } }
 *  {_{ }`===`{  _}
 * ((((\)     (/))))
 *
 * @auther 22century
 * @license MIT license.
 * @version 0.4
 */
(function (window) {

    var _objects = {

        /**
         * @type boolean
         */
        _defineProperty: (typeof Object.defineProperty === 'function' && typeof Object.defineProperties === 'function'),

        /**
         * @param pattern
         * @returns {{PARTIAL: RegExp, PERFECT: RegExp}}
         */
        exps : function (pattern) {
            return {
                PARTIAL: new RegExp(pattern, 'gm'),
                PERFECT: new RegExp('^' + pattern + '+$', 'm')
            };
        },

        /**
         * @param obj
         * @param prop
         * @param descriptor
         */
        extend: function (obj, prop, descriptor) {
            if (this._defineProperty === true) {
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

    /**
     * @const
     */
    var REGEXPS = {
        ALPHA             : _objects.exps('[a-zA-Z\uFF21-\uFF3A\uFF41-\uFF5A]'),
        NUMERIC           : _objects.exps('[0-9\uFF10-\uFF19]'),
        ALPHANUMERIC      : _objects.exps('[a-zA-Z\uFF21-\uFF3A\uFF41-\uFF5A0-9\uFF10-\uFF19]'),
        ASCII             : _objects.exps('[\u0020-\u007E]'),
        HIRAGANA          : _objects.exps('[\u3040-\u309F]'),
        KATANAKA          : _objects.exps('[\u30A0-\u30FF]'),
        HANKANA           : _objects.exps('[\uFF65-\uFF9F]'),
        HALFWIDTH         : _objects.exps('[0-9a-zA-Z\u0020-\u007E\uFF61-\uFFDC\uFFE8-\uFFEE]'),
        FULLWIDTH         : _objects.exps('[^0-9a-zA-Z\u0020-\u007E\uFF61-\uFFDC\uFFE8-\uFFEE]'),
        CYRILLIC          : _objects.exps('[\u0400-\u052F\u2DE0-\u2DFF\uA640-\uA69F]'),
        BLANK             : _objects.exps('[\\s\u3000]'),
        LINEBREAK         : _objects.exps('(?:\r\n|[\r\n])'),
        PAGEBREAK         : _objects.exps('[\f]'),
        CONTROLCODE       : _objects.exps('[\u0000-\u001F\u007F]'),
        OPENINGBRACKET    : _objects.exps('[\\[}("\'\uFF08\uFF5B\u3014\u3008\u300A\u300C\u300E\u3010\u3018\u3016\u301D\u2018\u201C\uFF5F\u00AB]'),
        CLOSINGBRACKET    : _objects.exps('[\\]})"\'\uFF09\uFF5D\u3015\u3009\u300B\u300D\u300F\u3011\u3019\u3017\u301F\u2019\u201D\uFF60\u00BB]'),
        HYPHEN            : _objects.exps('[\u30FC\u30A0\u2013\u301C\uFF5E-]'),
        ELLIPSIS          : _objects.exps('[\u2024-\u2027]'),
        PUNCTUATION       : _objects.exps('[.,\uFF61\u3002\uFF0E\u002E\u3001\uFF0C]'),
        NOTPERMITTEDSTART : _objects.exps('[\\]}):;/!?.,\uFF09\u3002\uFF5D\u3001\u3015\u3009\u300B\u300D\u300F\u3011\u3019\u3017\u301F\u2019\u201D\uFF60\u00BB\u30FB\u30A0\u2013\u301C\uFF5E\uFF1F\uFF01\u203C\u2047\u2048\u2049‐]'),
        NOTPERMITTEDEND   : _objects.exps('[\\[}(\uFF08\uFF5B\u3014\u3008\u300A\u300C\u300E\u3010\u3018\u3016\u301D\u2018\u201C\uFF5F\u00AB]'),
        SURROGATEPAIR     : _objects.exps('(?:[\uD800-\uDBFF][\uDC00-\uDFFF])'),
        CJKSYMBOL         : _objects.exps('[\u3000-\u303F]'),
        MATHOPERATOR      : _objects.exps('[\u2200-\u22FF]'),
        UNICODE6EMOJI     : _objects.exps([
            '(?:[\u00A9\u00AE\u2002\u2003\u2005\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B',
            '\u23E9-\u23EC\u23F0\u23F3\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600\u2601\u260E\u2611',
            '\u2614\u2615\u261D\u263A\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2693\u26A0\u26A1',
            '\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2702\u2705',
            '\u2708-\u270C\u270F\u2712\u2714\u2716\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757',
            '\u2764\u2795-\u2797\u27A1\u27B0\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299][\uFE0F]?',
            '|[\u0023-\u0039][\uFE0F]?[\u20E3]',
            '|[\uD83C][\uDC04-\uDFF0]',
            '|[\uD83D][\uDC0C-\uDEC0])'].join(''))
    };

    var _matches = {

        /**
         * @param {{PARTIAL: RegExp, PERFECT: RegExp}} pattern
         * @param {string} str
         * @returns {boolean}
         */
        perfect: function (pattern, str) {
            return pattern.PERFECT.test(str);
        },

        /**
         * @param {{PARTIAL: RegExp, PERFECT: RegExp}} pattern
         * @param {string} str
         * @returns {boolean}
         */
        partial: function (pattern, str) {
            var ret = pattern.PARTIAL.test(str);
            pattern.PARTIAL.lastIndex = 0;
            return ret;
        }

    };


    var Unikong = function () {};

    Unikong.prototype = {

        /**
         * 英字（全角半角混同）
         * @param {string} str
         * @returns {boolean}
         */
        isAlpha: function (str) {
            return _matches.perfect(REGEXPS.ALPHA, str);
        },

        /**
         * 数字（全角半角混同）
         * @param {string} str
         * @returns {boolean}
         */
        isNumeric: function (str) {
            return _matches.perfect(REGEXPS.NUMERIC, str);
        },

        /**
         * 英数字（全角半角混同）
         * @param {string} str
         * @returns {boolean}
         */
        isAlphaNumeric: function (str) {
            return _matches.perfect(REGEXPS.ALPHANUMERIC, str);
        },

        /**
         * ASCIIコード
         * @param {string} str
         * @returns {boolean}
         */
        isAscii: function (str) {
            return _matches.perfect(REGEXPS.ASCII, str);
        },

        /**
         * ひらがな
         * @param {string} str
         * @returns {boolean}
         */
        isHiragana: function (str) {
            return _matches.perfect(REGEXPS.HIRAGANA, str);
        },

        /**
         * カタカナ
         * @param {string} str
         * @returns {boolean}
         */
        isKatakana: function (str) {
            return _matches.perfect(REGEXPS.KATANAKA, str);
        },

        /**
         * 半角カナ
         * @param {string} str
         * @returns {boolean}
         */
        isHankana: function (str) {
            return _matches.perfect(REGEXPS.HANKANA, str);
        },

        /**
         * 半角
         * @param {string} str
         * @returns {boolean}
         */
        isHalfWidth: function (str) {
            return _matches.perfect(REGEXPS.HALFWIDTH, str);
        },

        /**
         * 全角
         * @param {string} str
         * @returns {boolean}
         */
        isFullWidth: function (str) {
            return _matches.perfect(REGEXPS.FULLWIDTH, str);
        },

        /**
         * キリル文字
         * @param {string} str
         * @returns {boolean}
         */
        isCyrillic: function (str) {
            return _matches.perfect(REGEXPS.CYRILLIC, str);
        },

        /**
         * 制御コード
         * @param {string} str
         * @returns {boolean}
         */
        isContralCode: function (str) {
            return _matches.perfect(REGEXPS.CONTROLCODE, str);
        },

        /**
         * 改行コード
         * @param {string} str
         * @returns {boolean}
         */
        isLineBreak: function (str) {
            return _matches.perfect(REGEXPS.LINEBREAK, str);
        },

        /**
         * 改ページコード
         * @param {string} str
         * @returns {boolean}
         */
        isPageBreak: function (str) {
            return _matches.perfect(REGEXPS.PAGEBREAK, str);
        },

        /**
         * 空白文字
         * @param {string} str
         * @returns {boolean}
         */
        isBlank: function (str) {
            return str.length === 0 || _matches.perfect(REGEXPS.BLANK, str);
        },

        /**
         * 始め括弧
         * @param {string} str
         * @returns {boolean}
         */
        isOpeningBracket: function (str) {
            return _matches.perfect(REGEXPS.OPENINGBRACKET, str);
        },

        /**
         * 閉じ括弧
         * @param {string} str
         * @returns {boolean}
         */
        isClosingBracket: function (str) {
            return _matches.perfect(REGEXPS.CLOSINGBRACKET, str);
        },

        /**
         * 長音符
         * @param {string} str
         * @returns {boolean}
         */
        isHyphen: function (str) {
            return _matches.perfect(REGEXPS.HYPHEN, str);
        },

        /**
         * 句読点
         * @param {string} str
         * @returns {boolean}
         */
        isPunctuation: function (str) {
            return _matches.perfect(REGEXPS.PUNCTUATION, str);
        },

        /**
         * リーダー、省略記号
         * @param {string} str
         * @returns {boolean}
         */
        isEllipsis: function (str) {
            return _matches.perfect(REGEXPS.ELLIPSIS, str);
        },

        /**
         * 行頭禁則文字
         * @param {string} str
         * @returns {boolean}
         */
        isNotPermittedStart : function (str) {
            return _matches.perfect(REGEXPS.NOTPERMITTEDSTART, str);
        },

        /**
         * 行末禁則文字
         * @param {string} str
         * @returns {boolean}
         */
        isNotPermittedEnd: function (str) {
            return _matches.perfect(REGEXPS.NOTPERMITTEDEND, str);
        },

        /**
         * サロゲートペア
         * @param {string} str
         * @returns {boolean}
         */
        isSurrogatePair: function (str) {
            return _matches.perfect(REGEXPS.SURROGATEPAIR, str);
        },

        /**
         * Unicode6絵文字コード
         * @param {string} str
         * @returns {boolean}
         */
        isUnicode6Emoji: function (str) {
            return _matches.perfect(REGEXPS.UNICODE6EMOJI, str);
        },

        /**
         * 英字（全角半角混同）
         * @param {string} str
         * @returns {boolean}
         */
        hasAlpha: function (str) {
            return _matches.partial(REGEXPS.ALPHA, str);
        },

        /**
         * 数字（全角半角混同）
         * @param {string} str
         * @returns {boolean}
         */
        hasNumeric: function (str) {
            return _matches.partial(REGEXPS.NUMERIC, str);
        },

        /**
         * 英数字（全角半角混同）
         * @param {string} str
         * @returns {boolean}
         */
        hasAlphaNumeric: function (str) {
            return _matches.partial(REGEXPS.ALPHANUMERIC, str);
        },

        /**
         * ASCIIコード
         * @param {string} str
         * @returns {boolean}
         */
        hasAscii: function (str) {
            return _matches.partial(REGEXPS.ASCII, str);
        },

        /**
         * ひらがな
         * @param {string} str
         * @returns {boolean}
         */
        hasHiragana: function (str) {
            return _matches.partial(REGEXPS.HIRAGANA, str);
        },

        /**
         * カタカナ
         * @param {string} str
         * @returns {boolean}
         */
        hasKatakana: function (str) {
            return _matches.partial(REGEXPS.KATANAKA, str);
        },

        /**
         * 半角カナ
         * @param {string} str
         * @returns {boolean}
         */
        hasHankana: function (str) {
            return _matches.partial(REGEXPS.HANKANA, str);
        },

        /**
         * 半角
         * @param {string} str
         * @returns {boolean}
         */
        hasHalfWidth: function (str) {
            return _matches.partial(REGEXPS.HALFWIDTH, str);
        },

        /**
         * 全角
         * @param {string} str
         * @returns {boolean}
         */
        hasFullWidth: function (str) {
            return _matches.partial(REGEXPS.FULLWIDTH, str);
        },

        /**
         * キリル文字
         * @param {string} str
         * @returns {boolean}
         */
        hasCyrillic: function (str) {
            return _matches.partial(REGEXPS.CYRILLIC, str);
        },

        /**
         * 制御コード
         * @param {string} str
         * @returns {boolean}
         */
        hasContralCode: function (str) {
            return _matches.partial(REGEXPS.CONTROLCODE, str);
        },

        /**
         * 改行コード
         * @param {string} str
         * @returns {boolean}
         */
        hasLineBreak: function (str) {
            return _matches.partial(REGEXPS.LINEBREAK, str);
        },

        /**
         * 改ページコード
         * @param {string} str
         * @returns {boolean}
         */
        hasPageBreak: function (str) {
            return _matches.partial(REGEXPS.PAGEBREAK, str);
        },

        /**
         * 空白文字
         * @param {string} str
         * @returns {boolean}
         */
        hasBlank: function (str) {
            return str.length === 0 || _matches.partial(REGEXPS.BLANK, str);
        },

        /**
         * 始め括弧
         * @param {string} str
         * @returns {boolean}
         */
        hasOpeningBracket: function (str) {
            return _matches.partial(REGEXPS.OPENINGBRACKET, str);
        },

        /**
         * 閉じ括弧
         * @param {string} str
         * @returns {boolean}
         */
        hasClosingBracket: function (str) {
            return _matches.partial(REGEXPS.CLOSINGBRACKET, str);
        },

        /**
         * 長音符
         * @param {string} str
         * @returns {boolean}
         */
        hasHyphen: function (str) {
            return _matches.partial(REGEXPS.HYPHEN, str);
        },

        /**
         * 句読点
         * @param {string} str
         * @returns {boolean}
         */
        hasPunctuation: function (str) {
            return _matches.partial(REGEXPS.PUNCTUATION, str);
        },

        /**
         * リーダー、省略記号
         * @param {string} str
         * @returns {boolean}
         */
        hasEllipsis: function (str) {
            return _matches.partial(REGEXPS.ELLIPSIS, str);
        },

        /**
         * 行頭禁則文字
         * @param {string} str
         * @returns {boolean}
         */
        hasNotPermittedStart : function (str) {
            return _matches.partial(REGEXPS.NOTPERMITTEDSTART, str);
        },

        /**
         * 行末禁則文字
         * @param {string} str
         * @returns {boolean}
         */
        hasNotPermittedEnd: function (str) {
            return _matches.partial(REGEXPS.NOTPERMITTEDEND, str);
        },

        /**
         * サロゲートペア
         * @param {string} str
         * @returns {boolean}
         */
        hasSurrogatePair: function (str) {
            return _matches.partial(REGEXPS.SURROGATEPAIR, str);
        },

        /**
         * Unicode6絵文字コード
         * @param {string} str
         * @returns {boolean}
         */
        hasUnicode6Emoji: function (str) {
            return _matches.partial(REGEXPS.UNICODE6EMOJI, str);
        },

        /**
         * サロゲートペアを考慮したカウント
         * @param {string} str
         * @returns {number}
         */
        count: function (str) {
            if (!REGEXPS.SURROGATEPAIR.PARTIAL.test(str)) {
                return str.length;
            } else {
                var count = 1;
                while (REGEXPS.SURROGATEPAIR.PARTIAL.exec(str) !== null) ++count;
                REGEXPS.SURROGATEPAIR.PARTIAL.lastIndex = 0;
                return str.length - count;
            }
        },

        /**
         * 文字列リテラルに変換
         * @param {string} str
         * @returns {string}
         */
        toUnicodeLiteral: function (str) {
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
        normalizeLinebreak: function (str, breakCode) {
            return str.split(REGEXPS.LINEBREAK.PARTIAL).join(
                (arguments.length <= 1) ? '\n' : breakCode
            );
        },

        /**
         * サロゲートペアを除去
         * @param {string} str
         * @param {string} replaceStr... 置換文字（省略可）
         * @returns {string}
         */
        stripSurrogatePair: function (str, replaceStr) {
            return str.replace(REGEXPS.SURROGATEPAIR.PARTIAL,
                (arguments.length <= 1) ? '' : replaceStr
            );
        },

        /**
         * 絵文字を除去
         * @param {string} str
         * @param {string} replaceStr... 置換文字（省略可）
         * @returns {string}
         */
        stripUnicode6Emoji: function (str, replaceStr) {
            return str.replace(REGEXPS.UNICODE6EMOJI.PARTIAL,
                (arguments.length <= 1) ? '' : replaceStr
            );
        },

        /**
         * trim
         * @param {string} str
         */
        trim: function (str) {
            return (typeof String.prototype.trim === 'function')
                ? String.prototype.trim.call(str)
                : str.replace(/^\s+|\s+$/g,'');
        },

        /**
         * trim
         * @param {string} str
         */
        trimLeft: function (str) {
            return (typeof String.prototype.trimLeft === 'function')
                ? String.prototype.trimLeft.call(str)
                : str.replace(/^\s+(.*)$/g,'$1');
        },

        /**
         * trim
         * @param {string} str
         */
        trimRight: function (str) {
            return (typeof String.prototype.trimRight === 'function')
                ? String.prototype.trimRight.call(str)
                : str.replace(/^(.*?)|\s+$/g,'$1');
        },

        /**
         * 一文字ずつの配列を作成
         * @param {string} str
         * @returns {Array}
         */
        charArray: function (str) {

            var chars = [],
                cha   = '',
                high  = /^[\uD800-\uDBFF]$/,
                low   = /^[\uDC00-\uDFFF]$/;

            if (!this.hasSurrogatePair(str)) {
                chars = Array.prototype.slice.call(str);
            } else {
                for (var i = 0, l = str.length; i < l; i++) {
                    cha = str[i];
                    if (high.test(cha) && i < l - 1) {
                        if (low.test(str[i + 1])) {
                            chars[chars.length] = String.fromCharCode(str.charCodeAt(i), str.charCodeAt(i + 1));
                            ++i;
                        }
                    } else {
                        chars[chars.length] = cha;
                    }
                }
            }

            return chars;
        }

    };

    window.Unikong = Unikong;

})(window);
