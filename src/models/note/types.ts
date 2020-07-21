export interface ValidNote extends Note {
    content: string | ContentList
}

export interface Note extends Identifiable {
    title?: string | null
    content?: string | ContentList
}

export interface Identifiable {
    id: string
}

export type ContentList = ContentListItem[]

export interface ContentListItem {
    text: string
    checked: boolean
}