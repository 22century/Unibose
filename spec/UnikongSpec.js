(function(){

    var unikong = new Unikong();

    describe('count', function () {

        it('surrogatepair', function () {
            expect(unikong.count('𡉴𡉴𡉴\nあ𡉴')).toBe(6);
        });

        it('number + hiragana', function () {
            expect(unikong.count('123456789あ')).toBe(10);
        });

    });

    describe('toUnicodeLiteral', function() {

        it('alpha', function() {
            expect(unikong.toUnicodeLiteral('abc')).toBe('\\u0061\\u0062\\u0063');
        });

    });

    describe('normalizeLinebreak', function() {

        it('to \\n', function() {
            expect(unikong.normalizeLinebreak('aa\raa')).toBe('aa\naa');
            expect(unikong.normalizeLinebreak('aa\r\naa','\n')).toBe('aa\naa');
        });

        it('to \\r', function() {
            expect(unikong.normalizeLinebreak('aa\r\na\na', '\r')).toBe('aa\ra\ra');
            expect(unikong.normalizeLinebreak('aa\na\r\n\r\na', '\r')).toBe('aa\ra\r\ra');
        });

        it('to \\r\\n', function() {
            expect(unikong.normalizeLinebreak('aa\r\naa', '\r\n')).toBe('aa\r\naa');
            expect(unikong.normalizeLinebreak('aa\na\r\n\r\na', '\r\n')).toBe('aa\r\na\r\n\r\na');
        });

    });

    describe('stripSurrogatePair', function() {

        it('surrogatepair', function() {
            expect(unikong.stripSurrogatePair('123𡉴𡧃456')).toBe('123456');
            expect(unikong.stripSurrogatePair('_ABC龠𡉴𡧃＠＊')).toBe('_ABC龠＠＊');
            expect(unikong.stripSurrogatePair('𡉴𡉴𡧃456𡉴𡉴𡉴', '□')).toBe('□□□456□□□');
        });

        it('number', function() {
            expect(unikong.stripSurrogatePair('123456')).toBe('123456');
        });

        it('hiragana', function() {
            expect(unikong.stripSurrogatePair('あいう')).toBe('あいう');
        });

    });

    describe('stripUnicode6Emoji', function() {

        it('empty', function() {
            expect(unikong.stripUnicode6Emoji('😀')).toBe('');
            expect(unikong.stripUnicode6Emoji('\u2195\uFE0F\u0032\uFE0F\u20E3\u274C')).toBe('');
            expect(unikong.stripUnicode6Emoji('\uD83D\uDC40\uD83D\uDC4D\uD83D\uDE8C\uD83D\uDCBF\u2195\uFE0F\u0032\uFE0F\u20E3\u274C')).toBe('');
        });

        it('number', function() {
            expect(unikong.stripUnicode6Emoji('0🌊1')).toBe('01');
        });

        it('surrogatepair', function() {
            expect(unikong.stripUnicode6Emoji('𡉴🐰𡉴')).toBe('𡉴𡉴');
        });

    });

    describe('isAlpha', function() {

        it('to be truthy.', function() {
            expect(unikong.isAlpha('abcZ')).toBe(true);
            expect(unikong.isAlpha('abcZあ')).toBe(false);
            expect(unikong.isAlpha('ＡＢＣＺ')).toBe(true);
            expect(unikong.isAlpha('aaaaaa')).toBe(true);
        });

        it('to be falsy.', function() {
            expect(unikong.isAlpha('あいう')).toBe(false);
            expect(unikong.isAlpha('1A')).toBe(false);
        });

    });

    describe('isNumeric', function() {

        it('to be truthy.', function() {
            expect(unikong.isNumeric('012345')).toBe(true);
            expect(unikong.isNumeric('01233333')).toBe(true);
            expect(unikong.isNumeric('０１２３４５')).toBe(true);
        });

        it('to be falsy.', function() {
            expect(unikong.isNumeric('０あ')).toBe(false);
            expect(unikong.isNumeric('1A')).toBe(false);
        });

    });

    describe('isAlphaNumeric', function() {

        it('to be truthy.', function() {
            expect(unikong.isAlphaNumeric('012ABZ')).toBe(true);
            expect(unikong.isAlphaNumeric('０１２a４５Ｚ')).toBe(true);
        });

        it('to be falsy.', function() {
            expect(unikong.isAlphaNumeric('０あ')).toBe(false);
            expect(unikong.isAlphaNumeric('1A_')).toBe(false);
        });

    });

    describe('isAscii', function() {

        it('to be truthy.', function() {
            expect(unikong.isAscii('012ABZ')).toBe(true);
            expect(unikong.isAscii('1A!?-)_')).toBe(true);

        });

        it('to be falsy.', function() {
            expect(unikong.isAscii('０あ')).toBe(false);
            expect(unikong.isAscii('０１２a４５Ｚ')).toBe(false);
        });

    });

    describe('isHiragana', function() {

        it('to be truthy.', function() {
            expect(unikong.isHiragana('いろは')).toBe(true);
            expect(unikong.isHiragana('あわをん')).toBe(true);
        });

        it('to be falsy.', function() {
            expect(unikong.isHiragana('1A_-?!')).toBe(false);
            expect(unikong.isHiragana('アヲ')).toBe(false);
        });

    });

    describe('isKatakana', function() {

        it('to be truthy.', function() {
            expect(unikong.isKatakana('アヲ')).toBe(true);
            expect(unikong.isKatakana('ザガポド')).toBe(true);
        });

        it('to be falsy.', function() {
            expect(unikong.isKatakana('09')).toBe(false);
            expect(unikong.isKatakana('AZ')).toBe(false);
            expect(unikong.isKatakana('あを')).toBe(false);
        });

    });

    describe('isHankana', function() {

        it('to be truthy.', function() {
            expect(unikong.isHankana('ｱ')).toBe(true);
            expect(unikong.isHankana('ｲｦﾝ')).toBe(true);
            expect(unikong.isHankana('ｻﾞｼﾞﾂﾞ')).toBe(true);
            expect(unikong.isHankana('ｬｭｮ')).toBe(true);
        });

        it('to be falsy.', function() {
            expect(unikong.isHankana('09')).toBe(false);
            expect(unikong.isHankana('AZ')).toBe(false);
            expect(unikong.isHankana('あを')).toBe(false);
            expect(unikong.isHankana('アヲ')).toBe(false);
            expect(unikong.isHankana('ザガポド')).toBe(false);
        });

    });

    describe('isHalfWidth', function() {

        it('to be truthy.', function() {
            expect(unikong.isHalfWidth('ｱ')).toBe(true);
            expect(unikong.isHalfWidth('ｻﾞｼﾞﾂﾞ')).toBe(true);
            expect(unikong.isHalfWidth('ｬｭｮ_-[')).toBe(true);
            expect(unikong.isHalfWidth('A09Z@')).toBe(true);
        });

        it('to be falsy.', function() {
            expect(unikong.isHalfWidth('あを')).toBe(false);
            expect(unikong.isHalfWidth('アヲ')).toBe(false);
            expect(unikong.isHalfWidth('ー＠')).toBe(false);
        });

    });

    describe('isFullWidth', function() {

        it('to be truthy.', function() {
            expect(unikong.isFullWidth('あを')).toBe(true);
            expect(unikong.isFullWidth('アヲ')).toBe(true);
            expect(unikong.isFullWidth('ー＠')).toBe(true);
            expect(unikong.isFullWidth('南無阿弥陀仏')).toBe(true);
        });

        it('to be falsy.', function() {
            expect(unikong.isFullWidth('ｱ')).toBe(false);
            expect(unikong.isFullWidth('ｻﾞｼﾞﾂﾞ')).toBe(false);
            expect(unikong.isFullWidth('ｬｭｮ_-[')).toBe(false);
            expect(unikong.isFullWidth('A09Z@')).toBe(false);
        });

    });

    describe('isLineBreak', function() {

        it('to be truthy.', function() {
//            expect(unikong.isLineBreak('\n')).toBe(true);
            expect(unikong.isLineBreak('\r\n')).toBe(true);
        });

//        it('to be falsy.', function() {
//            expect(unikong.isLineBreak('A\nB')).toBe(false);
//            expect(unikong.isLineBreak('\t')).toBe(false);
//        });

    });

    describe('isCyrillic', function() {

        it('to be truthy.', function() {
            expect(unikong.isCyrillic('БДБ')).toBe(true);
            expect(unikong.isCyrillic('Урааааааа')).toBe(true);
        });

        it('to be falsy.', function() {
            expect(unikong.isCyrillic('あを')).toBe(false);
            expect(unikong.isCyrillic('Ypa')).toBe(false);
        });

    });

    describe('isBlank', function() {

        it('to be truthy.', function() {
            expect(unikong.isBlank('\t')).toBe(true);
            expect(unikong.isBlank('　')).toBe(true);
            expect(unikong.isBlank('\n')).toBe(true);
        });

        it('to be falsy.', function() {
            expect(unikong.isBlank('_')).toBe(false);
            expect(unikong.isBlank('1 a')).toBe(false);
        });

    });

    describe('isContralCode', function() {

        it('to be truthy.', function() {
            expect(unikong.isContralCode('\u0000\u007F')).toBe(true);
            expect(unikong.isContralCode('\u0005')).toBe(true);
        });

        it('to be falsy.', function() {
            expect(unikong.isContralCode('_-')).toBe(false);
            expect(unikong.isContralCode(' ')).toBe(false);
        });

    });

    describe('isPageBreak', function() {

        it('to be truthy.', function() {
            expect(unikong.isPageBreak('\f')).toBe(true);
        });

        it('to be falsy.', function() {
            expect(unikong.isPageBreak('\r')).toBe(false);
            expect(unikong.isPageBreak('\t')).toBe(false);
        });

    });

    describe('isOpeningBracket', function() {

        it('to be truthy.', function() {
            expect(unikong.isOpeningBracket('「')).toBe(true);
        });

        it('to be falsy.', function() {
            expect(unikong.isOpeningBracket('」')).toBe(false);
        });

    });

    describe('isClosingBracket', function() {

        it('to be truthy.', function() {
            expect(unikong.isClosingBracket(']')).toBe(true);
        });

        it('to be falsy.', function() {
            expect(unikong.isClosingBracket('[')).toBe(false);
        });

    });

    describe('isHyphen', function() {

        it('to be truthy.', function() {
            expect(unikong.isHyphen('-')).toBe(true);
            expect(unikong.isHyphen('〜')).toBe(true);
        });

        it('to be falsy.', function() {
            expect(unikong.isHyphen('＝')).toBe(false);
        });

    });

    describe('isPunctuation', function() {

        it('to be truthy.', function() {
            expect(unikong.isPunctuation('、')).toBe(true);
            expect(unikong.isPunctuation('。')).toBe(true);
        });

        it('to be falsy.', function() {
            expect(unikong.isHyphen('＊')).toBe(false);
        });

    });

    describe('isEllipsis', function() {

        it('to be truthy.', function() {
            expect(unikong.isEllipsis('…')).toBe(true);
        });

        it('to be falsy.', function() {
            expect(unikong.isEllipsis('・・・')).toBe(false);
        });

    });

    describe('isNotPermittedStart', function() {

        it('to be truthy.', function() {
            expect(unikong.isNotPermittedStart('？')).toBe(true);
        });

        it('to be falsy.', function() {
            expect(unikong.isNotPermittedStart('（')).toBe(false);
        });

    });

    describe('isNotPermittedEnd', function() {

        it('to be truthy.', function() {
            expect(unikong.isNotPermittedEnd('（')).toBe(true);
        });

        it('to be falsy.', function() {
            expect(unikong.isNotPermittedEnd('！')).toBe(false);
        });

    });

    describe('isSurrogatePair', function() {

        it('to be truthy.', function() {
            expect(unikong.isSurrogatePair('𡵅')).toBe(true);
            expect(unikong.isSurrogatePair('𡉴𡧃')).toBe(true);
        });

        it('to be falsy.', function() {
            expect(unikong.isSurrogatePair('川')).toBe(false);
            expect(unikong.isSurrogatePair('龠𡼞')).toBe(false);
        });

    });


    describe('isUnicode6Emoji', function() {

        it('to be truthy.', function() {
            expect(unikong.isUnicode6Emoji('\uD83D\uDE01')).toBe(true);
            expect(unikong.isUnicode6Emoji('\uD83D\uDEC0')).toBe(true);
            expect(unikong.isUnicode6Emoji('\uD83C\uDDEF')).toBe(true);
            expect(unikong.isUnicode6Emoji('\u2702')).toBe(true);
        });

        it('to be falsy.', function() {
            expect(unikong.isUnicode6Emoji('＠')).toBe(false);
            expect(unikong.isUnicode6Emoji('☭')).toBe(false);
        });
    });

    describe('hasAlpha', function() {

        it('to be truthy.', function() {
            expect(unikong.hasAlpha('1A')).toBe(true);
            expect(unikong.hasAlpha('ＡＢＣＺ')).toBe(true);
            expect(unikong.hasAlpha('1A')).toBe(true);
        });

        it('to be falsy.', function() {
            expect(unikong.hasAlpha('あいう')).toBe(false);
            expect(unikong.hasAlpha('ワヲン')).toBe(false);
        });

    });

    describe('hasNumeric', function() {

        it('to be truthy.', function() {
            expect(unikong.hasNumeric('012345')).toBe(true);
            expect(unikong.hasNumeric('０１２３４５')).toBe(true);
            expect(unikong.hasNumeric('1A')).toBe(true);
        });

        it('to be falsy.', function() {
            expect(unikong.hasNumeric('あ')).toBe(false);
            expect(unikong.hasNumeric('-^_<>')).toBe(false);    });

    });

    describe('hasAlphaNumeric', function() {

        it('to be truthy.', function() {
            expect(unikong.hasAlphaNumeric('０あ')).toBe(true);
            expect(unikong.hasAlphaNumeric('1a\nA_')).toBe(true);
        });

        it('to be falsy.', function() {
            expect(unikong.hasAlphaNumeric('あ＿')).toBe(false);
        });

    });

    describe('hasAscii', function() {

        it('to be truthy.', function() {
            expect(unikong.hasAscii('あ01Aん')).toBe(true);
            expect(unikong.hasAscii('南無阿弥陀仏_')).toBe(true);
            expect(unikong.hasAscii('1A!?-)_')).toBe(true);
            expect(unikong.hasAscii('０１２_４５Ｚ')).toBe(true);
        });

        it('to be falsy.', function() {
            expect(unikong.hasAscii('０あ')).toBe(false);
            expect(unikong.hasAscii('０１２＿４５Ｚ')).toBe(false);
        });

    });

    describe('hasHiragana', function() {

        it('to be truthy.', function() {
            expect(unikong.hasHiragana('いろはアウオ')).toBe(true);
            expect(unikong.hasHiragana('あわをんカキワ')).toBe(true);
        });

        it('to be falsy.', function() {
            expect(unikong.hasHiragana('1A_-?!')).toBe(false);
            expect(unikong.hasHiragana('アヲ')).toBe(false);
        });

    });

    describe('hasKatakana', function() {

        it('to be truthy.', function() {
            expect(unikong.hasKatakana('アあヲを')).toBe(true);
            expect(unikong.hasKatakana('かガｶﾞ')).toBe(true);
        });

        it('to be falsy.', function() {
            expect(unikong.hasKatakana('0A')).toBe(false);
            expect(unikong.hasKatakana('ﾜｦﾝ')).toBe(false);
            expect(unikong.hasKatakana('あを')).toBe(false);
        });

    });

    describe('hasHankana', function() {

        it('to be truthy.', function() {
            expect(unikong.hasHankana('ｱあｦﾝ')).toBe(true);
            expect(unikong.hasHankana('ｻﾞｼﾞﾂﾞ')).toBe(true);
            expect(unikong.hasHankana('ｬｭｮabcdez')).toBe(true);
        });

        it('to be falsy.', function() {
            expect(unikong.hasHankana('09')).toBe(false);
            expect(unikong.hasHankana('AZ')).toBe(false);
            expect(unikong.hasHankana('あを')).toBe(false);
            expect(unikong.hasHankana('アヲ')).toBe(false);
            expect(unikong.hasHankana('ザガポド')).toBe(false);
        });

    });

    describe('hasHalfWidth', function() {

        it('to be truthy.', function() {
            expect(unikong.hasHalfWidth('ｱあ')).toBe(true);
            expect(unikong.hasHalfWidth('ｻﾞｼﾞﾂﾞゼゾ')).toBe(true);
            expect(unikong.hasHalfWidth('南無阿弥陀仏12345')).toBe(true);
        });

        it('to be falsy.', function() {
            expect(unikong.hasHalfWidth('あを')).toBe(false);
            expect(unikong.hasHalfWidth('Ура')).toBe(false);
            expect(unikong.hasHalfWidth('ー＠')).toBe(false);
        });

    });

    describe('hasFullWidth', function() {

        it('to be truthy.', function() {
            expect(unikong.hasFullWidth('Aあ')).toBe(true);
            expect(unikong.hasFullWidth('Ａア')).toBe(true);
            expect(unikong.hasFullWidth('南無阿弥陀仏123')).toBe(true);
        });

        it('to be falsy.', function() {
            expect(unikong.hasFullWidth('ｱ')).toBe(false);
            expect(unikong.hasFullWidth('ｻﾞｼﾞﾂﾞ')).toBe(false);
            expect(unikong.hasFullWidth('ｬｭｮ_-[')).toBe(false);
            expect(unikong.hasFullWidth('A09Z@')).toBe(false);
        });

    });

//    describe('hasLineBreak', function() {
//
//        it('to be truthy.', function() {
//            expect(unikong.hasLineBreak('\n')).toBe(true);
//            expect(unikong.hasLineBreak('\r\n')).toBe(true);
//            expect(unikong.hasLineBreak('A\nB')).toBe(true);
//        });
//
//        it('to be falsy.', function() {
//            expect(unikong.hasLineBreak('\t')).toBe(false);
//        });
//
//    });

    describe('hasCyrillic', function() {

        it('to be truthy.', function() {
            expect(unikong.hasCyrillic('БДБ')).toBe(true);
            expect(unikong.hasCyrillic('Урааааааа')).toBe(true);
            expect(unikong.hasCyrillic('УY')).toBe(true);
        });

        it('to be falsy.', function() {
            expect(unikong.hasCyrillic('あを')).toBe(false);
            expect(unikong.hasCyrillic('Ypa')).toBe(false);
        });

    });

    describe('hasBlank', function() {

        it('to be truthy.', function() {
            expect(unikong.hasBlank('1\t0')).toBe(true);
            expect(unikong.hasBlank('1　9')).toBe(true);
            expect(unikong.hasBlank('2\n5')).toBe(true);
            expect(unikong.hasBlank('1 a')).toBe(true);
        });

        it('to be falsy.', function() {
            expect(unikong.hasBlank('4_')).toBe(false);
            expect(unikong.hasBlank('1020304050')).toBe(false);
        });

    });

    describe('hasContralCode', function() {

        it('to be truthy.', function() {
            expect(unikong.hasContralCode('\u0000〜\u007F')).toBe(true);
            expect(unikong.hasContralCode('\u0005〜')).toBe(true);
        });

        it('to be falsy.', function() {
            expect(unikong.hasContralCode('_-〜')).toBe(false);
            expect(unikong.hasContralCode(' 〜')).toBe(false);
        });

    });

    describe('hasPageBreak', function() {

        it('to be truthy.', function() {
            expect(unikong.hasPageBreak('あ\fう')).toBe(true);
        });

        it('to be falsy.', function() {
            expect(unikong.hasPageBreak('あ\rう')).toBe(false);
            expect(unikong.hasPageBreak('あ\tう')).toBe(false);
        });

    });

    describe('hasOpeningBracket', function() {

        it('to be truthy.', function() {
            expect(unikong.hasOpeningBracket('「は')).toBe(true);
        });

        it('to be falsy.', function() {
            expect(unikong.hasOpeningBracket('は」')).toBe(false);
        });

    });

    describe('hasClosingBracket', function() {

        it('to be truthy.', function() {
            expect(unikong.hasClosingBracket('ん]')).toBe(true);
        });

        it('to be falsy.', function() {
            expect(unikong.hasClosingBracket('[ん')).toBe(false);
        });

    });

    describe('hasHyphen', function() {

        it('to be truthy.', function() {
            expect(unikong.hasHyphen('-＝')).toBe(true);
            expect(unikong.hasHyphen('〜＝')).toBe(true);
        });

        it('to be falsy.', function() {
            expect(unikong.hasHyphen('＝＝')).toBe(false);
        });

    });

    describe('hasPunctuation', function() {

        it('to be truthy.', function() {
            expect(unikong.hasPunctuation('＋、')).toBe(true);
            expect(unikong.hasPunctuation('＋。')).toBe(true);
        });

        it('to be falsy.', function() {
            expect(unikong.hasPunctuation('＋＊')).toBe(false);
        });

    });

    describe('hasEllipsis', function() {

        it('to be truthy.', function() {
            expect(unikong.hasEllipsis('お…')).toBe(true);
        });

        it('to be falsy.', function() {
            expect(unikong.hasEllipsis('お・・・')).toBe(false);
        });

    });

    describe('hasNotPermittedStart', function() {

        it('to be truthy.', function() {
            expect(unikong.hasNotPermittedStart('あ！')).toBe(true);
        });

        it('to be falsy.', function() {
            expect(unikong.hasNotPermittedStart('あ（')).toBe(false);
        });

    });

    describe('hasNotPermittedEnd', function() {

        it('to be truthy.', function() {
            expect(unikong.hasNotPermittedEnd('＠（')).toBe(true);
        });

        it('to be falsy.', function() {
            expect(unikong.hasNotPermittedEnd('＠？')).toBe(false);
        });

    });

    describe('hasSurrogatePair', function() {

        it('to be truthy.', function() {
            expect(unikong.hasSurrogatePair('𡵅')).toBe(true);
            expect(unikong.hasSurrogatePair('𡉴𡧃')).toBe(true);
            expect(unikong.hasSurrogatePair('龠𡼞')).toBe(true);
        });

        it('to be falsy.', function() {
            expect(unikong.hasSurrogatePair('龠')).toBe(false);
            expect(unikong.hasSurrogatePair('南無阿弥陀仏')).toBe(false);
        });

    });

    describe('hasUnicode6Emoji', function() {

        it('to be truthy.', function() {
            expect(unikong.hasUnicode6Emoji('\uD83D\uDE01')).toBe(true);
            expect(unikong.hasUnicode6Emoji('\uD83D\uDEC0')).toBe(true);
            expect(unikong.hasUnicode6Emoji('\uD83C\uDDEF')).toBe(true);
            expect(unikong.hasUnicode6Emoji('\u2702')).toBe(true);
        });

        it('to be falsy.', function() {
            expect(unikong.hasUnicode6Emoji('＠')).toBe(false);
            expect(unikong.hasUnicode6Emoji('☭')).toBe(false);
        });
    });

})();