import express from 'express';
import { exerciseOptions, youtubeOptions, fetchData } from '../utils/FetchData.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
    const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';

    const exerciseDetailData = await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`, exerciseOptions);
    const exerciseVideosData = await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetailData.name} exercise`, youtubeOptions);
    const targetMuscleExercisesData = await fetchData(`${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`, exerciseOptions);
    const equipmentExercisesData = await fetchData(`${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`, exerciseOptions);

    res.json({
      exerciseDetail: exerciseDetailData,
      exerciseVideos: exerciseVideosData.contents,
      targetMuscleExercises: targetMuscleExercisesData,
      equipmentExercises: equipmentExercisesData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { router as exerciseDetails };
