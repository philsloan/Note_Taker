const util = require('util');
const fs = require('fs');
const uuidv1 = require('uuid/v1');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    constructor() {
        this.filePath = 'db/db.json';
    }

    read() {
        return readFileAsync(this.filePath, 'utf8');
    }

    write(note) {
        return writeFileAsync(this.filePath, JSON.stringify(note));
    }

    async getNotes() {
        try {
            const notes = await this.read();
            return [].concat(JSON.parse(notes));
        } catch (err) {
            return [];
        }
    }

    async addNote({ title, text }) {
        if (!title || !text) {
            throw new Error('Title and text cannot be blank!');
        }

        const newNote = { title, text, id: uuidv1() };
        const updatedNotes = await this.getNotes().then((notes) => [...notes, newNote]);
        await this.write(updatedNotes);

        return newNote;
    }

    async removeNote(id) {
        const filteredNotes = await this.getNotes().then((notes) => notes.filter((note) => note.id !== id));
        await this.write(filteredNotes);
    }
}

module.exports = new Store();
