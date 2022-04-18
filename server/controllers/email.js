var nodemailer = require("nodemailer");

const pass = process.env.SMTP_PASS;

var transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_FROM,
    pass: `${pass}#8Up*qfR`,
  },
});

export const sendPasswordCode = (req, res) => {
  const { email } = req.body;

  if (!email) res.status(400).send("Please Enter an Email");

  var mailOptions = {
    from: "shafayet@eienmarketing.com",
    to: email,
    subject: "Password Reset Code | Kedemy.com",
    html: `
     <h2> Below is the Password reset code </h2>
     <h4> DW56AD </h4>
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error.message);
      res.status(400).send("Something Went Wrong! Please Try Again");
    } else {
      console.log("Email sent: " + info.response);
      res.json({
        ok: true,
      });
    }
  });
};
