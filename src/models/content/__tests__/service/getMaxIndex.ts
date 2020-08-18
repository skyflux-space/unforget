import {getMaxIndex} from '../../service'
import {ContentList} from '../../types'

describe('getMaxIndex', function () {

    it('should return undefined for empty list', function () {
        const index = getMaxIndex([])
        expect(index).toBe(undefined)
    })

    it('should return max index for lists with number indexes', function () {
        const list: ContentList = [
            {index: 0, text: '0', checked: false},
            {index: 1, text: '1', checked: false},
            {index: 2, text: '2', checked: false},
            {index: 3, text: '3', checked: false},
            {index: 4, text: '4', checked: false},
        ]
        const index = getMaxIndex(list)
        expect(index).toBe(4)
    })

    it('should return max index for lists with string indexes', function () {
        const list: ContentList = [
            {index: '0', text: '0', checked: false},
            {index: '1', text: '1', checked: false},
            {index: '2', text: '2', checked: false},
            {index: '3', text: '3', checked: false},
            {index: '4', text: '4', checked: false},
        ]
        const index = getMaxIndex(list)
        expect(index).toBe(4)
    })

})