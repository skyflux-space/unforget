import React, {FocusEventHandler, memo, useCallback, useMemo, useState} from 'react'
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

        const [focused, setFocused] = useState('static')
        const onEnter = useCallback(({index}) => {
            if (index === undefined)
                return checked.length && setFocused(checked[0].index.toString())

            if (unchecked.length && index === unchecked[unchecked.length - 1].index.toString())
                return setFocused('static')

            const uncheckedIndex = unchecked.findIndex(e => e.index.toString() === index)
            if (uncheckedIndex !== undefined)
                return setFocused(unchecked[uncheckedIndex + 1].index.toString())

            const checkedIndex = checked.findIndex(e => e.index.toString() === index)
            if (checkedIndex !== undefined && checkedIndex !== checked.length - 1)
                return setFocused(checked[checkedIndex + 1].index.toString())
        }, [setFocused, unchecked, checked])

        return (
            <ul>
                {unchecked.map((e, i) => (
                    <li className={styles.margin} key={e.index.toString()}>
                        <ContentListItem
                            onBlur={onFieldBlur}
                            onEnter={onEnter}
                            onRemoveClicked={onFieldRemoved}
                            defaultText={e.text}
                            checked={e.checked}
                            ref={createRef}
                            name={`content[${i}]`}
                            readOnly={readOnly}
                            index={e.index.toString()}
                            focus={e.index.toString() === focused}
                        />
                    </li>
                ))}
                {!readOnly && (
                    <li className={styles.margin} key="static">
                        <ContentListItem
                            disabled
                            onEnter={onEnter}
                            onTextChange={({target: {value}}) => onStaticInputChange?.(value)}
                            checked={false}
                            focus={focused === 'static'}
                        />
                    </li>
                )}
                {checked.map((e, i) => (
                    <li className={styles.margin} key={e.index.toString()}>
                        <ContentListItem
                            onBlur={onFieldBlur}
                            onEnter={onEnter}
                            onRemoveClicked={onFieldRemoved}
                            defaultText={e.text}
                            checked={e.checked}
                            ref={createRef}
                            name={`content[${unchecked.length + i}]`}
                            readOnly={readOnly}
                            index={e.index.toString()}
                            focus={e.index.toString() === focused}
                        />
                    </li>
                ))}
            </ul>
        )
    },
)