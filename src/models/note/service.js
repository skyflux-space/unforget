import {append, filter, find, map} from 'ramda'
import {nanoid} from 'nanoid'


export const getNote = id => find(note => note.id === id)


export const addNote = note => append({...note, id: nanoid()})


export const replaceNote = note => map(e => e.id === note.id ? note : e)


export const removeNote = id => filter(note => note.id !== id)