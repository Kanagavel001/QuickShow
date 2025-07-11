import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//   host: "smtp-relay.brevo.com",
//   port: 587,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });

// const sendEmail = async ({ to, subject, body }) => {
//     const response = await transporter.sendMail({
//         from: process.env.SENDER_EMAIL,
//         to,
//         subject,
//         html: body,
//     })
//     return response;
// }

// export default sendEmail;

const sendEmail = async options => {
    const transport = {
        host : process.env.SMTP_HOST,
        port : process.env.SMTP_PORT,
        auth : {
            user : process.env.SMTP_USER,
            pass : process.env.SMTP_PASS
        }
    };

    const transporter = nodemailer.createTransport(transport);

    const message = {
        from : `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
        to : options.to,
        subject : options.subject,
        html : options.body
    }

    await transporter.sendMail(message);
}

export default sendEmail;