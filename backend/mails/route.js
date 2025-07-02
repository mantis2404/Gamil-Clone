import express from "express";
import { createMail, getMails, starMail, deleteMail, markAsRead, getStarredMails,getByCategory} from "./controller.js";

const router = express.Router();

// Route to create a new mail
router.post("/create", createMail);

// Route to get all mails
router.get("/getAll", getMails);

// Route to delete a mail by ID
router.delete("/delete/:id", deleteMail);

// Route to mark a mail as starred
router.put("/star/:id/:starred", starMail);

// Route to marka a mail as read
router.put("/read/:id", markAsRead);

// Route to get starred mails
router.get("/getStarred", getStarredMails);

// Route to get mails by category
router.get("/getByCategory/:type",getByCategory)

export default router;
