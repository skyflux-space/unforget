import {addIndexesToContentList} from '../../service'
import {ContentListItem} from '../../types'

describe('addIndexesToContentList', function () {
    const list: Omit<ContentListItem, 'index'>[] = [
        {text: '123', checked: false},
        {text: '1234', checked: true},
        {text: 'test', checked: false},
        {text: '1', checked: true},
        {text: '', checked: true},
        {text: '12', checked: false},
    ]

    it('should add valid indexes to list', function () {
        const withIndexes = addIndexesToContentList(list)
        expect(withIndexes.every(({index}, i) => index === i)).toBe(true)
    })

})