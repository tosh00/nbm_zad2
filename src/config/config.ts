import dotenv from 'dotenv'

dotenv.config()

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'admin';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '1234';
const MONGO_PORT = process.env.MONGO_PORT || '27017';
const MONGO_HOST = process.env.MONGO_HOST || 'localhost'
const MONGO_URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/`;

console.log(MONGO_URL);


const SERVER_PORT = process.env.HOST ? Number(process.env.MONGO_HOST) : 3001;

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
}