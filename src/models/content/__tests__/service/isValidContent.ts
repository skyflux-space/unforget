import {isValidContent} from '../../service'
import {ContentList} from '../../types'

describe('isValidContent', function () {

    test.each([
        [[{text: '1', checked: false, index: 0}]],
        [[{text: '1', checked: true, index: 0}]],
        [[{text: '1', checked: false, index: 0}, {text: '2', checked: true, index: 1}]],
        [[{text: '1', checked: false, index: 0}, {text: '', checked: true, index: 1}]],
        [[{text: '', checked: false, index: 0}, {text: '1', checked: true, index: 1}]],
    ])('should return true for valid list content', function (list: ContentList) {
        const valid = isValidContent(list)
        expect(valid).toBe(true)
    })

    it('should return true for non-empty string', function () {
        const valid = isValidContent('123')
        expect(valid).toBe(true)
    })

    test.each([
        '',
        ' ',
        '   ',
    ])('should return false for invalid strings', function (str: string) {
        const valid = isValidContent(str)
        expect(valid).toBe(false)
    })

    test.each([
        [[{text: '', checked: false, index: 0}, {text: '', checked: true, index: 1}]],
        [[{text: '123', checked: false}, {text: '1234', checked: true, index: 0}]],
    ])('should return false for invalid lists', function (list: any[]) {
        const valid = isValidContent(list)
        expect(valid).toBe(false)
    })

})