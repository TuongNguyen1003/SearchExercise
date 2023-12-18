import express from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import Details from '../src/ExerciseDetails.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

export const initWebRoutes = (app) => {
    // Adjust the path to point to the correct location of the 'public' folder
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(express.static(path.join(__dirname, '../src')));

    router.get('/exercise', (req, res) => {
        // Now, this should correctly find 'SearchExercise.html' in the 'public' folder
        res.sendFile(path.join(__dirname, '../public/SearchExercise.html'));
    });

    router.get('/exercise/:id', Details);

    // Register the router
    app.use('/', router);
};

  
  