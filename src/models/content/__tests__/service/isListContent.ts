import {isListContent} from '../../service'


describe('isListContent', function () {

    test.each([
        [[]],
        [[1, 2, 3]],
        [[{text: ''}, {checked: false}, {index: 1}]]
    ])('should return true for any lists', function (list: any[]) {
        const isList = isListContent(list)
        expect(isList).toBe(true)
    })

    test.each([
        {},
        '',
        Symbol(),
        1,
        undefined,
        false,
        '123',
    ])('should return false for any types except lists', function (nonList: any) {
        const isList = isListContent(nonList)
        expect(isList).toBe(false)
    })

})