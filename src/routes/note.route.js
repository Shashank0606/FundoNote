import express from 'express';
import * as noteController from '../controllers/note.controller';
import { newNoteValidator } from '../validators/note.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();


//create a new note
router.post('', newNoteValidator, userAuth, noteController.createNote);

// update a note by its id
router.put('/:_id', userAuth, noteController.updateNote);

// get all notes
router.get('', userAuth, noteController.getAll);

// get a note by id
router.get('/:_id', userAuth, noteController.getById);

// delete note by
router.delete('/:_id', userAuth, noteController.DeleteNote);


export default router;