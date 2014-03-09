var unibose = new Unibose();

describe('isAlpha', function() {

    it('to be truthy.', function() {
        expect(unibose.isAlpha('abcZ')).toBeTruthy();
        expect(unibose.isAlpha('ＡＢＣＺ')).toBeTruthy();
    });

    it('to be falsy.', function() {
        expect(unibose.isAlpha('あいう')).toBeFalsy();
        expect(unibose.isAlpha('1A')).toBeFalsy();
    });

});

describe('isNumeric', function() {

    it('to be truthy.', function() {
        expect(unibose.isNumeric('012345')).toBeTruthy();
        expect(unibose.isNumeric('０１２３４５')).toBeTruthy();
    });

    it('to be falsy.', function() {
        expect(unibose.isNumeric('０あ')).toBeFalsy();
        expect(unibose.isNumeric('1A')).toBeFalsy();
    });

});

describe('isAlphaNumeric', function() {

    it('to be truthy.', function() {
        expect(unibose.isAlphaNumeric('012ABZ')).toBeTruthy();
        expect(unibose.isAlphaNumeric('０１２a４５Ｚ')).toBeTruthy();
    });

    it('to be falsy.', function() {
        expect(unibose.isAlphaNumeric('０あ')).toBeFalsy();
        expect(unibose.isAlphaNumeric('1A_')).toBeFalsy();
    });

});

describe('isAscii', function() {

    it('to be truthy.', function() {
        expect(unibose.isAscii('012ABZ')).toBeTruthy();
        expect(unibose.isAscii('1A!?-)_')).toBeTruthy();

    });

    it('to be falsy.', function() {
        expect(unibose.isAscii('０あ')).toBeFalsy();
        expect(unibose.isAscii('０１２a４５Ｚ')).toBeFalsy();
    });

});

describe('isHiragana', function() {

    it('to be truthy.', function() {
        expect(unibose.isHiragana('いろは')).toBe(true);
    });

    it('to be falsy.', function() {
        expect(unibose.isHiragana('1A_-?!')).toBe(false);
    });

});

describe('isLineBreak', function() {

    it('to be truthy.', function() {
        expect(unibose.isLineBreak('\n')).toBeTruthy();
        expect(unibose.isLineBreak('\r\n')).toBeTruthy();
    });

    it('to be falsy.', function() {
        expect(unibose.isLineBreak('A\nB')).toBeFalsy();
        expect(unibose.isLineBreak('\t')).toBeFalsy();
    });

});

describe('isBlank', function() {

    it('to be truthy.', function() {
        expect(unibose.isBlank('\t')).toBeTruthy();
        expect(unibose.isBlank('　')).toBeTruthy();
    });

    it('to be falsy.', function() {
        expect(unibose.isBlank('\n')).toBeTruthy();
        expect(unibose.isBlank('1 a')).toBeFalsy();
    });

});

describe('isOpeningBracket', function() {

    it('to be truthy.', function() {
        expect(unibose.isOpeningBracket('「')).toBeTruthy();
    });

    it('to be falsy.', function() {
        expect(unibose.isOpeningBracket('」')).toBeFalsy();
    });

});

describe('isClosingBracket', function() {

    it('to be truthy.', function() {
        expect(unibose.isClosingBracket(']')).toBeTruthy();
    });

    it('to be falsy.', function() {
        expect(unibose.isClosingBracket('[')).toBeFalsy();
    });

});

describe('isHyphen', function() {

    it('to be truthy.', function() {
        expect(unibose.isHyphen('-')).toBeTruthy();
        expect(unibose.isHyphen('〜')).toBeTruthy();
    });

    it('to be falsy.', function() {
        expect(unibose.isHyphen('＝')).toBeFalsy();
    });

});

describe('isPunctuation', function() {

    it('to be truthy.', function() {
        expect(unibose.isPunctuation('、')).toBeTruthy();
        expect(unibose.isPunctuation('。')).toBeTruthy();
    });

    it('to be falsy.', function() {
        expect(unibose.isHyphen('＊')).toBeFalsy();
    });

});

describe('isEllipsis', function() {

    it('to be truthy.', function() {
        expect(unibose.isEllipsis('…')).toBeTruthy();
    });

    it('to be falsy.', function() {
        expect(unibose.isEllipsis('・・・')).toBeFalsy();
    });

});

describe('isNotPermittedStart', function() {

    it('to be truthy.', function() {
        expect(unibose.isNotPermittedStart('？')).toBeTruthy();
    });

    it('to be falsy.', function() {
        expect(unibose.isNotPermittedStart('（')).toBeFalsy();
    });

});

describe('isNotPermittedEnd', function() {

    it('to be truthy.', function() {
        expect(unibose.isNotPermittedEnd('（')).toBeTruthy();
    });

    it('to be falsy.', function() {
        expect(unibose.isNotPermittedEnd('！')).toBeFalsy();
    });

});

describe('isSurrogatePair', function() {

    it('to be truthy.', function() {
        expect(unibose.isSurrogatePair('𡵅')).toBeTruthy();
        expect(unibose.isSurrogatePair('𡉴𡧃')).toBeTruthy();
    });

    it('to be falsy.', function() {
        expect(unibose.isSurrogatePair('川')).toBeFalsy();
        expect(unibose.isSurrogatePair('龠𡼞')).toBeFalsy();
    });

});

describe('isUnicode6Emoji', function() {

    it('to be truthy.', function() {
        expect(unibose.isUnicode6Emoji('\uD83D\uDE01')).toBeTruthy();
        expect(unibose.isUnicode6Emoji('\uD83D\uDEC0')).toBeTruthy();
        expect(unibose.isUnicode6Emoji('\uD83C\uDDEF')).toBeTruthy();
        expect(unibose.isUnicode6Emoji('\u2702')).toBeTruthy();
    });

    it('to be falsy.', function() {
        expect(unibose.isUnicode6Emoji('＠')).toBeFalsy();
        expect(unibose.isUnicode6Emoji('☭')).toBeFalsy();
    });
});
