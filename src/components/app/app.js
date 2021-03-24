import React from 'react';
import {Col, Row, Container} from 'reactstrap';
import './app.css';
import Header from '../header';
import RandomChar from '../randomChar';
import BlockToggler from '../blockToggler';
import {CharactersPage, HousesPage, BooksPage, BooksItem} from '../pages';
import GotService from '../../services/gotService';
import {BrowserRouter as Router, Route} from 'react-router-dom';

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
        return (
            <Router>
                <div className="app"> 
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Route path="/characters" render={() => (
                            <Row>
                                <Col lg={{size: 5, offset: 0}}>
                                    <RandomChar />
                                </Col>
                            </Row>
                        )} />
                        <Route path="/characters" component={CharactersPage} />
                        <Route path="/houses" component={HousesPage} />
                        <Route path="/books" exact component={BooksPage} />
                        <Route path="/books/:id" render={
                            ({match}) => {
                                const {id} = match.params;
                                return <BooksItem bookId={id} />
                            }
                        } />
                    </Container>
                </div>
            </Router>
        );
    }
};