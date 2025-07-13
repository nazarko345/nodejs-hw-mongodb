import { getContactById, getAllContacts } from '../services/contacts.js';

export async function showContacts(req, res) {
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

export async function showContactById(req, res) {
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
