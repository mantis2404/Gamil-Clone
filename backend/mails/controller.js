import MailSchema from "./model.js";

export const createMail = async (req, res) => {
  const { sender, reciever, type, subject, body, status, starred, createdAt } = req.body;
  try {
    const mail = new MailSchema({
      sender,
      reciever,
      type,
      subject,
      body,
      status,
      starred,
      createdAt
    });
    mail.save();
    res.status(201).json(mail);
  } catch (error) {
    res.status(500).json({ message: "Error creating mail", error });
  }
};

export const getMails = async (req, res) => {
  try {
    const mails = await MailSchema.find().sort({ createdAt: -1 });
    res.status(200).json(mails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMail = async (req, res) => {
  const{ id }= req.params;
  try {
    // Find the mail by ID and delete it
    const deleted_mail=await MailSchema.findByIdAndDelete(id);
    res.status(200).json(deleted_mail);
  } catch (error) {
    res.status(500).json({ message: "Error deleting mail", error });
  }
};

export const starMail = async (req, res) => {
  const { id,starred} = req.params;
  const starred_status=(starred ==='true');
  try {
    // Find the mail by ID and mark it as starred
    if(starred_status){
      const updated =await MailSchema.findByIdAndUpdate(id, { starred: false },{new:true});
      res.status(200).json(updated);
    }
    else{
      const updated =await MailSchema.findByIdAndUpdate(id, { starred: true },{new:true});
      res.status(200).json(updated);
    }
  } catch (error) {
    res.status(500).json({ message: "Error starring mail", error });
  }
};

export const getStarredMails = async (req, res) => {
  try {
    // Find mail by their starred status
    const starredMails = await MailSchema.find({ starred: true }).sort({ createdAt: -1 });
    res.status(200).json(starredMails);
  } catch (error) {
    res.status(500).json({ message: "Error fetching starred mails", error });
  }
}

export const markAsRead = async (req, res) => {
  const { id,status } = req.params;
  try {
    // Find the mail by ID and mark it as read
    const read =await MailSchema.findByIdAndUpdate(id, { status: "seen" },{new:true});
    res.status(200).json(read);
  } catch (error) {
    res.status(500).json({ message: "Error marking mail as read", error });
  }
};

export const getByCategory =async (req,res) => {
  const {type}=req.params;
  try{
    // Find mail by their category type
    if(type==="primary"){
      const categoryMail= await MailSchema.find().sort({createdAt : -1});
      res.status(200).json(categoryMail);
    }
    else{
      const categoryMail= await MailSchema.find({type: type}).sort({createdAt : -1});
      res.status(200).json(categoryMail);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching mails by this category", error });
  }
}
