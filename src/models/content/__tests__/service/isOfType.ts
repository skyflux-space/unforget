import {isOfType} from '../../service'
import {Content, ContentType} from '../../types'

describe('isOfType', function () {

    test.each([
        [[], ContentType.List],
        ['', ContentType.String],
        [[{text: '1', checked: false, index: 1}], ContentType.List]
    ])('should return true for correct content type', function (content: Content, type: ContentType) {
        expect(isOfType(type, content)).toBe(true)
    })

    test.each([
        [[], ContentType.String],
        ['', ContentType.List],
        [[{text: '1', checked: false, index: 1}], ContentType.String]
    ])('should return false for incorrect content type', function (content: Content, type: ContentType) {
        expect(isOfType(type, content)).toBe(false)
    })

})