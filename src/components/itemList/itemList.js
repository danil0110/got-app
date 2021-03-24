import React, {useState, useEffect} from 'react';
import './itemList.css';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

function ItemList({renderItem, getData, onItemSelected}) {
    const [itemList, setItemList] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        getData()
            .then(itemList => setItemList(itemList));
    });

    function renderItems(array) {
        return array.map(item => {
            const id = item.id;
            const label = renderItem(item);
            return (
                <li
                    key={id}
                    className="list-group-item"
                    onClick={() => onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }

    if (error) {
        return <ErrorMessage />;
    }
    
    const content = itemList ? renderItems(itemList) : <Spinner />;

    return (
        <ul className="item-list list-group">
            {content}
        </ul>
    );
}

export default ItemList;