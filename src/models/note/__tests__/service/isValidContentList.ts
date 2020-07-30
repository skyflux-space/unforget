import {isValidContentList} from '../../service'
import {ContentList} from '../../types'


describe('isValidContentList', function () {

    test.each([
        [[{text: '1', checked: false}]],
        [[{text: '1', checked: true}]],
        [[{text: '1', checked: false}, {text: '2', checked: true}]],
        [[{text: '1', checked: false}, {text: '', checked: true}]],
        [[{text: '', checked: false}, {text: '1', checked: true}]],
    ])('should return true for valid lists', function (list: ContentList) {
        const valid = isValidContentList(list)
        expect(valid).toBe(true)
    })

    it('should return false for undefined', function () {
        const valid = isValidContentList(undefined)
        expect(valid).toBe(false)
    })

    it('should return false for empty list', function () {
        const list: ContentList = []
        const valid = isValidContentList(list)
        expect(valid).toBe(false)
    })

    it('should return false for empty texts', function () {
        const list: ContentList = [
            {text: '', checked: false},
            {text: '', checked: true},
        ]
        const valid = isValidContentList(list)
        expect(valid).toBe(false)
    })

})