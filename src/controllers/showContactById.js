import { getContactById } from '../services/contacts.js';

export async function showContactById(req, res) {
    const { contactId } = req.params;

  const contacts = await getContactById(contactId);

  res
    .status(200)
    .set('Content-Type', 'application/json')
    .send(
      JSON.stringify(
        {
          status: 200,
          message: 'Successfully found contact!',
          data: contacts,
        },
        null,
        2,
      ),
    );
}
