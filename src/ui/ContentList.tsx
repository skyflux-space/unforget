import React, {ChangeEventHandler, FocusEventHandler, memo} from 'react'
import {ContentListItem as ContentListItemType, Identifiable} from '../models/note/types'
import {ContentListItem} from '../ui'
import styles from './ContentList.module.scss'

export type ContentListProps = {
    fields: Partial<ContentListItemType & Identifiable>[]
    createRef?: <T extends HTMLElement>() => React.Ref<T>
    onFieldBlur?: FocusEventHandler<HTMLTextAreaElement>
    createOnFieldBlur?: (i: number) => FocusEventHandler<HTMLTextAreaElement>
    onStaticInputChange?: ChangeEventHandler<HTMLTextAreaElement>
}

export const ContentList: React.FC<ContentListProps> = memo((
    {fields, createRef, onFieldBlur, createOnFieldBlur, onStaticInputChange}
    ) => (
        <ul>
            {fields.map((e, i) => (
                <li key={e.id} className={styles.margin}>
                    <ContentListItem
                        onBlur={createOnFieldBlur?.(i) || onFieldBlur}
                        defaultText={e.text}
                        checked={!!e.checked}
                        ref={createRef?.()}
                        name={`content[${i}]`}
                    />
                </li>
            ))}
            <li className={styles.margin}>
                <ContentListItem
                    disabled
                    onTextChange={onStaticInputChange}
                    checked={false}
                />
            </li>
        </ul>
    )
)