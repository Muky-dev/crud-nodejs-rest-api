import dotenv from 'dotenv'
if (process.env.NODE_ENV !== 'production') {
	dotenv.config();
}
import express from 'express';

const app = express();

app.use(express.urlencoded({ limit: '10mb', extended: false}));
app.use(express.json());

import mongoose from 'mongoose';
mongoose.connect(process.env.USERS_DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => {
    console.log('Connected with database')
});

//ROUTES
import routes from './routes/router.js';
app.use('/', routes)

app.listen(process.env.PORT | 3000);