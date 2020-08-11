import {getContentType} from '../../service'
import {Content, ContentList, ContentType} from '../../types'

describe('getContentType', function () {

    test.each([
        [[{checked: false, text: '1'}] as ContentList],
        [[{checked: true, text: '1'}] as ContentList],
        [[{checked: false, text: '1'}, {checked: true, text: '1'}] as ContentList],
        [[{checked: false, text: '1'}, {checked: true, text: ''}] as ContentList],
        [[{checked: false, text: ''}, {checked: true, text: '1'}] as ContentList],
    ])('should return list for valid list content', function (list: ContentList) {
        const type = getContentType(list)
        expect(type).toBe(ContentType.List)
    })

    it('should return string for valid string content', function () {
        const type = getContentType('123')
        expect(type).toBe(ContentType.String)
    })

    test.each([
        [undefined],
    ])('should return undefined for invalid content', function (content?: Content) {
        const type = getContentType(content)
        expect(type).toBeUndefined()
    })

})