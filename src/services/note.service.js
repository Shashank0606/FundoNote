import id from '@hapi/joi/lib/base';
import Note from '../models/notes.model';


// create note
export const createNote = async (body) => {
    try {
        const note = await Note.create(body);
        return note;
    }
    catch (err) {
        throw new Error(err)
    }
};

// Update note
export const updateNote = async (_id, body) => {
    try {
        const data = await Note.findByIdAndUpdate(
            { _id, userId: body.userId },
            body,
            { new: true }

        );
        return data;
    }
    catch (err) {
        throw new Error(err)
    }
};


// Get all Note
export const getAll = async (userId) => {
    try {

        // console.log("test", userId);
        // const data = await Note.find();
        const data = await Note.find({ userId: userId, trash: false, archive: false });
        return data
    }
    catch (err) {
        throw new Error(err)
    }
};


// get note by id
export const getById = async (_id, userId) => {
    try {
        const data = await Note.findById({ _id, trash: false, archive: false, userId: userId });
        return data;
    } catch (err) {
        throw new Error(err)
    }
};

// delete note
export const deleteNote = async (_id, userId) => {
    try {
        await Note.findByIdAndDelete({ _id, trash: false, archive: false, userId: userId });
        return "";
    } catch (err) {
        throw new Error(err)
    }
};

// Send note to trash
export const sendToTrash = async (_id, userId) => {
    try {
        const data = await Note.findByIdAndUpdate({ _id, userId: userId }, { trash: true });
        return data;
    } catch (err) {
        throw new Error(err)
    }
};

// Recover from trash
export const recoverFromTrash = async (_id, userId) => {
    try {
        const data = await Note.findByIdAndUpdate({ _id, userId: userId }, { trash: false });
        return data;
    } catch (err) {
        throw new Error(err)
    }
};