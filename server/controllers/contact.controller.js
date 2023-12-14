import { Contact } from "../models/contact.model.js"
import { User } from "../models/user.model.js";
import { errorHandler } from "../utils/errorHandler.js";


export const createContact = async (req, res, next)=>{
   try {
    const {userId} = req.body.user;
    const {name, avatar, companyName, email, phone, position, groupId} = req.body;
    if(!name){
        return next(new errorHandler("Name is required", 400));
    }
    const contact = await Contact.create({name,avatar,companyName,email,phone,position, groupId, userId })
    res.status(201).json({
     success: true,
     message: "New contact created successfully",
     data: contact
    })
   } catch (error) {
        console.log(error);
        res.status(404).json({message: error.message });
   }
}

export const getContacts = async (req, res, next)=>{
    try {
        const {userId} = req.body.user;
        // const user = await User.findById(userId);
        const contacts = await Contact.find({userId:userId});
        
        res.status(200).json({
            success: true,
            message: "contacts fetched successfully",
            data: contacts ? contacts : "No contacts found"
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({message: error.message });
    }
}
//get contact by id
export const getContact = async (req, res)=>{
    try {
        const {id} = req.params;
        const contact = await Contact.findById(id);
        res.status(200).json({
            success: true,
            message: "contact fetched successfully",
            data: contact
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({message: error.message });
    }
}

export const updateContact = async(req, res)=>{
    try {
        const {id} = req.params;
        const {name, avatar, companyName, email, phone, position, groupId} = req.body;
        if(!name){
            return next(new errorHandler("Name is required", 400));
        }
        const updatedContact = {
            name, avatar, companyName, email, phone, position, groupId
        }
        const user = await Contact.findByIdAndUpdate(id, updatedContact, {new:true});
    
        res.status(200).json({
            success: true,
            message: "contact updated successfully.",
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message
        })
    }
}

export const deleteContact = async(req, res)=>{
    try {
        const {id} = req.params;
        await Contact.findByIdAndDelete(id);
        
        res.status(200).json({
            success: true,
            message: "Deleted successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: error.message
        })
    }
}
