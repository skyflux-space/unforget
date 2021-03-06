import React, {useCallback} from 'react'
import {always, length, prop, reject} from 'ramda'
import c from 'classnames'
import {ValidNote} from '../../models/note'
import {ContentList, isListContent, isTextContent} from '../../models/content'
import {useLongClick} from '../../utils/useLongClick'
import {Icon} from '../Icon'
import styles from './MiniCard.module.scss'


const MAX = 9


export type MiniCardProps = {
    note: ValidNote
    selected: boolean
    onSelect?: () => void
    onClick?: () => void
}

export const MiniCard: React.FC<MiniCardProps> = ({note: {title, content, pinned}, selected, onSelect = always(undefined), onClick}) => {
    const {onTouchEnd, onTouchStart} = useLongClick(onSelect)
    const onSelectClick = useCallback((event: React.MouseEvent) => {
        event.stopPropagation()
        event.preventDefault()
        onSelect()
    }, [onSelect])

    const isList = isListContent(content)
    const isOverflowed = isList && content.length > MAX

    const unchecked = isList && length(reject(prop('checked'), content as ContentList))
    const checked = isList && content.length - (unchecked as number)

    return (
        <button
            className={c(styles.card, selected && styles.selected, pinned && styles.pinned)}
            onClick={onClick}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        >
            <div
                className={c(styles.content, isOverflowed && styles.overflowed, isTextContent(content) && styles.text)}>
                {title && <h1 className={styles.title}>{title}</h1>}
                {
                    typeof content === 'string'
                        ? <span className={c(styles.small, styles.break)}>{content}</span>
                        : (
                            <ul>
                                {content.slice(0, isOverflowed ? 8 : 9).map((e, i) => (
                                    <li className={c(styles.flex, styles.item, styles.small)} key={i}>
                                        <span className={c(styles.ellipsis, e.checked && styles.checked)}>{e.text}</span>
                                    </li>
                                ))}
                            </ul>
                        )
                }
                <div role="button" onClick={onSelectClick} className={c(styles.dot, selected && styles.selected)}/>
                <div role="button" className={c(styles.pin, pinned && styles.active)}>
                    <Icon icon="pin"/>
                </div>
            </div>
            {isOverflowed && (
                <div className={styles.info}>
                    {(unchecked > MAX - 1) && <span>{unchecked}</span>}
                    {checked > 0 && <span className={styles.checked}>{checked}</span>}
                </div>
            )}
        </button>
    )
}