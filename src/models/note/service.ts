import {append, filter, find, map} from 'ramda'
// @ts-ignore
import {nanoid} from 'nanoid'
import {Note, ValidNote} from "./types";


export const isValidNote = (note: Note): note is ValidNote => !!note.content


export const filterValidNotes
    : (list: Note[]) => ValidNote[]
    = filter(isValidNote) as (list: Note[]) => ValidNote[]

export const getNote
    : (id: string) => (notes: Note[]) => Note | undefined
    = id => find(note => note.id === id)


export const createNote
    : () => Note
    = () => ({id: nanoid()})


export const addNote
    : (note: Note) => (notes: Note[]) => Note[]
    = note => append(note)


export const replaceNote
    : (note: Note) => (notes: Note[]) => Note[]
    = note => map(e => e.id === note.id ? note : e)


export const removeNote
    : (id: string) => (notes: Note[]) => Note[]
    = id => filter((note: Note) => note.id !== id)


export const saveNotes
    : (notes: Note[]) => void
    = notes => localStorage.setItem('notes', JSON.stringify(filterValidNotes(notes)))


export const restoreNotes: () => Note[] = () => {
    const data = localStorage.getItem('notes')
    return data ? JSON.parse(data) : []
}