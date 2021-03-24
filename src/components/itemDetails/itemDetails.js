import React, {useState, useEffect} from 'react';
import './itemDetails.css';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {Field};

function ItemDetails({itemId, getData, children}) {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        updateItem();
    }, [itemId]);

    function updateItem() {
        if (!itemId) {
            return;
        }

        setLoading(true);

        getData(itemId)
            .then(item => {
                setItem(item);
                setLoading(false);
            })
            .catch(() => {
                setItem(null);
                setLoading(false);
                setError(true);
            });
    }

    if (error) {
        return <ErrorMessage />;
    }

    if (!itemId) {
        return <span className="select-error">Choose an item</span>;
    }

    const content = loading ? <Spinner /> : <View item={item} children={children} />;

    return (
        <div className="item-details rounded">
            {content}
        </div>
    );
}

const View = ({item, children}) => {
    return (
        <>
            <h4>{item.name}</h4>
            <ul className="list-group list-group-flush">
                {React.Children.map(children, child => {
                    return React.cloneElement(child, {item});
                })}
            </ul>
        </>
    )
}

export default ItemDetails;