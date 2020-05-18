import React from 'react'

const Item = props => (
    <li id={props.item.itemId}>
        {/* <ol>
                            {itemsArray.map((item, index) => (
                                <Item key={index} item={item} />
                            ))}
                        </ol> */}
        <div className="item-title">{props.item.itemTitle}</div>
        <div className="item-description">{props.item.itemDescription}</div>
    </li>
)

export default Item