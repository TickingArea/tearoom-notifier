import mongoose, { Connection } from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

async function connect(): Promise<Connection> {
    try {
        // already checked available of TEAROOM_MONGODB_URI in index.ts
        const connection = await mongoose.connect(process.env.TEAROOM_MONGODB_URI!);
        console.log('MongoDB Connected:', connection.connection.host);
        return connection.connection;
    } catch (e) {
        throw e;
    }
}

export default connect;