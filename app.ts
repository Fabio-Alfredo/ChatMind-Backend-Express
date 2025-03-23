import express from 'express';
import router from './src/routes';
import { errorHander } from './src/handlers/error.handler';

const app = express();

app.use(express.json());
app.use(router);
app.use(errorHander);

export default app;