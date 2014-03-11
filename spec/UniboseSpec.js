var unibose = new Unibose();

describe('toUnicodeLiteral', function() {

    it('to be equal.', function() {
        expect(unibose.toUnicodeLiteral('abc')).toBe('\\u0061\\u0062\\u0063');
    });

});

describe('normalizeLinebreak', function() {

    it('to be equal.', function() {
        expect(unibose.normalizeLinebreak('aa\raa')).toBe('aa\naa');
        expect(unibose.normalizeLinebreak('aa\r\naa','\n')).toBe('aa\naa');
        expect(unibose.normalizeLinebreak('aa\r\naa')).toBe('aa\naa');
        expect(unibose.normalizeLinebreak('aa\na\r\na', '\r\n')).toBe('aa\r\na\r\na');
    });

});

describe('isAlpha', function() {

    it('to be truthy.', function() {
        expect(unibose.isAlpha('abcZ')).toBe(true);
        expect(unibose.isAlpha('ＡＢＣＺ')).toBe(true);
    });

    it('to be falsy.', function() {
        expect(unibose.isAlpha('あいう')).toBe(false);
        expect(unibose.isAlpha('1A')).toBe(false);
    });

});

describe('isNumeric', function() {

    it('to be truthy.', function() {
        expect(unibose.isNumeric('012345')).toBe(true);
        expect(unibose.isNumeric('０１２３４５')).toBe(true);
    });

    it('to be falsy.', function() {
        expect(unibose.isNumeric('０あ')).toBe(false);
        expect(unibose.isNumeric('1A')).toBe(false);
    });

});

describe('isAlphaNumeric', function() {

    it('to be truthy.', function() {
        expect(unibose.isAlphaNumeric('012ABZ')).toBe(true);
        expect(unibose.isAlphaNumeric('０１２a４５Ｚ')).toBe(true);
    });

    it('to be falsy.', function() {
        expect(unibose.isAlphaNumeric('０あ')).toBe(false);
        expect(unibose.isAlphaNumeric('1A_')).toBe(false);
    });

});

describe('isAscii', function() {

    it('to be truthy.', function() {
        expect(unibose.isAscii('012ABZ')).toBe(true);
        expect(unibose.isAscii('1A!?-)_')).toBe(true);

    });

    it('to be falsy.', function() {
        expect(unibose.isAscii('０あ')).toBe(false);
        expect(unibose.isAscii('０１２a４５Ｚ')).toBe(false);
    });

});

describe('isHiragana', function() {

    it('to be truthy.', function() {
        expect(unibose.isHiragana('いろは')).toBe(true);
        expect(unibose.isHiragana('あわをん')).toBe(true);
    });

    it('to be falsy.', function() {
        expect(unibose.isHiragana('1A_-?!')).toBe(false);
        expect(unibose.isHiragana('アヲ')).toBe(false);
    });

});

describe('isKatakana', function() {

    it('to be truthy.', function() {
        expect(unibose.isKatakana('アヲ')).toBe(true);
        expect(unibose.isKatakana('ザガポド')).toBe(true);
    });

    it('to be falsy.', function() {
        expect(unibose.isKatakana('09')).toBe(false);
        expect(unibose.isKatakana('AZ')).toBe(false);
        expect(unibose.isKatakana('あを')).toBe(false);
    });

});

describe('isHankana', function() {

    it('to be truthy.', function() {
        expect(unibose.isHankana('ｱ')).toBe(true);
        expect(unibose.isHankana('ｲｦﾝ')).toBe(true);
        expect(unibose.isHankana('ｻﾞｼﾞﾂﾞ')).toBe(true);
        expect(unibose.isHankana('ｬｭｮ')).toBe(true);
    });

    it('to be falsy.', function() {
        expect(unibose.isHankana('09')).toBe(false);
        expect(unibose.isHankana('AZ')).toBe(false);
        expect(unibose.isHankana('あを')).toBe(false);
        expect(unibose.isHankana('アヲ')).toBe(false);
        expect(unibose.isHankana('ザガポド')).toBe(false);
    });

});

describe('isHalfWidth', function() {

    it('to be truthy.', function() {
        expect(unibose.isHalfWidth('ｱ')).toBe(true);
        expect(unibose.isHalfWidth('ｻﾞｼﾞﾂﾞ')).toBe(true);
        expect(unibose.isHalfWidth('ｬｭｮ_-[')).toBe(true);
        expect(unibose.isHalfWidth('A09Z@')).toBe(true);
    });

    it('to be falsy.', function() {
        expect(unibose.isHalfWidth('あを')).toBe(false);
        expect(unibose.isHalfWidth('アヲ')).toBe(false);
        expect(unibose.isHalfWidth('ー＠')).toBe(false);
    });

});

describe('isFullWidth', function() {

    it('to be truthy.', function() {
        expect(unibose.isFullWidth('あを')).toBe(true);
        expect(unibose.isFullWidth('アヲ')).toBe(true);
        expect(unibose.isFullWidth('ー＠')).toBe(true);
        expect(unibose.isFullWidth('南無阿弥陀仏')).toBe(true);
    });

    it('to be falsy.', function() {
        expect(unibose.isFullWidth('ｱ')).toBe(false);
        expect(unibose.isFullWidth('ｻﾞｼﾞﾂﾞ')).toBe(false);
        expect(unibose.isFullWidth('ｬｭｮ_-[')).toBe(false);
        expect(unibose.isFullWidth('A09Z@')).toBe(false);
    });

});

describe('isLineBreak', function() {

    it('to be truthy.', function() {
        expect(unibose.isLineBreak('\n')).toBe(true);
        expect(unibose.isLineBreak('\r\n')).toBe(true);
    });

    it('to be falsy.', function() {
        expect(unibose.isLineBreak('A\nB')).toBe(false);
        expect(unibose.isLineBreak('\t')).toBe(false);
    });

});

describe('isCyrillic', function() {

    it('to be truthy.', function() {
        expect(unibose.isCyrillic('БДБ')).toBe(true);
        expect(unibose.isCyrillic('Урааааааа')).toBe(true);
    });

    it('to be falsy.', function() {
        expect(unibose.isCyrillic('あを')).toBe(false);
        expect(unibose.isCyrillic('Ypa')).toBe(false);
    });

});

describe('isBlank', function() {

    it('to be truthy.', function() {
        expect(unibose.isBlank('\t')).toBe(true);
        expect(unibose.isBlank('　')).toBe(true);
        expect(unibose.isBlank('\n')).toBe(true);
    });

    it('to be falsy.', function() {
        expect(unibose.isBlank('_')).toBe(false);
        expect(unibose.isBlank('1 a')).toBe(false);
    });

});

describe('isContralCode', function() {

    it('to be truthy.', function() {
        expect(unibose.isContralCode('\u0000\u007F')).toBe(true);
        expect(unibose.isContralCode('\u0005')).toBe(true);
    });

    it('to be falsy.', function() {
        expect(unibose.isContralCode('_-')).toBe(false);
        expect(unibose.isContralCode(' ')).toBe(false);
    });

});

describe('isPageBreak', function() {

    it('to be truthy.', function() {
        expect(unibose.isPageBreak('\f')).toBe(true);
    });

    it('to be falsy.', function() {
        expect(unibose.isPageBreak('\r')).toBe(false);
        expect(unibose.isPageBreak('\t')).toBe(false);
    });

});

describe('isOpeningBracket', function() {

    it('to be truthy.', function() {
        expect(unibose.isOpeningBracket('「')).toBe(true);
    });

    it('to be falsy.', function() {
        expect(unibose.isOpeningBracket('」')).toBe(false);
    });

});

describe('isClosingBracket', function() {

    it('to be truthy.', function() {
        expect(unibose.isClosingBracket(']')).toBe(true);
    });

    it('to be falsy.', function() {
        expect(unibose.isClosingBracket('[')).toBe(false);
    });

});

describe('isHyphen', function() {

    it('to be truthy.', function() {
        expect(unibose.isHyphen('-')).toBe(true);
        expect(unibose.isHyphen('〜')).toBe(true);
    });

    it('to be falsy.', function() {
        expect(unibose.isHyphen('＝')).toBe(false);
    });

});

describe('isPunctuation', function() {

    it('to be truthy.', function() {
        expect(unibose.isPunctuation('、')).toBe(true);
        expect(unibose.isPunctuation('。')).toBe(true);
    });

    it('to be falsy.', function() {
        expect(unibose.isHyphen('＊')).toBe(false);
    });

});

describe('isEllipsis', function() {

    it('to be truthy.', function() {
        expect(unibose.isEllipsis('…')).toBe(true);
    });

    it('to be falsy.', function() {
        expect(unibose.isEllipsis('・・・')).toBe(false);
    });

});

describe('isNotPermittedStart', function() {

    it('to be truthy.', function() {
        expect(unibose.isNotPermittedStart('？')).toBe(true);
    });

    it('to be falsy.', function() {
        expect(unibose.isNotPermittedStart('（')).toBe(false);
    });

});

describe('isNotPermittedEnd', function() {

    it('to be truthy.', function() {
        expect(unibose.isNotPermittedEnd('（')).toBe(true);
    });

    it('to be falsy.', function() {
        expect(unibose.isNotPermittedEnd('！')).toBe(false);
    });

});

describe('isSurrogatePair', function() {

    it('to be truthy.', function() {
        expect(unibose.isSurrogatePair('𡵅')).toBe(true);
        expect(unibose.isSurrogatePair('𡉴𡧃')).toBe(true);
    });

    it('to be falsy.', function() {
        expect(unibose.isSurrogatePair('川')).toBe(false);
        expect(unibose.isSurrogatePair('龠𡼞')).toBe(false);
    });

});

describe('isUnicode6Emoji', function() {

    it('to be truthy.', function() {
        expect(unibose.isUnicode6Emoji('\uD83D\uDE01')).toBe(true);
        expect(unibose.isUnicode6Emoji('\uD83D\uDEC0')).toBe(true);
        expect(unibose.isUnicode6Emoji('\uD83C\uDDEF')).toBe(true);
        expect(unibose.isUnicode6Emoji('\u2702')).toBe(true);
    });

    it('to be falsy.', function() {
        expect(unibose.isUnicode6Emoji('＠')).toBe(false);
        expect(unibose.isUnicode6Emoji('☭')).toBe(false);
    });
});

describe('hasAlpha', function() {

    it('to be truthy.', function() {
        expect(unibose.hasAlpha('abcZ')).toBe(true);
        expect(unibose.hasAlpha('ＡＢＣＺ')).toBe(true);
        expect(unibose.hasAlpha('1A')).toBe(true);
    });

    it('to be falsy.', function() {
        expect(unibose.hasAlpha('あいう')).toBe(false);
        expect(unibose.hasAlpha('ワヲン')).toBe(false);
    });

});

describe('hasNumeric', function() {

    it('to be truthy.', function() {
        expect(unibose.hasNumeric('012345')).toBe(true);
        expect(unibose.hasNumeric('０１２３４５')).toBe(true);
        expect(unibose.hasNumeric('1A')).toBe(true);
    });

    it('to be falsy.', function() {
        expect(unibose.hasNumeric('あ')).toBe(false);
        expect(unibose.hasNumeric('-^_<>')).toBe(false);    });

});

describe('hasAlphaNumeric', function() {

    it('to be truthy.', function() {
        expect(unibose.hasAlphaNumeric('０あ')).toBe(true);
        expect(unibose.hasAlphaNumeric('1a\nA_')).toBe(true);
    });

    it('to be falsy.', function() {
        expect(unibose.hasAlphaNumeric('あ＿')).toBe(false);
    });

});

describe('hasAscii', function() {

    it('to be truthy.', function() {
        expect(unibose.hasAscii('あ01Aん')).toBe(true);
        expect(unibose.hasAscii('南無阿弥陀仏_')).toBe(true);
        expect(unibose.hasAscii('1A!?-)_')).toBe(true);
        expect(unibose.hasAscii('０１２_４５Ｚ')).toBe(true);
    });

    it('to be falsy.', function() {
        expect(unibose.hasAscii('０あ')).toBe(false);
        expect(unibose.hasAscii('０１２＿４５Ｚ')).toBe(false);
    });

});

describe('hasHiragana', function() {

    it('to be truthy.', function() {
        expect(unibose.hasHiragana('いろはアウオ')).toBe(true);
        expect(unibose.hasHiragana('あわをんカキワ')).toBe(true);
    });

    it('to be falsy.', function() {
        expect(unibose.hasHiragana('1A_-?!')).toBe(false);
        expect(unibose.hasHiragana('アヲ')).toBe(false);
    });

});

describe('hasKatakana', function() {

    it('to be truthy.', function() {
        expect(unibose.hasKatakana('アあヲを')).toBe(true);
        expect(unibose.hasKatakana('かガｶﾞ')).toBe(true);
    });

    it('to be falsy.', function() {
        expect(unibose.hasKatakana('0A')).toBe(false);
        expect(unibose.hasKatakana('ﾜｦﾝ')).toBe(false);
        expect(unibose.hasKatakana('あを')).toBe(false);
    });

});

describe('hasHankana', function() {

    it('to be truthy.', function() {
        expect(unibose.hasHankana('ｱあｦﾝ')).toBe(true);
        expect(unibose.hasHankana('ｻﾞｼﾞﾂﾞ')).toBe(true);
        expect(unibose.hasHankana('ｬｭｮabcdez')).toBe(true);
    });

    it('to be falsy.', function() {
        expect(unibose.hasHankana('09')).toBe(false);
        expect(unibose.hasHankana('AZ')).toBe(false);
        expect(unibose.hasHankana('あを')).toBe(false);
        expect(unibose.hasHankana('アヲ')).toBe(false);
        expect(unibose.hasHankana('ザガポド')).toBe(false);
    });

});

describe('hasHalfWidth', function() {

    it('to be truthy.', function() {
        expect(unibose.hasHalfWidth('ｱあ')).toBe(true);
        expect(unibose.hasHalfWidth('ｻﾞｼﾞﾂﾞゼゾ')).toBe(true);
        expect(unibose.hasHalfWidth('南無阿弥陀仏12345')).toBe(true);
    });

    it('to be falsy.', function() {
        expect(unibose.hasHalfWidth('あを')).toBe(false);
        expect(unibose.hasHalfWidth('Ура')).toBe(false);
        expect(unibose.hasHalfWidth('ー＠')).toBe(false);
    });

});

describe('hasFullWidth', function() {

    it('to be truthy.', function() {
        expect(unibose.hasFullWidth('Aあ')).toBe(true);
        expect(unibose.hasFullWidth('Ａア')).toBe(true);
        expect(unibose.hasFullWidth('南無阿弥陀仏123')).toBe(true);
    });

    it('to be falsy.', function() {
        expect(unibose.hasFullWidth('ｱ')).toBe(false);
        expect(unibose.hasFullWidth('ｻﾞｼﾞﾂﾞ')).toBe(false);
        expect(unibose.hasFullWidth('ｬｭｮ_-[')).toBe(false);
        expect(unibose.hasFullWidth('A09Z@')).toBe(false);
    });

});

describe('hasLineBreak', function() {

    it('to be truthy.', function() {
        expect(unibose.hasLineBreak('\n')).toBe(true);
        expect(unibose.hasLineBreak('\r\n')).toBe(true);
        expect(unibose.hasLineBreak('A\nB')).toBe(true);
    });

    it('to be falsy.', function() {
        expect(unibose.hasLineBreak('\t')).toBe(false);
    });

});

describe('hasCyrillic', function() {

    it('to be truthy.', function() {
        expect(unibose.hasCyrillic('БДБ')).toBe(true);
        expect(unibose.hasCyrillic('Урааааааа')).toBe(true);
        expect(unibose.hasCyrillic('УY')).toBe(true);
    });

    it('to be falsy.', function() {
        expect(unibose.hasCyrillic('あを')).toBe(false);
        expect(unibose.hasCyrillic('Ypa')).toBe(false);
    });

});

describe('hasBlank', function() {

    it('to be truthy.', function() {
        expect(unibose.hasBlank('1\t0')).toBe(true);
        expect(unibose.hasBlank('1　9')).toBe(true);
        expect(unibose.hasBlank('2\n5')).toBe(true);
        expect(unibose.hasBlank('1 a')).toBe(true);
    });

    it('to be falsy.', function() {
        expect(unibose.hasBlank('4_')).toBe(false);
        expect(unibose.hasBlank('1020304050')).toBe(false);
    });

});

describe('hasContralCode', function() {

    it('to be truthy.', function() {
        expect(unibose.hasContralCode('\u0000〜\u007F')).toBe(true);
        expect(unibose.hasContralCode('\u0005〜')).toBe(true);
    });

    it('to be falsy.', function() {
        expect(unibose.hasContralCode('_-〜')).toBe(false);
        expect(unibose.hasContralCode(' 〜')).toBe(false);
    });

});

describe('hasPageBreak', function() {

    it('to be truthy.', function() {
        expect(unibose.hasPageBreak('あ\fう')).toBe(true);
    });

    it('to be falsy.', function() {
        expect(unibose.hasPageBreak('あ\rう')).toBe(false);
        expect(unibose.hasPageBreak('あ\tう')).toBe(false);
    });

});

describe('hasOpeningBracket', function() {

    it('to be truthy.', function() {
        expect(unibose.hasOpeningBracket('「は')).toBe(true);
    });

    it('to be falsy.', function() {
        expect(unibose.hasOpeningBracket('は」')).toBe(false);
    });

});

describe('hasClosingBracket', function() {

    it('to be truthy.', function() {
        expect(unibose.hasClosingBracket('ん]')).toBe(true);
    });

    it('to be falsy.', function() {
        expect(unibose.hasClosingBracket('[ん')).toBe(false);
    });

});

describe('hasHyphen', function() {

    it('to be truthy.', function() {
        expect(unibose.hasHyphen('-＝')).toBe(true);
        expect(unibose.hasHyphen('〜＝')).toBe(true);
    });

    it('to be falsy.', function() {
        expect(unibose.hasHyphen('＝＝')).toBe(false);
    });

});

describe('hasPunctuation', function() {

    it('to be truthy.', function() {
        expect(unibose.hasPunctuation('＋、')).toBe(true);
        expect(unibose.hasPunctuation('＋。')).toBe(true);
    });

    it('to be falsy.', function() {
        expect(unibose.hasPunctuation('＋＊')).toBe(false);
    });

});

describe('hasEllipsis', function() {

    it('to be truthy.', function() {
        expect(unibose.hasEllipsis('お…')).toBe(true);
    });

    it('to be falsy.', function() {
        expect(unibose.hasEllipsis('お・・・')).toBe(false);
    });

});

describe('hasNotPermittedStart', function() {

    it('to be truthy.', function() {
        expect(unibose.hasNotPermittedStart('あ！')).toBe(true);
    });

    it('to be falsy.', function() {
        expect(unibose.hasNotPermittedStart('あ（')).toBe(false);
    });

});

describe('hasNotPermittedEnd', function() {

    it('to be truthy.', function() {
        expect(unibose.hasNotPermittedEnd('＠（')).toBe(true);
    });

    it('to be falsy.', function() {
        expect(unibose.hasNotPermittedEnd('＠？')).toBe(false);
    });

});

describe('hasSurrogatePair', function() {

    it('to be truthy.', function() {
        expect(unibose.hasSurrogatePair('𡵅')).toBe(true);
        expect(unibose.hasSurrogatePair('𡉴𡧃')).toBe(true);
        expect(unibose.hasSurrogatePair('龠𡼞')).toBe(true);
    });

    it('to be falsy.', function() {
        expect(unibose.hasSurrogatePair('龠')).toBe(false);
        expect(unibose.hasSurrogatePair('南無阿弥陀仏')).toBe(false);
    });

});

describe('hasUnicode6Emoji', function() {

    it('to be truthy.', function() {
        expect(unibose.hasUnicode6Emoji('\uD83D\uDE01')).toBe(true);
        expect(unibose.hasUnicode6Emoji('\uD83D\uDEC0')).toBe(true);
        expect(unibose.hasUnicode6Emoji('\uD83C\uDDEF')).toBe(true);
        expect(unibose.hasUnicode6Emoji('\u2702')).toBe(true);
    });

    it('to be falsy.', function() {
        expect(unibose.hasUnicode6Emoji('＠')).toBe(false);
        expect(unibose.hasUnicode6Emoji('☭')).toBe(false);
    });
});