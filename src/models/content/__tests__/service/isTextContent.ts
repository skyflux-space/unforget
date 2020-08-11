import {isTextContent} from '../../service'

describe('isTextContent', function () {

    test.each([
        '',
        '123',
        'any',
    ])('should return true for any string', function (str: string) {
        const isText = isTextContent(str)
        expect(isText).toBe(true)
    })

    test.each([
        1,
        Symbol(),
        [],
        {},
        ['123'],
        undefined,
        null,
        () => 'a',
    ])('should return false for any types except string', function (nonString: any) {
        const isText = isTextContent(nonString)
        expect(isText).toBe(false)
    })

})