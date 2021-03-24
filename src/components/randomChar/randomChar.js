import React, {Component} from 'react';
import './randomChar.css';
import Spinner from '../spinner';
import BlockToggler from '../blockToggler';
import GotService from '../../services/gotService';
import ErrorMessage from '../errorMessage';

export default class RandomChar extends Component {
    componentDidMount() {
        this.updateChar();
        this.timerId = setInterval(this.updateChar, 1500);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    gotService = new GotService();
    state = {
        char: {},
        loading: true,
        visible: true,
        error: false
    }

    onCharLoaded = char => {
        this.setState({
            char,
            loading: false
        });
    }

    onError = err => {
        this.setState({
            error: true,
            loading: false
        });
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * 140 + 25); // 25 - 140
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    onToggle = () => {
        this.setState(({visible}) => ({
            visible: !visible
        }));
    }

    render() {
        const { char, loading, visible, error } = this.state;

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? <View char={char} /> : null;
        const block = visible ? (
            <div className="random-block rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        ) : null;

        return (
            <>
                {block}
                <BlockToggler
                    text="Toggle Random Character"
                    onToggle={this.onToggle} />
            </>
        );
    }
}

const View = ({char}) => {
    const {name, gender, born, died, culture} = char;
    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender</span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born</span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died</span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture</span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    );
}