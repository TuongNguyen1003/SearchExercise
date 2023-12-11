import express from 'express';
import bodyParser from 'body-parser';
import { exerciseRouter } from './src/SearchExercise.js';
import { exerciseDetails } from './src/ExerciseDetails.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Xin chào, đây là trang web của bạn!');
});

app.use('/exercise', exerciseRouter);

app.use('/exercise', exerciseDetails);

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
