import { Router } from 'express';
import { getContacts, getContactsByClinic, createContact, updateContact, deleteContact, createContactClinic, updateContactClinic, deleteContactClinic, getContactById, getContactClinics } from '../controllers/contacts';
import authMiddleware from '../middleware/auth';

const router = Router();

router.get('/', authMiddleware, getContacts);
router.get('/:id', authMiddleware, getContactById);
router.get('/by-clinic/:clinicId', authMiddleware, getContactsByClinic);
router.post('/', authMiddleware, createContact);
router.put('/:id', authMiddleware, updateContact);
router.delete('/:id', authMiddleware, deleteContact);

router.get('/:id/clinics', authMiddleware, getContactClinics);
router.post('/:id/clinics', authMiddleware, createContactClinic);
router.put('/:id/clinics/:clinicId', authMiddleware, updateContactClinic);
router.delete('/:id/clinics/:clinicId', authMiddleware, deleteContactClinic);

export default router;
