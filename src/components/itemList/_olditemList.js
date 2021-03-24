import React, {Component} from 'react';
import './itemList.css';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

export default class ItemList extends Component {
    state = {
        itemList: null,
        error: false
    }

    componentDidMount() {
        const {getData} = this.props;

        getData()
            .then(itemList => {
                this.setState({itemList});
            });
    }

    componentDidCatch() {
        this.setState({
            itemList: null,
            error: true
        });
    }

    renderItems = array => {
        const {renderItem} = this.props;

        return array.map(item => {
            const id = item.id;
            const label = renderItem(item);
            return (
                <li
                    key={id}
                    className="list-group-item"
                    onClick={() => this.props.onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }

    render() {
        const {itemList} = this.state;

        if (this.state.error) {
            return <ErrorMessage />;
        }
        
        const content = itemList ? this.renderItems(itemList) : <Spinner />;

        return (
            <ul className="item-list list-group">
                {content}
            </ul>
        );
    }
}