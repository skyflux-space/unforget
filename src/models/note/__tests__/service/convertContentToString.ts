import {applySpec, F, identity, map, match} from 'ramda'
import {convertContentToString} from '../../service'
import {ContentList} from '../../types'


describe('convertContentToString', function () {

    it('should return empty string for empty list', function () {
        const content: ContentList = []
        const string = convertContentToString(content)
        expect(string).toBe('')
    })

    test.each([
        [['1']],
        [['1', '2', '3']]
    ])('should return string with lines equals to list length', function (texts) {
        const contentList: ContentList = map(applySpec({
            text: identity,
            checked: F,
        }), texts)
        const string = convertContentToString(contentList)
        expect(match(/[\n\r]/g, string).length).toBe(texts.length - 1)
    })

    it('should handle empty list elements', function () {
        const texts = ['1', '', '2']
        const contentList: ContentList = map(applySpec({
            text: identity,
            checked: F,
        }), texts)
        const string = convertContentToString(contentList)
        expect(string).toEqual('1\n2')
    })
})