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

export const sendPasswordCode = (code, email) => {
  var mailOptions = {
    from: "shafayet@eienmarketing.com",
    to: email,
    subject: "Password Reset Code | Kedemy.com",
    html: `
       <h2> Below is the Password reset code </h2>
       <h4> ${code} </h4>
      `,
  };

  const promise = new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return reject({ ok: false });
      }
      resolve({ ok: true });
    });
  });

  return promise;
};
