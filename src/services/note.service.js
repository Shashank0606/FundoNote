import id from '@hapi/joi/lib/base';
import Note from '../models/notes.model';


// create note
export const createNote = async (body) => {
    const note = await Note.create(body);
    return note;
}

// Update note
export const updateNote = async (_id, body) => {
    const data = await Note.findByIdAndUpdate(
        {
            _id
        },
        body,
        {
            new: true
        }
    );
    return data;
};

// Get all Note
export const getAll = async () => {
    const data = await Note.find();
    return data
};


// get note by id
export const getById = async (_id) => {
    const data = await Note.findById(_id);
    return data;
};

// delete note
export const deleteNote = async (id) => {
    await Note.findByIdAndDelete(id);
    return "";
};