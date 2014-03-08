var mozi = new Mozi();

describe('toUnicodeLiteral', function() {

    it('true a', function() {
        expect(mozi.toUnicodeLiteral('a')).toBeTruthy();
    });

});

describe('isAlpha', function() {

    it('true a', function() {
        expect(mozi.isAlpha('a')).toBeTruthy();
    });

    it('true ABC', function() {
        expect(mozi.isAlpha('A')).toBeTruthy();
    });

    it('false 1', function() {
        expect(mozi.isAlpha('1')).toBeFalsy();
    });

    it('false 1aA', function() {
        expect(mozi.isAlpha('1a')).toBeFalsy();
    });

});

describe('isNumeric', function() {

    it('true 1', function() {
        expect(mozi.isNumeric('1')).toBeTruthy();
    });

    it('true 0123', function() {
        expect(mozi.isNumeric('0123')).toBeTruthy();
    });

    it('false A', function() {
        expect(mozi.isNumeric('A')).toBeFalsy();
    });

    it('false 1aA', function() {
        expect(mozi.isNumeric('1aA')).toBeFalsy();
    });

});

describe('isAlphaNumeric', function() {

    it('true a', function() {
        expect(mozi.isAlphaNumeric('a')).toBeTruthy();
    });

    it('true A', function() {
        expect(mozi.isAlphaNumeric('AB1')).toBeTruthy();
    });

    it('false あ', function() {
        expect(mozi.isAlphaNumeric('あ')).toBeFalsy();
    });

    it('false 1A_', function() {
        expect(mozi.isAlphaNumeric('1A_')).toBeFalsy();
    });

});

describe('isLineBreak', function() {

    it('true \\n', function() {
        expect(mozi.isLineBreak('\n')).toBeTruthy();
    });

    it('true \\r\\n', function() {
        expect(mozi.isLineBreak('\r\n')).toBeTruthy();
    });

    it('false A\\nB', function() {
        expect(mozi.isLineBreak('A\nB')).toBeFalsy();
    });

    it('false \\t', function() {
        expect(mozi.isLineBreak('\t')).toBeFalsy();
    });

});

describe('isBlank', function() {

    it("true \\t", function() {
        expect(mozi.isBlank('\t')).toBeTruthy();
    });

    it("true '　'", function() {
        expect(mozi.isBlank('　')).toBeTruthy();
    });

    it('true \\n', function() {
        expect(mozi.isBlank('\n')).toBeTruthy();
    });

    it('false 1 a', function() {
        expect(mozi.isBlank('1 a')).toBeFalsy();
    });

});

describe('isOpeningBracket', function() {

    it('true 「', function() {
        expect(mozi.isOpeningBracket('「')).toBeTruthy();
    });

    it('false 」', function() {
        expect(mozi.isOpeningBracket('」')).toBeFalsy();
    });

});

describe('isClosingBracket', function() {

    it('true ]', function() {
        expect(mozi.isClosingBracket(']')).toBeTruthy();
    });

    it('false [', function() {
        expect(mozi.isClosingBracket('[')).toBeFalsy();
    });

});

describe('isHyphen', function() {

    it('true -', function() {
        expect(mozi.isHyphen('-')).toBeTruthy();
    });

    it('true 〜', function() {
        expect(mozi.isHyphen('〜')).toBeTruthy();
    });

    it('false ＝', function() {
        expect(mozi.isHyphen('＝')).toBeFalsy();
    });

});

describe('isPunctuation', function() {

    it('true 、', function() {
        expect(mozi.isPunctuation('、')).toBeTruthy();
    });

    it('true 。', function() {
        expect(mozi.isPunctuation('。')).toBeTruthy();
    });

    it('false ＊', function() {
        expect(mozi.isHyphen('＊')).toBeFalsy();
    });

});

describe('isEllipsis', function() {

    it('true …', function() {
        expect(mozi.isEllipsis('…')).toBeTruthy();
    });

    it('false ・・・', function() {
        expect(mozi.isEllipsis('・・・')).toBeFalsy();
    });

});

describe('isNotPermittedStart', function() {

    it('true ？', function() {
        expect(mozi.isNotPermittedStart('？')).toBeTruthy();
    });

    it('false （', function() {
        expect(mozi.isNotPermittedStart('（')).toBeFalsy();
    });

});

describe('isNotPermittedEnd', function() {

    it('true （', function() {
        expect(mozi.isNotPermittedEnd('（')).toBeTruthy();
    });

    it('false ！', function() {
        expect(mozi.isNotPermittedEnd('！')).toBeFalsy();
    });

});

describe('isSurrogatePair', function() {

    it('true 𡵅', function() {
        expect(mozi.isSurrogatePair('𡵅')).toBeTruthy();
    });

    it('false 川', function() {
        expect(mozi.isSurrogatePair('川')).toBeFalsy();
    });

    it('true 𡉴𡧃', function() {
        expect(mozi.isSurrogatePair('𡉴𡧃')).toBeTruthy();
    });

    it('false 龠𡼞', function() {
        expect(mozi.isSurrogatePair('龠𡼞')).toBeFalsy();
    });

});

describe('isUnicode6Emoji', function() {

    it('true \uD83D\uDE01', function() {
        expect(mozi.isUnicode6Emoji('\uD83D\uDE01')).toBeTruthy();
    });

    it('true \uD83D\uDEC0', function() {
        expect(mozi.isUnicode6Emoji('\uD83D\uDEC0')).toBeTruthy();
    });

    it('true \uD83C\uDDEF', function() {
        expect(mozi.isUnicode6Emoji('\uD83C\uDDEF')).toBeTruthy();
    });

    it('true \u2702', function() {
        expect(mozi.isUnicode6Emoji('\u2702')).toBeTruthy();
    });

    it('false ＠', function() {
        expect(mozi.isUnicode6Emoji('＠')).toBeFalsy();
    });

    it('false ☭', function() {
        expect(mozi.isUnicode6Emoji('☭')).toBeFalsy();
    });
});
