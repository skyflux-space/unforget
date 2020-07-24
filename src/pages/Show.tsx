import React from 'react'


export type ShowProps = {
    id: string
}

export const Show: React.FC<ShowProps> = ({id}) => {
    return <>{id}</>
}