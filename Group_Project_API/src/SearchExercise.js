import express from 'express';
import { exerciseOptions, fetchData } from '../utils/FetchData.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { search } = req.query;

  try {
    if (search) {
      const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises?limit=9999', exerciseOptions);

      const searchedExercises = exercisesData.filter(
        (exercise) => exercise.name.includes(search.toLowerCase())
          || exercise.target.includes(search.toLowerCase())
          || exercise.equipment.includes(search.toLowerCase())
          || exercise.bodyPart.includes(search.toLowerCase()),
      );

      if (searchedExercises.length > 0) {
        res.json(searchedExercises);
      } else {
        res.json({ message: `There are no exercises related to ${search}` });
      }
    } else {
      res.json([]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { router as exerciseRouter };
