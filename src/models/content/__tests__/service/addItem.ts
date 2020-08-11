import {addItem} from '../../service'
import {ContentList} from '../../types'
import {__} from 'ramda'

describe('addItem', function () {

    it('should add new item to list', function () {
        const list = [{text: '', checked: false, index: 0}, {text: '1', checked: true, index: 1}, {
            text: '2',
            checked: true,
            index: 2,
        }]
        const newList = addItem('1234', list)
        expect(newList).toEqual([...list, {text: '1234', checked: false, index: 3}])
    })

    it('should add new item to empty list', function () {
        const list: ContentList = []
        const newList = addItem('1234', list)
        expect(newList).toEqual([{text: '1234', checked: false, index: 0}])
    })

    it('should be curried', function () {
        const list = [{text: '', checked: false, index: 0}, {text: '1', checked: true, index: 1}, {
            text: '2',
            checked: true,
            index: 2,
        }]
        const a = addItem('1234', list)
        const b = addItem('1234')(list)
        const c = addItem(__, list)('1234')
        expect(a).toEqual(b)
        expect(a).toEqual(c)
    })

})