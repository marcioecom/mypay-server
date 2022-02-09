import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { routes } from './routes'

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(port, () => console.log(`server running on ${port}`));
