import React, {Component} from 'react';
import './itemDetails.css';
import GotService from '../../services/gotService';
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

export default class ItemDetails extends Component {
    gotService = new GotService();

    state = {
        item: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    updateItem() {
        const {itemId} = this.props;

        if (!itemId) {
            return;
        }

        this.setState({
            loading: true
        })

        const {getData} = this.props;

        getData(itemId)
            .then(item => this.setState({
                item: item,
                loading: false
            }))
            .catch(() => this.setState({
                item: null,
                loading: false,
                error: true
            }))
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage />;
        }

        const {item} = this.state;
        const content = this.state.loading ? <Spinner /> : <View item={item} children={this.props.children} />;

        return (
            <div className="item-details rounded">
                {content}
            </div>
        );
    }
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