import {Curried} from '../../utils/Curried'

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

export type Content = string | ContentList

export interface Identifiable {
    id: string
}

export type ContentList = ContentListItem[]

export interface ContentListItem {
    text: string
    checked: boolean
    index: number
}

export enum ContentType {
    String, List
}

export type MassMutator = Curried<Note[]>
export type SingleMutator = Curried<Note, Note[]>