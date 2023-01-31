import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/note.service';
import jwt from 'jsonwebtoken';


// Create Note
export const createNote = async (req, res, next) => {
    try {
        const data = await NoteService.createNote(req.body);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'Note created successfully'
        });
    } catch (error) {
        next(error);
    }
};

// Update Note
export const updateNote = async (req, res, next) => {
    try {
        const data = await NoteService.updateNote(req.params._id, req.body);
        res.status(HttpStatus.ACCEPTED).json({
            code: HttpStatus.ACCEPTED,
            data: data,
            message: 'Note updated successfully'
        });
    } catch (error) {
        next(error);
    }
};

// Get all Notes
export const getAll = async (req, res, next) => {
    try {
        const data = await NoteService.getAll(req.body.userId);
        res.status(HttpStatus.ACCEPTED).json({
            code: HttpStatus.ACCEPTED,
            data: data,
            message: "OK"
        })
    } catch (error) {
        next(error)
    }
};


// Get Note by id
export const getById = async (req, res, next) => {
    try {
        const data = await NoteService.getById(req.params._id, req.body.userId);
        res.status(HttpStatus.ACCEPTED).json({
            code: HttpStatus.ACCEPTED,
            data: data,
            message: 'OK'
        });
    } catch (error) {
        next(error);
    }
};

// Delete Note
export const DeleteNote = async (req, res, next) => {
    try {
        await NoteService.deleteNote(req.params._id);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: [],
            message: 'Note deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

export const trash = async (req, res, next) => {
    try {
        const data = await NoteService.sendToTrash(req.params._id, req.body.userId);
        res.status(HttpStatus.ACCEPTED).json({
            code: HttpStatus.ACCEPTED,
            data: data,
            message: 'OK'
        });
    } catch (error) {
        next(error);
    }
};

export const recovertrash = async (req, res, next) => {
    try {
        const data = await NoteService.recoverFromTrash(req.params._id, req.body.userId);
        res.status(HttpStatus.ACCEPTED).json({
            code: HttpStatus.ACCEPTED,
            data: data,
            message: 'OK'
        });
    } catch (error) {
        next(error);
    }
};

