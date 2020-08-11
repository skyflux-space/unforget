import {isValidListContent} from '../../service'
import {ContentList} from '../../types'


describe('isValidListContent', function () {

    test.each([
        [[{text: '1', checked: false, index: 0}]],
        [[{text: '1', checked: true, index: 0}]],
        [[{text: '1', checked: false, index: 0}, {text: '2', checked: true, index: 1}]],
        [[{text: '1', checked: false, index: 0}, {text: '', checked: true, index: 1}]],
        [[{text: '', checked: false, index: 0}, {text: '1', checked: true, index: 1}]],
    ])('should return true for valid lists', function (list: ContentList) {
        const valid = isValidListContent(list)
        expect(valid).toBe(true)
    })

    it('should return false for undefined', function () {
        const valid = isValidListContent(undefined)
        expect(valid).toBe(false)
    })

    it('should return false for empty list', function () {
        const list: ContentList = []
        const valid = isValidListContent(list)
        expect(valid).toBe(false)
    })

    it('should return false for empty texts', function () {
        const list: ContentList = [
            {text: '', checked: false, index: 0},
            {text: '', checked: true, index: 1},
        ]
        const valid = isValidListContent(list)
        expect(valid).toBe(false)
    })

})