import createHttpError from 'http-errors';
import {
  getContactById,
  getAllContacts,
  createContact,
  patchContact,
  deleteContact,
} from '../services/contacts.js';

export async function showContactsController(req, res) {
  try {
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
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Server error while fetching contacts',
      error: error.message,
    });
  }
}

export async function showContactByIdController(req, res) {
  const { contactId } = req.params;

  try {
    const contact = await getContactById(contactId);

    if (!contact) {
      return res.status(404).json({
        status: 404,
        message: 'Contact not found!',
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully found contact!',
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Server error while retrieving contact',
      error: error.message,
    });
  }
}

// api operat

export async function postContactController(req, res, next) {
  const contacts = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contacts,
  });
}

export async function patchContactController(req, res, next) {
  const { contactId } = req.params;
  const contact = await patchContact(contactId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
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
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
}
