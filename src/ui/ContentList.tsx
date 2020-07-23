import React, {ChangeEventHandler, FocusEventHandler, memo} from 'react'
import {ContentListItem as ContentListItemType, Identifiable} from '../models/note/types'
import {ContentListItem} from '../ui'

export type ContentListProps = {
    fields: Partial<ContentListItemType & Identifiable>[]
    createRef?: <T extends HTMLElement>() => React.Ref<T>
    onContentInputBlur?: FocusEventHandler<HTMLTextAreaElement>
    createOnContentInputBlur?: (i: number) => FocusEventHandler<HTMLTextAreaElement>
    onStaticInputChange?: ChangeEventHandler<HTMLTextAreaElement>

}

export const ContentList: React.FC<ContentListProps> = memo((
    {fields, createRef, onContentInputBlur, createOnContentInputBlur, onStaticInputChange}
    ) => (
        <ul>
            {fields.map((e, i) => (
                <li key={e.id}>
                    <ContentListItem
                        onBlur={createOnContentInputBlur?.(i) || onContentInputBlur}
                        defaultText={e.text}
                        checked={!!e.checked}
                        ref={createRef?.()}
                        name={`content[${i}]`}
                    />
                </li>
            ))}
            <li>
                <ContentListItem
                    disabled
                    onTextChange={onStaticInputChange}
                    checked={false}
                />
            </li>
        </ul>
    )
)