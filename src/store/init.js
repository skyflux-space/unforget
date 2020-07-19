import {notes, restoreNotes} from '../models/note'

export const init = ({set}) => set(notes, restoreNotes())