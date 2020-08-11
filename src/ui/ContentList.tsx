import React, {FocusEventHandler, memo, useMemo} from 'react'
import {ContentList as ContentListType, partitionByChecked} from '../models/content'
import {ContentListItem} from '../ui'
import styles from './ContentList.module.scss'

export type ContentListProps = {
    fields: ContentListType
    readOnly?: boolean
    createRef?: <T extends HTMLElement>() => React.Ref<T>
    onFieldBlur?: FocusEventHandler<HTMLTextAreaElement>
    onStaticInputChange?: (text: string) => void
    onFieldRemoved?: (i: number) => void
}

export const ContentList: React.FC<ContentListProps> = memo((
    {fields, createRef, onFieldBlur, onStaticInputChange, readOnly, onFieldRemoved},
    ) => {
        const [checked, unchecked] = useMemo(() => partitionByChecked(fields), [fields])

        return (
            <ul>
                {unchecked.map((e, i) => (
                    <li className={styles.margin} key={e.index.toString()}>
                        <ContentListItem
                            onBlur={onFieldBlur}
                            onRemoveClicked={() => onFieldRemoved?.(i)}
                            defaultText={e.text}
                            checked={e.checked}
                            ref={createRef?.()}
                            name={`content[${i}]`}
                            readOnly={readOnly}
                            index={e.index}
                        />
                    </li>
                ))}
                <li className={styles.margin}>
                    <ContentListItem
                        disabled
                        onTextChange={({target: {value}}) => onStaticInputChange?.(value)}
                        checked={false}
                    />
                </li>
                {checked.map((e, i) => (
                    <li className={styles.margin} key={e.index.toString()}>
                        <ContentListItem
                            onBlur={onFieldBlur}
                            onRemoveClicked={() => onFieldRemoved?.(unchecked.length + i)}
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