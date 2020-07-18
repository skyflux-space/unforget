import React from 'react'
import PropTypes from 'prop-types'
import {NoteType} from '../models/note'
import {MiniCard} from './MiniCard'
import Masonry from 'react-masonry-component'
import styles from './List.module.scss'


export const List = ({notes}) => (
    <Masonry elementType="ul" className={styles.list}>
        {notes.map(e => (
            <li key={e.id} className={styles.item}>
                <MiniCard note={e}/>
            </li>
        ))}
    </Masonry>
)


List.propTypes = {
    notes: PropTypes.arrayOf(NoteType).isRequired,
}