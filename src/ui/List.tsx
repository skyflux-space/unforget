import React, {Children} from 'react'
import Masonry from 'react-masonry-component'
import styles from './List.module.scss'


export const List: React.FC = ({children}) => (
    <Masonry elementType="ul">
        {Children.map(children, (e, i) => (
            <li key={i} className={styles.item}>
                {e}
            </li>
        ))}
    </Masonry>
)