import { Router } from 'express';
import {
  deleteContactController,
  patchContactController,
  postContactController,
} from '../controllers/contactsController.js';
import ctrlWrapper from '../utilts/ctrlWrapper.js';

const router = Router();

router.post('/contacts', ctrlWrapper(postContactController));

router.patch('/contacts/:contactId', ctrlWrapper(patchContactController));

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

export default router;
