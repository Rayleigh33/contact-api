const express = require("express");
const {getAllContacts,getSingleContact, createContact, updateContact, deleteContact} = require("../controllers/contactController");
const validaionCheck = require("../middleware/validateTokenHandler");


const router = express.Router();

router.use(validaionCheck); //when all the routes need the validation check then this is the shortcut to use in all of them in one go

router.route("/").get(getAllContacts).post(createContact);

router.route("/:id").get(getSingleContact).put(updateContact).delete(deleteContact);

module.exports = router;