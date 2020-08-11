export type Content = string | ContentList

export type ContentList = ContentListItem[]

export type ContentListItem = {
    checked: boolean
    text: string
    index: number
}

export enum ContentType {
    String, List
}