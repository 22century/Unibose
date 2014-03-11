var unibose = new Unibose();

describe('toUnicodeLiteral', function() {

    it('to be equal.', function() {
        expect(unibose.toUnicodeLiteral('abc')).toBe('\\u0061\\u0062\\u0063');
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

describe('normalizeLinebreak', function() {

    it('to be equal.', function() {
        expect(unibose.normalizeLinebreak('aa\raa')).toBe('aa\naa');
        expect(unibose.normalizeLinebreak('aa\r\naa','\n')).toBe('aa\naa');
        expect(unibose.normalizeLinebreak('aa\r\naa')).toBe('aa\naa');
        expect(unibose.normalizeLinebreak('aa\na\r\na', '\r\n')).toBe('aa\r\na\r\na');
    });

});

