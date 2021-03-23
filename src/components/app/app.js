import React from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import BlockToggler from '../blockToggler';
import CharactersPage from '../pages/charactersPage';
import GotService from '../../services/gotService';
import HousesPage from '../pages/housesPage';
import BooksPage from '../pages/booksPage';

export default class App extends React.Component {
    state = {
        randomCharVisible: true
    }

    gotService = new GotService();

    onToggle = () => {
        this.setState(({randomCharVisible}) => ({
            randomCharVisible: !randomCharVisible
        }));
    }
    
    render() {
        const randomChar = this.state.randomCharVisible ? <RandomChar /> : null;

        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {randomChar}
                            <BlockToggler
                                text={'Toggle Random Character'}
                                onToggle={this.onToggle} />
                        </Col>
                    </Row>
                    <CharactersPage />
                    <HousesPage />
                    <BooksPage />
                </Container>
            </>
        );
    }
};