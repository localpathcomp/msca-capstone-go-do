import React from 'react'

const Item = props => (
    <li id={props.index}>
        <div>{props.item.id}</div>
        <div>{props.item.name}</div>
    </li>
)

export default Item