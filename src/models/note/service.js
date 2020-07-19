import {append, filter, find, map} from 'ramda'
import {nanoid} from 'nanoid'


export const filterValidNotes = filter(note => !!note.content)


export const getNote = id => find(note => note.id === id)


export const createNote = note => ({...note, id: nanoid()})


export const addNote = note => append(note.id ? note : createNote(note))


export const replaceNote = note => map(e => e.id === note.id ? note : e)


export const removeNote = id => filter(note => note.id !== id)
