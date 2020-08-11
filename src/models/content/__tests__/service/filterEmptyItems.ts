import {filterEmptyItems} from '../../service'

describe('filterEmptyItems', function () {

    it('should not affect list without empty texts', function () {
        const list = [
            {text: '1', checked: false, index: 0},
            {text: '2', checked: true, index: 1},
            {text: '0', checked: false, index: 2},
        ]
        const filteredList = filterEmptyItems(list)
        expect(filteredList).toEqual(list)
    })

    it('should not contains items with empty texts', function () {
        const list = [
            {text: '1', checked: false, index: 0},
            {text: '', checked: true, index: 1},
            {text: ' ', checked: false, index: 2},
        ]
        const filteredList = filterEmptyItems(list)
        expect(filteredList).toEqual(list.filter(({text}) => text))
    })

})