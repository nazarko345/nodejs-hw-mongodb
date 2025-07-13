import { getContactById } from '../services/contacts.js';
import { getAllContacts } from '../services/contacts.js';

export async function showContacts(req, res) {
  const contacts = await getAllContacts();

  if (!contacts) return;

  res.status(200).send({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}

export async function showContactById(req, res) {
  const { contactId } = req.params;

  try {
    const contacts = await getContactById(contactId);

    res.status(200).send({
      status: 200,
      message: 'Successfully found contact!',
      data: contacts,
    });
  } catch (error) {
    res.status(404).send({
      message: "Contact not found!",
      error: error,
    });
  }
}
