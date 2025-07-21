import { Router } from 'express';
import {
  deleteContactController,
  patchContactController,
  postContactController,
  showContactByIdController,
  showContactsController,
} from '../controllers/contactsController.js';
import ctrlWrapper from '../utilts/ctrlWrapper.js';

const router = Router();

router.get('/contacts', ctrlWrapper(showContactsController));

router.get('/contacts/:contactId', ctrlWrapper(showContactByIdController));

// api operat

router.post('/contacts', ctrlWrapper(postContactController));

router.patch('/contacts/:contactId', ctrlWrapper(patchContactController));

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

export default router;
