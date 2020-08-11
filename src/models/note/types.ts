import {Curried} from '../../utils/Curried'
import {Content, ContentList} from '../content'

export interface ListNote extends ValidNote {
    content: ContentList
}

export interface ValidNote extends Note {
    content: string | ContentList
    pinned: boolean
}

export interface Note extends Identifiable {
    title?: string | null
    content?: Content
    pinned?: boolean
}

export interface Identifiable {
    id: string
}

export type MassMutator = Curried<Note[]>
export type SingleMutator = Curried<Note, Note[]>