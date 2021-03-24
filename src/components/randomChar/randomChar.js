import React, {useState, useEffect} from 'react';
import './randomChar.css';
import Spinner from '../spinner';
import BlockToggler from '../blockToggler';
import GotService from '../../services/gotService';
import ErrorMessage from '../errorMessage';

function RandomChar() {
    const gotService = new GotService();

    const [char, setChar] = useState({});
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        updateChar();
        let timerId = setInterval(updateChar, 1500);

        return () => {
            clearInterval(timerId);
        }
    }, []);

    function onCharLoaded(char) {
        setChar(char);
        setLoading(false);
    }

    function onError() {
        setError(true);
        setLoading(false);
    }

    function updateChar() {
        const id = Math.floor(Math.random() * 140 + 25); // 25 - 140
        gotService.getCharacter(id)
            .then(onCharLoaded)
            .catch(onError);
    }

    function onToggle() {
        setVisible(!visible);
    }


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
                onToggle={onToggle} />
        </>
    );
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

export default RandomChar;