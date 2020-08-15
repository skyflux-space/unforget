import React, {useCallback} from 'react'
import c from 'classnames'
import {ValidNote} from '../../models/note'
import {useLongClick} from '../../utils/useLongClick'
import styles from './MiniCard.module.scss'
import {Icon} from '../Icon'


export type MiniCardProps = {
    note: ValidNote
    selected: boolean
    onSelect?: () => void
    onClick?: () => void
    pinned?: boolean
}

export const MiniCard: React.FC<MiniCardProps> = ({note: {title, content}, selected, onSelect = () => {}, onClick, pinned}) => {
    const {onTouchEnd, onTouchStart} = useLongClick(onSelect)
    const onSelectClick = useCallback((event: React.MouseEvent) => {
        event.stopPropagation()
        event.preventDefault()
        onSelect()
    }, [onSelect])

    return (
        <button
            className={c(styles.card, selected && styles.selected)}
            onClick={onClick}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        >
            {title && <h1 className={styles.title}>{title}</h1>}
            {
                typeof content === 'string'
                    ? <span className={c(styles.small, styles.break)}>{content}</span>
                    : (
                        <ul>
                            {content.map((e, i) => (
                                <li className={c(styles.item, styles.small)} key={i}>
                                    <input className={styles.checkbox} type="checkbox" checked={e.checked} disabled/>
                                    <span className={styles.break}>{e.text}</span>
                                </li>
                            ))}
                        </ul>
                    )
            }
            <div role="button" onClick={onSelectClick} className={c(styles.dot, selected && styles.selected)}/>
            <div role="button" className={c(styles.pin, pinned && styles.active)}>
                <Icon icon="pin"/>
            </div>
        </button>
    )
}