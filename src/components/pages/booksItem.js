import React from 'react';
import ItemDetails, {Field} from '../itemDetails';
import GotService from '../../services/gotService';

export default class BooksItem extends React.Component {
    state = {
        selectedItem: 3
    }

    gotService = new GotService();

    render() {
        return (
            <ItemDetails itemId={this.state.selectedItem} getData={this.gotService.getBook}>
                <Field field="numberOfPages" label="Number Of Pages" />
                <Field field="publisher" label="Publisher" />
                <Field field="released" label="Released" />
            </ItemDetails>
        )
    }
}