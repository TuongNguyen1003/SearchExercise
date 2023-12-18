import express from 'express';
import bodyParser from 'body-parser';
import { initWebRoutes } from './routes/routes.js';

const app = express();
const port = 5000;

app.use(bodyParser.json());

initWebRoutes(app);

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
