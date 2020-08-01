import React, {Children} from 'react'
import c from 'classnames'
import Masonry from 'react-masonry-component'
import styles from './List.module.scss'


export type ListProps = {
    pinned?: boolean
}

export const List: React.FC<ListProps> = ({children, pinned}) => (
    <Masonry elementType="ul" className={c(styles.list, pinned && styles.pinned)}>
        {Children.map(children, (e, i) => (
            <li key={i} className={styles.item}>
                {e}
            </li>
        ))}
    </Masonry>
)