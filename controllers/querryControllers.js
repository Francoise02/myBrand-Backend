
const Queries = require('../models/queries')
const dotenv = require('dotenv')
const nodemailer = require('nodemailer')


dotenv.config();

// create a query
exports.CreateQuery = async (req, res) => {
  // check if message is empty
  if (!req.body.message) {
    return res.status(400).json({
      success: false,
      message: "Missing message",
    });
  }

  try {
    console.log(req.body);
    const query = await Queries.create(req.body);

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "f.mukantwari@alustudent.com", // generated ethereal user
        pass: process.env.MAIL_PASSWORD, // generated ethereal password
      },
    });


    let info = await transporter.sendMail({
      from: `${req.body.name} <f.mukantwari@alustudent.com>`, // sender address
      to: "mukantwarifrancoise2@gmail.com", // list of receivers
      subject: "Contact me", // Subject line
      text: req.body.email, // plain text body
      html: `${req.body.email} <br> ${req.body.name} <br> ${req.body.message}`

    });


    // send mail with defined transport object

    res.status(201).json({ success: true, data: { message: "Thanks for reaching out! I will get back to you soon" } });


  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// delete a query
exports.DeleteQuery = async (req, res) => {
  const id = req.params.id;
  const query = await Queries.findById(id.toString());

  if (!query) {
    return res.status(400).json({
      success: false,
      message: "No query found",
    });
  }

  try {
    await Queries.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      data: {
        message: "Query deleted",
        queryId: req.params.id,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Eror occured",
    });
  }
};

// get all queries
exports.GetAllQueries = async (req, res) => {
  const queries = await Queries.find();
  res.status(200).send(queries);
};

// getting one query
exports.getQueryById = async (req, res) => {
  if (!req.params.id) {
    return res.status(500).json({
      success: false,
      message: "missing query id",
    });
  }

  const id = req.params.id;
  const query = await Queries.findById(id);

  if (!query) {
    return res.status(500).json({
      success: false,
      message: "not found",
    });
  }
  res.status(200).json({
    success: true,
    data: {
      data: query,
    },
  });
};

// search queries
// exports.SearchQueries = async (req, res) => {
//   const queries = await Queries.find({
//     $text: { $search: req.query.q },
//   });
//   res.status(200).json({
//     success: true,
//     data: queries,
//   });
// };

