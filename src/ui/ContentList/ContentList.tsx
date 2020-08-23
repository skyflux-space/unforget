import React, {FocusEventHandler, Fragment, memo, useCallback, useMemo, useState} from 'react'
import {useCustomCompareEffect} from 'react-use'
import {always, isNil, pipe, when} from 'ramda'
import {ContentList as ContentListType, getMaxIndex, partitionByChecked} from '../../models/content'
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
                return unchecked.length && setFocused(unchecked[0].index.toString())

            if (unchecked.length && index === unchecked[unchecked.length - 1].index.toString())
                return setFocused('static')

            const uncheckedIndex = unchecked.findIndex(e => e.index.toString() === index)
            if (uncheckedIndex !== undefined)
                return setFocused(unchecked[uncheckedIndex + 1].index.toString())

            const checkedIndex = checked.findIndex(e => e.index.toString() === index)
            if (checkedIndex !== undefined && checkedIndex !== checked.length - 1)
                return setFocused(checked[checkedIndex + 1].index.toString())
        }, [setFocused, unchecked, checked])

        const onFocus = useCallback(({index}: { index?: string }) => setFocused(index || 'static'), [setFocused])

        useCustomCompareEffect(
            pipe(always(fields), getMaxIndex, when(isNil, always('static')), String, setFocused),
            [fields.length, unchecked],
            ([length, unchecked], [newLength, newUnchecked]) => newLength <= length && unchecked === newUnchecked,
        )

        const onStaticChange = useCallback(({target: {value}}) => onStaticInputChange?.(value), [onStaticInputChange])

        return (
            <ul>
                {fields.map((e, i, arr) => (
                    <Fragment key={e.index.toString()}>
                        <li className={styles.margin}>
                            <ContentListItem
                                onBlur={onFieldBlur}
                                onEnter={onEnter}
                                onRemoveClicked={onFieldRemoved}
                                onFocus={onFocus}
                                defaultText={e.text}
                                checked={e.checked}
                                ref={createRef}
                                name={`listContent[${i}]`}
                                readOnly={readOnly}
                                index={e.index.toString()}
                                focus={e.index.toString() === focused}
                            />
                        </li>
                        {!readOnly && !e.checked && (i === arr.length - 1 || arr[i + 1].checked) && (
                            <li className={styles.margin}>
                                <ContentListItem
                                    disabled
                                    onFocus={onFocus}
                                    onEnter={onEnter}
                                    onTextChange={onStaticChange}
                                    checked={false}
                                    focus={focused === 'static'}
                                />
                            </li>
                        )}
                    </Fragment>
                ))}
                {!readOnly && !fields.length && (
                    <li className={styles.margin}>
                        <ContentListItem
                            disabled
                            onFocus={onFocus}
                            onEnter={onEnter}
                            onTextChange={onStaticChange}
                            checked={false}
                            focus={focused === 'static'}
                        />
                    </li>
                )}
            </ul>
        )
    },
)