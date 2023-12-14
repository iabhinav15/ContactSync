import express from 'express';
import { createContact, deleteContact, getContact, getContacts, updateContact } from '../controllers/contact.controller.js';
import { userAuth } from '../middlewares/authMIddleware.js';
const router = express.Router();

router.post("/create-contact", userAuth, createContact);
router.post("/get-contacts", userAuth, getContacts);
router.post("/get-contact/:id", userAuth, getContact);
router.put("/update-contact/:id", userAuth, updateContact);
router.delete("/delete-contact/:id", userAuth, deleteContact);

export default router