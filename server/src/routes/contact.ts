import { Router } from 'express';
import { getContacts, getContactsByClinic, createContact, updateContact, deleteContact } from '../controllers/contacts';
import authMiddleware from '../middleware/auth';

const router = Router();

router.get('/', authMiddleware, getContacts);
router.get('/by-clinic/:clinicId', authMiddleware, getContactsByClinic);
router.post('/', authMiddleware, createContact);
router.put('/:id', authMiddleware, updateContact);
router.delete('/:id', authMiddleware, deleteContact);

export default router;
