import {__, addIndex, applySpec, F, map, nthArg} from 'ramda'
import {convertContentToList, convertContentToString, convertTo, getContentType} from '../../service'
import {Content, ContentList, ContentListItem, ContentType} from '../../types'

describe('convertTo', function () {
    const listContent: ContentList = addIndex<string, ContentListItem>(map)(applySpec({
        text: nthArg(0),
        checked: F,
        index: nthArg(1),
    }), ['1', '2', '3'])

    const textContent = `
            1
            2
            3
            4
        `

    it('should convert list content to string', function () {
        const str = convertTo(ContentType.String, listContent)
        expect(str).toBe(convertContentToString(listContent))
    })

    it('should convert string to list', function () {
        const list = convertTo(ContentType.List, textContent)
        expect(list).toEqual(convertContentToList(textContent))
    })

    test.each([
        [textContent],
        [listContent],
    ])('should not change content if convert to the same type', function (content: Content) {
        const str = convertTo(getContentType(content)!, content)
        expect(str).toBe(content)
    })

    it('should be curried', function () {
        const a = convertTo(ContentType.String, [])
        const b = convertTo(ContentType.String)([])
        const c = convertTo(__, [])(ContentType.String)
        expect(a).toBe(b)
        expect(a).toBe(c)
    })

})