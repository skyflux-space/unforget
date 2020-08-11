import {sortListByChecked} from '../../service'
import {ascend, complement, filter, prop, sort, takeLastWhile, takeWhile} from 'ramda'
import {ContentList} from '../../types'

describe('sortListByChecked', function () {

    test.each([
        [[
            {text: '123', checked: false, index: 0},
            {text: '123', checked: false, index: 5},
            {text: '123', checked: false, index: 4},
            {text: '123', checked: false, index: 2},
            {text: '123', checked: false, index: 3},
            {text: '123', checked: false, index: 1},
        ]],
        [[
            {text: '123', checked: true, index: 0},
            {text: '123', checked: true, index: 5},
            {text: '123', checked: true, index: 4},
            {text: '123', checked: true, index: 2},
            {text: '123', checked: true, index: 3},
            {text: '123', checked: true, index: 1},
        ]],
    ])('should sort by index if each checked state is equal', function (list: ContentList) {
        const sorted = sortListByChecked(list)
        expect(sorted).toEqual(sort(ascend(prop('index')), list))
    })

    it('should sort by checked firstly', () => {
        const list = [
            {text: '123', checked: true, index: 0},
            {text: '123', checked: true, index: 5},
            {text: '123', checked: false, index: 4},
            {text: '123', checked: true, index: 2},
            {text: '123', checked: false, index: 3},
            {text: '123', checked: false, index: 1},
        ]
        const sorted = sortListByChecked(list)
        const checked = takeWhile(complement(prop('checked')), sorted)
        const unchecked = takeLastWhile(prop('checked'), sorted)
        expect(checked.length).toBe(filter(complement(prop('checked')), list).length)
        expect(unchecked.length).toBe(filter(prop('checked'), list).length)
    })

    it('should sort by index secondly', function () {
        const list = [
            {text: '123', checked: true, index: 0},
            {text: '123', checked: true, index: 5},
            {text: '123', checked: false, index: 4},
            {text: '123', checked: true, index: 2},
            {text: '123', checked: false, index: 3},
            {text: '123', checked: false, index: 1},
        ]
        const sorted = sortListByChecked(list)
        const checked = takeWhile(complement(prop('checked')), sorted)
        const unchecked = takeLastWhile(prop('checked'), sorted)
        expect(checked).toEqual(sort(ascend(prop('index')), checked))
        expect(unchecked).toEqual(sort(ascend(prop('index')), unchecked))
    })

})