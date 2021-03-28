export default class GotService {
    constructor() {
        this._apiBase = 'https://anapioficeandfire.com/api';
        this.emptyMsg = 'no data :(';
    }

    getResource = async (url) => {
        const response = await fetch(`${this._apiBase}${url}`);

        if (!response.ok) {
            throw new Error(`Couldn't fetch ${this._apiBase}${url}. Status: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource('/characters?page=5&pageSize=10');
        return res.map(this._transformChar);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`/characters/${id}`);
        return this._transformChar(res);
    }

    getAllBooks = async () => {
        const res = await this.getResource('/books');
        return res.map(this._transformBook);
    }

    getBook = async (id) => {
        const res = await this.getResource(`/books/${id}`);
        return this._transformBook(res);
    }
    
    getAllHouses = async () => {
        const res = await this.getResource('/houses');
        return res.map(this._transformHouse);
    }
    
    getHouse = async (id) => {
        const res = await this.getResource(`/houses/${id}`);
        return this._transformHouse(res);
    }

    _transformChar = (char) => {
        const {url, name, gender, born, died, culture} = char;
        return {
            id: url ? +url.match(/\d+/gm)[0] : null,
            name: name ? name : this.emptyMsg,
            gender: gender ? gender : this.emptyMsg,
            born: born ? born : this.emptyMsg,
            died: died ? died : this.emptyMsg,
            culture: culture ? culture: this.emptyMsg
        };
    }

    _transformHouse = (house) => {
        const {url, name, region, words, titles, overlord, ancestralWeapons} = house;
        return {
            id: url ? +url.match(/\d+/gm)[0] : null,
            name: name ? name : this.emptyMsg,
            region: region ? region : this.emptyMsg,
            words: words ? words : this.emptyMsg,
            titles: titles ? titles : this.emptyMsg,
            overlord: overlord ? overlord : this.emptyMsg,
            ancestralWeapons: ancestralWeapons ? ancestralWeapons : this.emptyMsg
        };
    }

    _transformBook = (book) => {
        const {url, name, numberOfPages, publisher, released} = book;
        return {
            id: url ? +url.match(/\d+/gm)[0] : null,
            name: name ? name : this.emptyMsg,
            numberOfPages: numberOfPages ? numberOfPages : this.emptyMsg,
            publisher: publisher ? publisher : this.emptyMsg,
            released: released ? released : this.emptyMsg
        };
    }
}