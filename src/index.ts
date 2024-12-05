import { MailSender } from "./mail/MailSender";
import dotenv from 'dotenv';
import Polling from "./polling/Polling";
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import ViewController from "./controller/ViewController";
import connect from "./database/connect";
import NotifyUser from "./model/NotifyUser";
import Permissions from "./enums/Permissions";
import Router from "./router/Router";
import test from "./tests/test";

// express
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

dotenv.config();

// initialize
function init(): void {
    if (process.env.EMAIL_ADDRESS === undefined) {
        console.error('EMAIL_ADDRESS not found.\nRetry after write EMAIL_ADDRESS to the .env file.');
        process.exit(1);
    }
    
    if (process.env.EMAIL_PASSWORD === undefined) {
        console.error('EMAIL_PASSWORD not found.\nRetry after write EMAIL_PASSWORD to the .env file.');
        process.exit(1);
    }
    
    MailSender.setAccount(process.env.EMAIL_ADDRESS, process.env.EMAIL_PASSWORD);

    if (process.env.TEAROOM_MONGODB_URI === undefined) {
        console.error('TEAROOM_MONGODB_URI not found.\nRetry after write TEAROOM_MONGODB_URI to the .env file.');
        process.exit(1);
    }

    (async () => {
        try {
            await connect();
        } catch (e) {
            console.error(e);
        }
    })();
}
init();

// test();

async function initUser(): Promise<void> {
    try {
        const newNotifyUser = new NotifyUser({ email: 'kairi.hoshino2@gmail.com', permission: Permissions.OWNER, notifyBushos: [], notifyPrefectures: [] });
        await newNotifyUser.save();
    } catch (e) {
        console.error('Error creating notify user: ', e);
        process.exit(1);
    }

    try {
        const newNotifyUser2 = new NotifyUser({ email: 'k.hoshikun@gmail.com', permission: Permissions.MODERATOR, notifyBushos: [], notifyPrefectures: [] });
        await newNotifyUser2.save();
    } catch (e) {
        console.error('Error creating notify user2: ', e);
        process.exit(1);
    }
}
// initUser();

// listen
app.use('/api/v1', Router);

app.use('*', ViewController.main);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
})

// start polling
if (process.env.POLLING_INTERVAL === undefined) {
    console.error('POLLING_INTERVAL not found.\nRetry after write POLLING_INTERVAL to the .env file.');
    process.exit(1);
}
setInterval(Polling, parseInt(process.env.POLLING_INTERVAL));