import { MailSender } from "../mail/MailSender";

export default function test(): void {
    const html = `
    <p>これはテストメールです</p>
    <p>改行しました</p>
    <p><img src="cid:unique.cid"></p>
    `;
    const attachments = [
        {
            filename: 'image.jpg',
            path: 'https://firebasestorage.googleapis.com/v0/b/boshu-prod.appspot.com/o/nobunaga_shutsujin_tea%2Fposted%2Fimage%2FdS%2FdSP7PQefVtnsWsYWrwV4.jpg?alt=media',
            cid: 'unique.cid'
        }
    ];
    MailSender.sendHTMLMail('kairi.hoshino2@gmail.com', 'test html mail', html, attachments);
}