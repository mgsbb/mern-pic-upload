import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import url from 'url';

import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/usersRoutes.js';

// ============================================================================================
// Config
// ============================================================================================
dotenv.config();

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.MONGO_URL;

// ============================================================================================
// App
// ============================================================================================
const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/users', userRoutes);

// ============================================================================================
// Static client build
// ============================================================================================
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const client_build_path = path.resolve(__dirname, '../', 'client', 'build');
const client_index_html = path.resolve(client_build_path, 'index.html');

app.use(express.static(client_build_path));
app.get('*', (req, res) => {
	res.sendFile(client_index_html);
});

// ============================================================================================
// Mongoose database connection
// ============================================================================================
mongoose
	.connect(CONNECTION_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(app.listen(PORT, () => console.log(`Server listening on port ${PORT}`)))
	.catch((error) => console.log(error));
