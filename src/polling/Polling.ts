import DataType from "../interfaces/DataType";
import { MailSender } from "../mail/MailSender";
import NotifyUser from "../model/NotifyUser";
import Utils from "../utils/Utils";

let currentTimestamp: number = 0;

async function processData(data: DataType): Promise<void> {
    const notifyUsers = await NotifyUser.find();

    for (const user of notifyUsers) {
        user.notifyBushos.map(busho => {
            if (data.hits.hits[0]._source.formKeyValues.bushoumei === busho) {
                user.notifyPrefectures.map(prefecture => {
                    if (data.hits.hits[0]._source.formKeyValues.todoufuken === prefecture) {
                        //MailSender.sendMail(user.email, `${data.hits.hits[0]._source.formKeyValues.bushoumei} - ${data.hits.hits[0]._source.formKeyValues.todoufuken}`, `武将: ${data.hits.hits[0]._source.formKeyValues.bushoumei} \n都道府県: ${data.hits.hits[0]._source.formKeyValues.todoufuken} \n場所: ${data.hits.hits[0]._source.formKeyValues.teaspotname} \nコメント: ${data.hits.hits[0]._source.formKeyValues.comment}`);

                        const cid: string = Utils.randomsha256Hash();
                        const html: string = `
                        <p>武将: ${data.hits.hits[0]._source.formKeyValues.bushoumei}</p>
                        <p>都道府県: ${data.hits.hits[0]._source.formKeyValues.todoufuken}</p>
                        <p>場所: ${data.hits.hits[0]._source.formKeyValues.teaspotname}</p>
                        <p>コメント: ${data.hits.hits[0]._source.formKeyValues.comment}</p>
                        <p><img src="cid:${cid}"></p>
                        `;
                        const attachments = [
                            {
                                filename: 'index.jpg',
                                path: `https://firebasestorage.googleapis.com/v0/b/boshu-prod.appspot.com/o/${encodeURIComponent(data.hits.hits[0]._source.imagePath)}?alt=media`,
                                cid: cid
                            }
                        ];

                        MailSender.sendHTMLMail(user.email, `${data.hits.hits[0]._source.formKeyValues.bushoumei} - ${data.hits.hits[0]._source.formKeyValues.todoufuken}`, html, attachments);
                    }
                })
            }
        })
    }
}

export default function Polling(): void {
    if (process.env.GAMEWITH_TEAROOM_URL === undefined) {
        console.error('GAMEWITH_TEAROOM_URL not found.\nRetry after write GAMEWITH_TEAROOM_URL to the .env file.');
        process.exit(1);
    }

    console.log('fetching...');

    fetch(process.env.GAMEWITH_TEAROOM_URL)
        .then(response => response.json())
        .then(res => {
            const data: DataType = res;

            if (data.timed_out === false) {
                if (data.hits.hits[0]._source.createdAt._seconds !== currentTimestamp) {
                    currentTimestamp = data.hits.hits[0]._source.createdAt._seconds;
                    processData(data);

                    console.log('new data found!');
                }
            } else {
                // failed
                console.error('Failed to fetch data.');
            }
        })
        .catch(e => {
            console.error(e);
        })
}