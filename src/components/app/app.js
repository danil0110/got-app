import React from 'react';
import {Col, Row, Container} from 'reactstrap';
import './app.css';
import Header from '../header';
import RandomChar from '../randomChar';
import {HomePage, CharactersPage, HousesPage, BooksPage, BooksItem, NotFound} from '../pages';
import GotService from '../../services/gotService';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

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
                        <Route exact path="/characters" render={() => {
                            return (
                                <Row>
                                    <Col lg={{size: 5, offset: 0}}>
                                        <RandomChar />
                                    </Col>
                                </Row>
                            );
                        }} />
                        <Switch>
                            <Route path="/" exact component={HomePage} />
                            {/* <Route path="/characters" render={() => (
                                
                            )} /> */}
                            <Route path="/characters" component={CharactersPage} />
                            <Route path="/houses" component={HousesPage} />
                            <Route path="/books" exact component={BooksPage} />
                            <Route path="/books/:id" render={
                                ({match}) => {
                                    const {id} = match.params;
                                    return <BooksItem bookId={id} />
                                }
                            } />
                            <Route component={NotFound} />
                        </Switch>
                    </Container>
                </div>
            </Router>
        );
    }
};