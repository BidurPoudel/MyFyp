import nodemailer from 'nodemailer'
const { SMTP_MAIL, SMTP_PASSWORD } = process.env;

const sendMail = async (email, mailSubject, content) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: SMTP_MAIL,
        pass: SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: SMTP_MAIL,
      to: email,
      subject: mailSubject,
      html: content,
    };

    await transporter.sendMail(mailOptions);

    return true;

  } catch (error) {
    console.error('Error:', error.message);
    return false;
  }
};

export default sendMail;