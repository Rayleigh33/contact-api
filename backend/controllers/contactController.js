const asyncHandler = require("express-async-handler"); //asyncHandler will automatically send the error to errorhandler without requiring try-catch block
const Contact = require("../models/contactModel");

// get all contacts
const getAllContacts =asyncHandler (async (req,res)=>{
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
});

//get single contact
const getSingleContact = asyncHandler( async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }
    res.status(200).json(contact);
});

//create contact

const createContact =  asyncHandler( async (req,res) => {
    console.log("request body is: ",req.body);
    const {name,phoneNo,email} = req.body;
    if(!name || !phoneNo || !email){
        res.status(400);
        throw new Error("ALL fileds are mandatory!");
    }
    const contact = await Contact.create({
        name,
        email,
        phoneNo,
        user_id: req.user.id
    });
    res.status(201).json(contact);
});

//update contact
const updateContact =  asyncHandler( async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("user don't have permission to update other user contacts");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updatedContact);
});

//delete contact
const deleteContact = asyncHandler(  async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("user don't have permission to delete other user contacts");
    }

    await Contact.deleteOne({_id: req.params.id});
    res.status(200).json(contact);
});

module.exports = {getAllContacts,getSingleContact,createContact,updateContact,deleteContact};