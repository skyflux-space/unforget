import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import {NoteType} from '../models/note'
import styles from './MiniCard.module.scss'


export const MiniCard = ({note: {content, title}, selected}) => (
    <div className={c(styles.card, selected && styles.selected)}>
        {title && <h1 className={styles.title}>{title}</h1>}
        {
            typeof content === 'string'
                ? <span className={c(styles.small, styles.break)}>{content}</span>
                : (
                    <ul className={styles.list}>
                        {content.map((e, i) => (
                            <li className={c(styles.item, styles.small)} key={i}>
                                <input className={styles.checkbox} type="checkbox" checked={e.checked} disabled/>
                                <span className={styles.break}>{e.text}</span>
                            </li>
                        ))}
                    </ul>
                )
        }
    </div>
)


MiniCard.propTypes = {
    note: NoteType.isRequired,
    selected: PropTypes.bool.isRequired,
}