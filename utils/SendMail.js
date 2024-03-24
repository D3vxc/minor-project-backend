const nodemailer = require("nodemailer");

const sendMail = async (email, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: "devmistry932@gmail.com",
      pass: "wsskktwmqumghfce",
    },
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};
module.exports = sendMail;
