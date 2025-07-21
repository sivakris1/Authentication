import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: "gmail", 
     auth: {
        user: "sivapalaparthi003@gmail.com", // Your email
        pass: 'ddkm esiq xxft siux' , 
    },
    tls: {
        rejectUnauthorized: false, // Disable strict SSL checking
    },
});

export default transporter;

