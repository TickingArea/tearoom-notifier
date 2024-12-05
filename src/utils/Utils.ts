import crypto from 'crypto';

export default class Utils {
    public static convertSecondsToDate(seconds: number): string {
        const milliseconds = seconds * 1000;

        const calculatedDate = new Date(milliseconds);

        return calculatedDate.toLocaleDateString();
    }

    public static randomsha256Hash(): string {
        const length = Math.floor(Math.random() * (64 - 16 + 1)) + 16;
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';
        for (let i = 0; i < length; i++) {
            randomString += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return crypto.createHash('sha256').update(randomString).digest('hex');
    }
}