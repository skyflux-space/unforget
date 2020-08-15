import React, {FocusEventHandler, memo, useCallback, useEffect, useMemo} from 'react'
import {memoizeWith} from 'ramda'
import {ContentList as ContentListType, partitionByChecked} from '../../models/content'
import {ContentListItem} from '../index'
import styles from './ContentList.module.scss'

export type ContentListProps = {
    fields: ContentListType
    readOnly?: boolean
    createRef?: <T extends HTMLElement>() => React.Ref<T>
    onFieldBlur?: FocusEventHandler<HTMLTextAreaElement>
    onStaticInputChange?: (text: string) => void
    onFieldRemoved?: (i: number | string) => void
}

export const ContentList: React.FC<ContentListProps> = memo((
    {fields, createRef, onFieldBlur, onStaticInputChange, readOnly, onFieldRemoved},
    ) => {
        const [checked, unchecked] = useMemo(() => partitionByChecked(fields), [fields])

        const createOnRemovedCallback = useCallback(memoizeWith(String, (key: string | number) => () => onFieldRemoved?.(key)), [onFieldRemoved])

        const callbacks: Record<string, () => void> = useMemo(() => fields.reduce((acc, e) => ({
            ...acc,
            [e.index]: createOnRemovedCallback(e.index),
        }), {}), [fields, createOnRemovedCallback])

        useEffect(() => console.log('a'), [onFieldRemoved])

        return (
            <ul>
                {unchecked.map((e, i) => (
                    <li className={styles.margin} key={e.index.toString()}>
                        <ContentListItem
                            onBlur={onFieldBlur}
                            onRemoveClicked={callbacks[e.index.toString()]}
                            defaultText={e.text}
                            checked={e.checked}
                            ref={createRef?.()}
                            name={`content[${i}]`}
                            readOnly={readOnly}
                            index={e.index}
                        />
                    </li>
                ))}
                {!readOnly && (
                    <li className={styles.margin}>
                        <ContentListItem
                            disabled
                            onTextChange={({target: {value}}) => onStaticInputChange?.(value)}
                            checked={false}
                        />
                    </li>
                )}
                {checked.map((e, i) => (
                    <li className={styles.margin} key={e.index.toString()}>
                        <ContentListItem
                            onBlur={onFieldBlur}
                            onRemoveClicked={callbacks[e.index.toString()]}
                            defaultText={e.text}
                            checked={e.checked}
                            ref={createRef?.()}
                            name={`content[${unchecked.length + i}]`}
                            readOnly={readOnly}
                            index={e.index}
                        />
                    </li>
                ))}
            </ul>
        )
    },
)