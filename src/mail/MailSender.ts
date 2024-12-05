import nodemailer from 'nodemailer';

export class MailSender {
    private static EMAIL: string = '';
    private static PASSWORD: string = '';

    public static async sendMail(to: string, subject: string, text: string): Promise<boolean> {
        if (process.env.mail === 'false') return false;
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: this.EMAIL,
                pass: this.PASSWORD
            }
        });

        const mailOptions = {
            from: this.EMAIL,
            to: to,
            subject: subject,
            text: text
        };

        transporter.sendMail(mailOptions, (e, info) => {
            if (e) {
                console.error(e);
                return false;
            } else {
                console.log(info.response);
            }
        });

        return true;
    }

    public static async sendHTMLMail(to: string, subject: string, html: string, attachments: { filename: string, path: string, cid: string }[]): Promise<boolean> {
        if (process.env.mail === 'false') return false;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: this.EMAIL,
                pass: this.PASSWORD
            }
        });

        const mailOptions = {
            from: this.EMAIL,
            to: to,
            subject: subject,
            html: html,
            attachments: attachments
        };

        transporter.sendMail(mailOptions, (e, info) => {
            if (e) {
                console.error(e);
                return false;
            } else {
                console.log(info.response);
            }
        });

        return true;
    }

    public static setAccount(email: string, password: string): void {
        this.EMAIL = email;
        this.PASSWORD = password;
    }
};