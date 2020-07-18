import React from 'react'
import {NoteType} from '../models/note'
import {MiniCard} from './MiniCard'
import styles from './List.module.scss'


export const List = ({notes}) => (
    <ul className={styles.list}>{
        notes.map(e => <li key={e.id}><MiniCard note={e}/></li>)
    }</ul>
)


List.propTypes = {
    notes: NoteType.isRequired,
}