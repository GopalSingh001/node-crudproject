import expressAsyncHandler from "express-async-handler";
import { contactModel } from "../models/contactModel.js";
// get All Contacts...
export const getAllContacts = expressAsyncHandler(async (req, res) => {
    console.log("This is Body Data:", req.body);
    const contacts = await contactModel.find({user_id:req.user.id});
    res.status(200).json(contacts)
})


// create Contact....
export const createContact = expressAsyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    console.log("gopi", name, email, phone);
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory..")
    }

    const contact = await contactModel.create({
        name,
        email,
        phone,
        user_id:req.user.id
    })
    res.status(201).json(contact)
})


//  update contact..
export const updateContact = expressAsyncHandler(async (req, res) => {
    const contact= await contactModel.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found..");

    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update other user contacts.")
    }
    const updatedContact=await contactModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json(updatedContact);
})


// delete contact..
export const deleteContact = expressAsyncHandler(async (req, res) => {
    const contact =await contactModel.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found..")
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update other user contacts.")
    }
    const deletedContact=await contactModel.deleteOne({_id:req.params.id});
    res.status(200).json(deletedContact)
})


//  get contact..
export const getContact = expressAsyncHandler(async (req, res) => {
    const contact= await contactModel.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact)
})

