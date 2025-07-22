import createHttpError from 'http-errors';
import {
  getContactById,
  getAllContacts,
  createContact,
  patchContact,
  deleteContact,
} from '../services/contacts.js';

export async function showContactsController(req, res) {
  const contacts = await getAllContacts();

  if (!contacts || contacts.length === 0) {
    return res.status(404).json({
      status: 404,
      message: 'No contacts found!',
    });
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}

export async function showContactByIdController(req, res) {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);

  if (!contact) {
    throw new createHttpError.NotFound('Student not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully found contact!',
    data: contact,
  });
}

// api operat

export async function postContactController(req, res, next) {
  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
}

export async function patchContactController(req, res, next) {
  const { contactId } = req.params;
  const contact = await patchContact(contactId, req.body);

  if (!contact) {
    throw new createHttpError.NotFound('Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact,
  });
}

export async function deleteContactController(req, res, next) {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId);

  if (!contact) {
    throw new createHttpError.NotFound('Contact not found!');
  }

  res.status(204).send();
}
