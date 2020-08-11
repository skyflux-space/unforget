import {partitionByChecked} from '../../service'
import {complement, filter, prop} from 'ramda'

describe('partitionByChecked', function () {

    it('should partition items by checked', function () {
        const items = [
            {text: '123', checked: true, index: 0},
            {text: '123', checked: true, index: 5},
            {text: '123', checked: false, index: 4},
            {text: '123', checked: true, index: 2},
            {text: '123', checked: false, index: 3},
            {text: '123', checked: false, index: 1},
        ]
        const [checked, unchecked] = partitionByChecked(items)
        expect(checked).toEqual(filter(prop('checked'), items))
        expect(unchecked).toEqual(filter(complement(prop('checked')), items))
    })

})