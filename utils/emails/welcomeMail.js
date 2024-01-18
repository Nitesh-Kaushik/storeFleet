// Import the necessary modules here
import nodemailer from "nodemailer"


const transporter = nodemailer.createTransport({
  service: process.env.SMPT_SERVICE,
  auth: {
    user: process.env.STORFLEET_SMPT_MAIL,  // Replace with your email
    pass: process.env.STORFLEET_SMPT_MAIL_PASSWORD,        // Replace with your password
  },
});


export const sendWelcomeEmail = async (user) => {
  try {
    const emailTemplatePath = path.join(__dirname, 'welcome-email.pug');

    const info = await transporter.sendMail({
      from:  process.env.STORFLEET_SMPT_MAIL, 
      to: user.email,
      subject: 'Welcome to Storefleet',
      html: pug.renderFile(emailTemplatePath, { username : user.name }),
    });

    console.log('Email sent: ', info.messageId);
  } catch (error) {
    console.error('Error sending email: ', error);
  }
};

