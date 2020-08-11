import {addIndex, applySpec, F, map, match, nthArg} from 'ramda'
import {ContentList, ContentListItem} from '../../types'
import {convertContentToString} from '../../service'


describe('convertContentToString', function () {

    it('should return empty string for empty list', function () {
        const content: ContentList = []
        const string = convertContentToString(content)
        expect(string).toBe('')
    })

    test.each([
        [['1']],
        [['1', '2', '3']],
    ])('should return string with lines equals to list length', function (texts) {
        const contentList: ContentList = addIndex<string, ContentListItem>(map)(applySpec({
            text: nthArg(0),
            checked: F,
            index: nthArg(1),
        }), texts)
        const string = convertContentToString(contentList)
        expect(match(/[\n\r]/g, string).length).toBe(texts.length - 1)
    })

    it('should handle empty list elements', function () {
        const texts = ['1', '', '2']
        const contentList: ContentList = addIndex<string, ContentListItem>(map)(applySpec({
            text: nthArg(0),
            checked: F,
            index: nthArg(1),
        }), texts)
        const string = convertContentToString(contentList)
        expect(string).toEqual('1\n2')
    })
})