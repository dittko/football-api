const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendActivationEmail = (email, token) => {
  const link = `${process.env.BASE_URL}/api/auth/activate/${token}`;
  return transporter.sendMail({
    from: `"Football App" <no-reply@footballapp.dev>`,
    to: email,
    subject: 'Aktywacja konta',
    html: `<p>Kliknij, aby aktywować konto:</p><a href="${link}">${link}</a>`
  });
};

const sendResetPasswordEmail = (email, token) => {
  const link = `${process.env.BASE_URL}/new-password.html?token=${token}`;
  return transporter.sendMail({
    from: `"Football App" <no-reply@footballapp.dev>`,
    to: email,
    subject: 'Reset hasła',
    html: `<p>Kliknij, aby ustawić nowe hasło:</p><a href="${link}">${link}</a>`
  });
};

module.exports = { sendActivationEmail, sendResetPasswordEmail };