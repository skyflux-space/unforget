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
    onFieldChecked?: (i: number, value: boolean) => void
    onFieldRemoved?: (i: number) => void
    readOnly?: boolean
}

export const ContentList: React.FC<ContentListProps> = memo((
    {fields, createRef, onFieldBlur, createOnFieldBlur, onStaticInputChange, readOnly, onFieldRemoved, onFieldChecked}
    ) => (
        <ul>
            {fields.map((e, i) => (
                <li key={e.id} className={styles.margin}>
                    <ContentListItem
                        onBlur={createOnFieldBlur?.(i) || onFieldBlur}
                        onRemoveClicked={() => onFieldRemoved?.(i)}
                        defaultText={e.text}
                        checked={!!e.checked}
                        ref={createRef?.()}
                        name={`content[${i}]`}
                        readOnly={readOnly}
                        index={e.index}
                        onChecked={(value: boolean) => onFieldChecked?.(i, value)}
                    />
                </li>
            ))}
            {!readOnly && (
                <li className={styles.margin}>
                    <ContentListItem
                        disabled
                        onTextChange={onStaticInputChange}
                        checked={false}
                    />
                </li>
            )}
        </ul>
    )
)