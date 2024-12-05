import mongoose, { Schema } from 'mongoose';
import Permissions from '../enums/Permissions';
import TeaSpotBusho from '../enums/TeaSpotBusho';
import Prefectures from '../enums/Prefectures';

export interface INotifyUser extends Document {
    email: string;
    permission: Permissions;
    notifyBushos: TeaSpotBusho[];
    notifyPrefectures: Prefectures[];
};

const notifyUserSchema: Schema = new Schema({
    email: { type: String, require: true, unique: true },
    permission: { type: String, require: true, unique: false },
    notifyBushos: { type: [String], require: true },
    notifyPrefectures: { type: [String], require: true } 
});

const NotifyUser = mongoose.model<INotifyUser>('NotifyUser', notifyUserSchema);

export default NotifyUser;