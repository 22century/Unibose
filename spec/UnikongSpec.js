(function(){

    var unikong = new Unikong();

    function equal (method, result, var_args) {
        var args = Array.prototype.slice.call(arguments);
        args.splice(0,2);
        it (args.toString() + ' to equal ' + result, function () {
            expect(method.apply(unikong, args)).toEqual(result);
        });
    }

    function not (method, result, var_args) {
        var args = Array.prototype.slice.call(arguments);
        args.splice(0,2);
        it (args.toString() + ' to not equal ' + result, function () {
            expect(method.apply(unikong, args)).not.toEqual(result);
        });
    }

    describe('count', function () {
        equal.call(this, unikong.count, 6 , '𡉴𡉴𡉴\nあ𡉴');
        equal.call(this, unikong.count, 10, '123456789あ');
    });

    describe('toUnicodeLiteral', function() {
        equal.call(this, unikong.toUnicodeLiteral, '\\u0061\\u0062\\u0063', 'abc');
    });

    describe('normalizeLinebreak', function() {
        equal.call(this, unikong.normalizeLinebreak, 'aa\naa', 'aa\raa');
        equal.call(this, unikong.normalizeLinebreak, 'aa\naa', 'aa\r\naa','\n');
        equal.call(this, unikong.normalizeLinebreak, 'aa\ra\r\ra', 'aa\na\r\n\r\na', '\r');
        equal.call(this, unikong.normalizeLinebreak, 'aa\r\na\r\n\r\na', 'aa\na\r\n\r\na', '\r\n');
    });

    describe('stripSurrogatePair', function() {
        equal.call(this, unikong.stripSurrogatePair, '123456', '123𡉴𡧃456');
        equal.call(this, unikong.stripSurrogatePair, '_ABC龠＠＊', '_ABC龠𡉴𡧃＠＊');
        equal.call(this, unikong.stripSurrogatePair, '□□□456□□□', '𡉴𡉴𡧃456𡉴𡉴𡉴', '□');
        equal.call(this, unikong.stripSurrogatePair, '123456', '123456');
        equal.call(this, unikong.stripSurrogatePair, 'あいう', 'あいう');
    });

    describe('stripUnicode6Emoji', function() {
        equal.call(this, unikong.stripUnicode6Emoji, '', '😀');
        equal.call(this, unikong.stripUnicode6Emoji, '', '\u2195\uFE0F\u0032\uFE0F\u20E3\u274C');
        equal.call(this, unikong.stripUnicode6Emoji, '', '\uD83D\uDC40\uD83D\uDC4D\uD83D\uDE8C\uD83D\uDCBF\u2195\uFE0F\u0032\uFE0F\u20E3\u274C');
        equal.call(this, unikong.stripUnicode6Emoji, '01', '0🌊1');
        equal.call(this, unikong.stripUnicode6Emoji, '𡉴𡉴', '𡉴🐰𡉴');
    });

    describe('isAlpha', function() {
        equal.call(this, unikong.isAlpha, true, 'abcZ');
        equal.call(this, unikong.isAlpha, false, 'abcZあ');
        equal.call(this, unikong.isAlpha, true, 'ＡＢＣＺ');
        equal.call(this, unikong.isAlpha, true, 'aaaaaa');
        equal.call(this, unikong.isAlpha, false, 'あいう');
        equal.call(this, unikong.isAlpha, false, '1A');
    });

    describe('isNumeric', function() {
        equal.call(this, unikong.isNumeric, true, '012345');
        equal.call(this, unikong.isNumeric, true, '01233333');
        equal.call(this, unikong.isNumeric, true, '０１２３４５');
        equal.call(this, unikong.isNumeric, false, '０あ');
        equal.call(this, unikong.isNumeric, false, '1A');
    });

    describe('isAlphaNumeric', function() {
        equal.call(this, unikong.isAlphaNumeric, true, '012ABZ');
        equal.call(this, unikong.isAlphaNumeric, true, '０１２a４５Ｚ');
        equal.call(this, unikong.isAlphaNumeric, false, '０あ');
        equal.call(this, unikong.isAlphaNumeric, false, '1A_');
    });

    describe('isAscii', function() {
        equal.call(this, unikong.isAscii, true, '012ABZ');
        equal.call(this, unikong.isAscii, true, '1A!?-)_');
        equal.call(this, unikong.isAscii, false, '０あ');
        equal.call(this, unikong.isAscii, false, '０１２a４５Ｚ');
    });

    describe('isHiragana', function() {
        equal.call(this, unikong.isHiragana, true, 'いろは');
        equal.call(this, unikong.isHiragana, true, 'あわをん');
        equal.call(this, unikong.isHiragana, false, '1A_-?!');
        equal.call(this, unikong.isHiragana, false, 'アヲ');
    });

    describe('isKatakana', function() {
        equal.call(this, unikong.isKatakana, true, 'アヲ');
        equal.call(this, unikong.isKatakana, true, 'ザガポド');
        equal.call(this, unikong.isKatakana, false, '09');
        equal.call(this, unikong.isKatakana, false, 'AZ');
        equal.call(this, unikong.isKatakana, false, 'あを');
    });

    describe('isHankana', function() {
        equal.call(this, unikong.isHankana, true, 'ｱ');
        equal.call(this, unikong.isHankana, true, 'ｲｦﾝ');
        equal.call(this, unikong.isHankana, true, 'ｻﾞｼﾞﾂﾞ');
        equal.call(this, unikong.isHankana, true, 'ｬｭｮ');
        equal.call(this, unikong.isHankana, false, '09');
        equal.call(this, unikong.isHankana, false, 'AZ');
        equal.call(this, unikong.isHankana, false, 'あを');
        equal.call(this, unikong.isHankana, false, 'アヲ');
        equal.call(this, unikong.isHankana, false, 'ザガポド');
    });

    describe('isHalfWidth', function() {
        equal.call(this, unikong.isHalfWidth, true, 'ｱ');
        equal.call(this, unikong.isHalfWidth, true, 'ｻﾞｼﾞﾂﾞ');
        equal.call(this, unikong.isHalfWidth, true, 'ｬｭｮ_-[');
        equal.call(this, unikong.isHalfWidth, true, 'A09Z@');
        equal.call(this, unikong.isHalfWidth, false, 'あを');
        equal.call(this, unikong.isHalfWidth, false, 'アヲ');
        equal.call(this, unikong.isHalfWidth, false, 'ー＠');
    });

    describe('isFullWidth', function() {
        equal.call(this, unikong.isFullWidth, true, 'あを');
        equal.call(this, unikong.isFullWidth, true, 'アヲ');
        equal.call(this, unikong.isFullWidth, true, 'ー＠');
        equal.call(this, unikong.isFullWidth, true, '南無阿弥陀仏');
        equal.call(this, unikong.isFullWidth, false, 'ｱ');
        equal.call(this, unikong.isFullWidth, false, 'ｻﾞｼﾞﾂﾞ');
        equal.call(this, unikong.isFullWidth, false, 'ｬｭｮ_-[');
        equal.call(this, unikong.isFullWidth, false, 'A09Z@');
    });

    describe('isLineBreak', function() {
        equal.call(this, unikong.isLineBreak, true, '\n');
        equal.call(this, unikong.isLineBreak, true, '\r\n');
        equal.call(this, unikong.isLineBreak, false, 'A\nB');
        equal.call(this, unikong.isLineBreak, false, '\t');
    });

    describe('isCyrillic', function() {
        equal.call(this, unikong.isCyrillic, true, 'БДБ');
        equal.call(this, unikong.isCyrillic, true, 'Урааааааа');
        equal.call(this, unikong.isCyrillic, false, 'あを');
        equal.call(this, unikong.isCyrillic, false, 'Ypa');
    });

    describe('isBlank', function() {
        equal.call(this, unikong.isBlank, true, '\t');
        equal.call(this, unikong.isBlank, true, '　');
        equal.call(this, unikong.isBlank, true, '\n');
        equal.call(this, unikong.isBlank, false, '_');
        equal.call(this, unikong.isBlank, false, '1 a');
    });

    describe('isContralCode', function() {
        equal.call(this, unikong.isContralCode, true, '\u0000\u007F');
        equal.call(this, unikong.isContralCode, true, '\u0005');
        equal.call(this, unikong.isContralCode, false, '_-');
        equal.call(this, unikong.isContralCode, false, ' ');
    });

    describe('isPageBreak', function() {
        equal.call(this, unikong.isPageBreak, true, '\f');
        equal.call(this, unikong.isPageBreak, false, '\r');
        equal.call(this, unikong.isPageBreak, false, '\t');
    });

    describe('isOpeningBracket', function() {
        equal.call(this, unikong.isOpeningBracket, true, '「');
        equal.call(this, unikong.isOpeningBracket, false, '」');
    });

    describe('isClosingBracket', function() {
        equal.call(this, unikong.isClosingBracket, true, ']');
        equal.call(this, unikong.isClosingBracket, false, '[');
    });

    describe('isHyphen', function() {
        equal.call(this, unikong.isHyphen, true, '-');
        equal.call(this, unikong.isHyphen, true, '〜');
        equal.call(this, unikong.isHyphen, false, '＝');
    });

    describe('isPunctuation', function() {
        equal.call(this, unikong.isPunctuation, true, '、');
        equal.call(this, unikong.isPunctuation, true, '。');
        equal.call(this, unikong.isHyphen, false, '＊');
    });

    describe('isEllipsis', function() {
        equal.call(this, unikong.isEllipsis, true, '…');
        equal.call(this, unikong.isEllipsis, false, '・・・');
    });

    describe('isNotPermittedStart', function() {
        equal.call(this, unikong.isNotPermittedStart, true, '？');
        equal.call(this, unikong.isNotPermittedStart, false, '（');
    });

    describe('isNotPermittedEnd', function() {
        equal.call(this, unikong.isNotPermittedEnd, true, '（');
        equal.call(this, unikong.isNotPermittedEnd, false, '！');
    });

    describe('isSurrogatePair', function() {
        equal.call(this, unikong.isSurrogatePair, true, '𡵅');
        equal.call(this, unikong.isSurrogatePair, true, '𡉴𡧃');
        equal.call(this, unikong.isSurrogatePair, false, '川');
        equal.call(this, unikong.isSurrogatePair, false, '龠𡼞');
    });


    describe('isUnicode6Emoji', function() {
        equal.call(this, unikong.isUnicode6Emoji, true, '\uD83D\uDE01');
        equal.call(this, unikong.isUnicode6Emoji, true, '\uD83D\uDEC0');
        equal.call(this, unikong.isUnicode6Emoji, true, '\uD83C\uDDEF');
        equal.call(this, unikong.isUnicode6Emoji, true, '\u2702');
        equal.call(this, unikong.isUnicode6Emoji, false, '＠');
        equal.call(this, unikong.isUnicode6Emoji, false, '☭');
    });

    describe('hasAlpha', function() {
        equal.call(this, unikong.hasAlpha, true, '1A');
        equal.call(this, unikong.hasAlpha, true, 'ＡＢＣＺ');
        equal.call(this, unikong.hasAlpha, true, '1A');
        equal.call(this, unikong.hasAlpha, false, 'あいう');
        equal.call(this, unikong.hasAlpha, false, 'ワヲン');
    });

    describe('hasNumeric', function() {
        equal.call(this, unikong.hasNumeric, true, '012345');
        equal.call(this, unikong.hasNumeric, true, '０１２３４５');
        equal.call(this, unikong.hasNumeric, true, '1A');
        equal.call(this, unikong.hasNumeric, false, 'あ');
        equal.call(this, unikong.hasNumeric, false, '-^_<>');
    });

    describe('hasAlphaNumeric', function() {
        equal.call(this, unikong.hasAlphaNumeric, true, '０あ');
        equal.call(this, unikong.hasAlphaNumeric, true, '1a\nA_');
        equal.call(this, unikong.hasAlphaNumeric, false, 'あ＿');
    });

    describe('hasAscii', function() {
        equal.call(this, unikong.hasAscii, true, 'あ01Aん');
        equal.call(this, unikong.hasAscii, true, '南無阿弥陀仏_');
        equal.call(this, unikong.hasAscii, true, '1A!?-)_');
        equal.call(this, unikong.hasAscii, true, '０１２_４５Ｚ');
        equal.call(this, unikong.hasAscii, false, '０あ');
        equal.call(this, unikong.hasAscii, false, '０１２＿４５Ｚ');
    });

    describe('hasHiragana', function() {
        equal.call(this, unikong.hasHiragana, true, 'いろはアウオ');
        equal.call(this, unikong.hasHiragana, true, 'あわをんカキワ');
        equal.call(this, unikong.hasHiragana, false, '1A_-?!');
        equal.call(this, unikong.hasHiragana, false, 'アヲ');
    });

    describe('hasKatakana', function() {
        equal.call(this, unikong.hasKatakana, true, 'アあヲを');
        equal.call(this, unikong.hasKatakana, true, 'かガｶﾞ');
        equal.call(this, unikong.hasKatakana, false, '0A');
        equal.call(this, unikong.hasKatakana, false, 'ﾜｦﾝ');
        equal.call(this, unikong.hasKatakana, false, 'あを');
    });

    describe('hasHankana', function() {
        equal.call(this, unikong.hasHankana, true, 'ｱあｦﾝ');
        equal.call(this, unikong.hasHankana, true, 'ｻﾞｼﾞﾂﾞ');
        equal.call(this, unikong.hasHankana, true, 'ｬｭｮabcdez');
        equal.call(this, unikong.hasHankana, false, '09');
        equal.call(this, unikong.hasHankana, false, 'AZ');
        equal.call(this, unikong.hasHankana, false, 'あを');
        equal.call(this, unikong.hasHankana, false, 'アヲ');
        equal.call(this, unikong.hasHankana, false, 'ザガポド');
    });

    describe('hasHalfWidth', function() {
        equal.call(this, unikong.hasHalfWidth, true, 'ｱあ');
        equal.call(this, unikong.hasHalfWidth, true, 'ｻﾞｼﾞﾂﾞゼゾ');
        equal.call(this, unikong.hasHalfWidth, true, '南無阿弥陀仏12345');
        equal.call(this, unikong.hasHalfWidth, false, 'あを');
        equal.call(this, unikong.hasHalfWidth, false, 'Ура');
        equal.call(this, unikong.hasHalfWidth, false, 'ー＠');
    });

    describe('hasFullWidth', function() {
        equal.call(this, unikong.hasFullWidth, true, 'Aあ');
        equal.call(this, unikong.hasFullWidth, true, 'Ａア');
        equal.call(this, unikong.hasFullWidth, true, '南無阿弥陀仏123');
        equal.call(this, unikong.hasFullWidth, false, 'ｱ');
        equal.call(this, unikong.hasFullWidth, false, 'ｻﾞｼﾞﾂﾞ');
        equal.call(this, unikong.hasFullWidth, false, 'ｬｭｮ_-[');
        equal.call(this, unikong.hasFullWidth, false, 'A09Z@');
    });

    describe('hasLineBreak', function() {
        equal.call(this, unikong.hasLineBreak, true, '\n');
        equal.call(this, unikong.hasLineBreak, true, '\r\n');
        equal.call(this, unikong.hasLineBreak, true, 'A\nB');
        equal.call(this, unikong.hasLineBreak, false, '\t');
    });

    describe('hasCyrillic', function() {
        equal.call(this, unikong.hasCyrillic, true, 'БДБ');
        equal.call(this, unikong.hasCyrillic, true, 'Урааааааа');
        equal.call(this, unikong.hasCyrillic, true, 'УY');
        equal.call(this, unikong.hasCyrillic, false, 'あを');
        equal.call(this, unikong.hasCyrillic, false, 'Ypa');
    });

    describe('hasBlank', function() {
        equal.call(this, unikong.hasBlank, true, '1\t0');
        equal.call(this, unikong.hasBlank, true, '1　9');
        equal.call(this, unikong.hasBlank, true, '2\n5');
        equal.call(this, unikong.hasBlank, true, '1 a');
        equal.call(this, unikong.hasBlank, false, '4_');
        equal.call(this, unikong.hasBlank, false, '1020304050');
    });

    describe('hasContralCode', function() {
        equal.call(this, unikong.hasContralCode, true, '\u0000〜\u007F');
        equal.call(this, unikong.hasContralCode, true, '\u0005〜');
        equal.call(this, unikong.hasContralCode, false, '_-〜');
        equal.call(this, unikong.hasContralCode, false, ' 〜');
    });

    describe('hasPageBreak', function() {
        equal.call(this, unikong.hasPageBreak, true, 'あ\fう');
        equal.call(this, unikong.hasPageBreak, false, 'あ\rう');
        equal.call(this, unikong.hasPageBreak, false, 'あ\tう');
    });

    describe('hasOpeningBracket', function() {
        equal.call(this, unikong.hasOpeningBracket, true, '「は');
        equal.call(this, unikong.hasOpeningBracket, false, 'は」');
    });

    describe('hasClosingBracket', function() {
        equal.call(this, unikong.hasClosingBracket, true, 'ん]');
        equal.call(this, unikong.hasClosingBracket, false, '[ん');
    });

    describe('hasHyphen', function() {
        equal.call(this, unikong.hasHyphen, true, '-＝');
        equal.call(this, unikong.hasHyphen, true, '〜＝');
        equal.call(this, unikong.hasHyphen, false, '＝＝');
    });

    describe('hasPunctuation', function() {
        equal.call(this, unikong.hasPunctuation, true, '＋、');
        equal.call(this, unikong.hasPunctuation, true, '＋。');
        equal.call(this, unikong.hasPunctuation, false, '＋＊');
    });

    describe('hasEllipsis', function() {
        equal.call(this, unikong.hasEllipsis, true, 'お…');
        equal.call(this, unikong.hasEllipsis, false, 'お・・・');
    });

    describe('hasNotPermittedStart', function() {
        equal.call(this, unikong.hasNotPermittedStart, true, 'あ！');
        equal.call(this, unikong.hasNotPermittedStart, false, 'あ（');
    });

    describe('hasNotPermittedEnd', function() {
        equal.call(this, unikong.hasNotPermittedEnd, true, '＠（');
        equal.call(this, unikong.hasNotPermittedEnd, false, '＠？');
    });

    describe('hasSurrogatePair', function() {
        equal.call(this, unikong.hasSurrogatePair, true, '𡵅');
        equal.call(this, unikong.hasSurrogatePair, true, '𡉴𡧃');
        equal.call(this, unikong.hasSurrogatePair, true, '龠𡼞');
        equal.call(this, unikong.hasSurrogatePair, false, '龠');
        equal.call(this, unikong.hasSurrogatePair, false, '南無阿弥陀仏');
    });

    describe('hasUnicode6Emoji', function() {
        equal.call(this, unikong.hasUnicode6Emoji, true, '\uD83D\uDE01');
        equal.call(this, unikong.hasUnicode6Emoji, true, '＊\uD83D\uDEC0＊');
        equal.call(this, unikong.hasUnicode6Emoji, true, '\uD83C\uDDEF__\uD83D\uDEC0');
        equal.call(this, unikong.hasUnicode6Emoji, true, '\u2702');
        equal.call(this, unikong.hasUnicode6Emoji, false, '＠');
        equal.call(this, unikong.hasUnicode6Emoji, false, '☭');
    });

    describe('charArray', function() {
        equal.call(this, unikong.charArray, ['1','a','@'], '1a@');
        equal.call(this, unikong.charArray, ['1', '2', 'A', 'あ', '𡉴', '𡧃', '龠', '𡼞'], '12Aあ𡉴𡧃龠𡼞');
        not.call(this, unikong.charArray, [1,2,3,4,5], '012345');
    });

    describe('charCodeArray', function() {
        equal.call(this, unikong.charCodeArray, [ 49, 97, 64 ], '1a@');
        equal.call(this, unikong.charCodeArray, [ 49, 50, 65, 12354, 55364, 56948, 55366, 56771, 40864, 55367, 57118 ], '12Aあ𡉴𡧃龠𡼞');
    });

    describe('toDakuon', function() {
        equal.call(this, unikong.toDakuon, 'アイウエオガギグゲゴザジズゼゾダヂヅデドバビブベボ', 'アイウエオカキクケコサシスセソタチツテトハヒフヘホ');
        equal.call(this, unikong.toDakuon, 'あいうえおがぎぐげござじずぜぞだぢづでどばびぶべぼ', 'あいうえおかきくけこさしすせそたちつてとはひふへほ');
    });

    describe('toHanDakuon', function() {
        equal.call(this, unikong.toHanDakuon, 'かきくけこぱぴぷぺぽ', 'かきくけこはひふへほ');
        equal.call(this, unikong.toHanDakuon, 'ぱぴぷぺぽパピプペポ', 'ぱぴぷぺぽハヒフヘホ');
    });

    describe('toHiragana', function() {
        equal.call(this, unikong.toHiragana, 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをん', 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン');
        equal.call(this, unikong.toHiragana, 'ぁぃぅぇぉゕゖっゃゅょゎゔ', 'ァィゥェォヵヶッャュョヮヴ');
        equal.call(this, unikong.toHiragana, 'がざだばぱゔ', 'ガザダバパヴ');
        // equal.call(this, unikong.toHiragana, 'かきくけこ', 'ｶｷｸｹｺ');
    });

    describe('toKatakana', function() {
        equal.call(this, unikong.toKatakana, 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン', 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをん');
        equal.call(this, unikong.toKatakana, 'ァィゥェォヵヶッャュョヮヴ', 'ぁぃぅぇぉゕゖっゃゅょゎゔ');
        equal.call(this, unikong.toKatakana, 'ガザダバパヴ', 'がざだばぱゔ');
    });

    console.log(unikong.charCodeArray('ぁぃぅぇぉゕ'));

})();
