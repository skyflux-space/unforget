import React from 'react'
import PropTypes from 'prop-types'
import {NoteType} from '../models/note'
import {MiniCard} from './MiniCard'
import styles from './List.module.scss'


export const List = ({notes}) => (
    <ul className={styles.list}>{
        notes.map(e => <li key={e.id}><MiniCard note={e}/></li>)
    }</ul>
)


List.propTypes = {
    notes: PropTypes.arrayOf(NoteType).isRequired,
}