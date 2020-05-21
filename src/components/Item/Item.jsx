import React from 'react'

const Item = props => {
    return (
        <li id={props.item.id}>
            <div className="item-title">{props.item.title}</div>
            <div className="item-description">{props.item.description}</div>
        </li>
    )
}

export default Item