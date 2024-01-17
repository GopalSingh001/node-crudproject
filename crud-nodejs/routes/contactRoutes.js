import express from "express";
import { createContact, deleteContact, getAllContacts, getContact, updateContact } from "../controllers/contactController.js";
import validateToken from "../middlewares/validateTokenHandler.js";
 

const contactRouter =express.Router();

contactRouter.use(validateToken);

contactRouter.route("/").get(getAllContacts)

contactRouter.route("/").post(createContact)

contactRouter.route("/:id").get(getContact)

contactRouter.route("/:id").put(updateContact)

contactRouter.route("/:id").delete(deleteContact)

export default contactRouter;