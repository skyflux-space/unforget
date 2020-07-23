import React from 'react'
import PropTypes from 'prop-types'
import {NoteType} from '../models/note'
import {ValidNote} from '../models/note/types'
import {MiniCard} from './MiniCard'
import Masonry from 'react-masonry-component'
import styles from './List.module.scss'


export type ListProps = {
    notes: ValidNote[]
}

export const List: React.FC<ListProps> = ({notes}) => (
    <Masonry elementType="ul">
        {notes.map(e => (
            <li key={e.id} className={styles.item}>
                <MiniCard note={e} selected={false}/>
            </li>
        ))}
    </Masonry>
)


List.propTypes = {
    notes: PropTypes.arrayOf(NoteType.isRequired).isRequired,
}