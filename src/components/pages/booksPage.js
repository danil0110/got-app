import React from 'react';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import RowBlock from '../rowBlock';
import {withRouter} from 'react-router-dom';

class BooksPage extends React.Component {
    state = {
        error: false
    }

    gotService = new GotService();

    componentDidCatch() {
        this.setState({error: true});
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage />
        }

        return (
            <ItemList
                onItemSelected={(itemId) => {
                    this.props.history.push(`${itemId}`);
                }}
                getData={this.gotService.getAllBooks}
                renderItem={({name}) => name} />
        );
    }
}

export default withRouter(BooksPage);