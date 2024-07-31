import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PASS,
  },
});
type transporterType = typeof transporter;

export const sendOTPToUser = async (
  transporter: transporterType,
  sendTo: string,
  OTP: string,
  purposeMessage: string,
  message: string
) => {
  try {
    await transporter.sendMail({
      from: {
        name: "Erlang Ecommerce",
        address: process.env.SENDER_EMAIL || "",
      },
      to: sendTo,
      subject: "OTP for verification",
      text: "This is your OTP",
      html: `<h2>${purposeMessage} ${OTP}</h2>
                </br>
                <p>${message} </p>`,
    });
    console.log("email sent");
  } catch (error) {
    console.error(error);
  }
};
