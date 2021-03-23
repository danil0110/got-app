export default class GotService {
    constructor() {
        this._apiBase = 'https://anapioficeandfire.com/api';
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
            name: name ? name : 'no data :(',
            gender: gender ? gender : 'no data :(',
            born: born ? born : 'no data :(',
            died: died ? died : 'no data :(',
            culture: culture ? culture: 'no data :('
        };
    }

    _transformHouse = (house) => {
        const {url, name, region, words, titles, overlord, ancestralWeapons} = house;
        return {
            id: url ? +url.match(/\d+/gm)[0] : null,
            name: name ? name : 'no data :(',
            region: region ? region : 'no data :(',
            words: words ? words : 'no data :(',
            titles: titles ? titles : 'no data :(',
            overlord: overlord ? overlord : 'no data :(',
            ancestralWeapons: ancestralWeapons ? ancestralWeapons : 'no data :('
        };
    }

    _transformBook = (book) => {
        const {url, name, numberOfPages, publisher, released} = book;
        return {
            id: url ? +url.match(/\d+/gm)[0] : null,
            name: name ? name : 'no data :(',
            numberOfPages: numberOfPages ? numberOfPages : 'no data :(',
            publisher: publisher ? publisher : 'no data :(',
            released: released ? released : 'no data :('
        };
    }
}