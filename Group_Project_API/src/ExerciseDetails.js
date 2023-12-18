import axios from "axios";
import showDetails from "./SearchExercise.js";

const exerciseOptions = {
  headers: {
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    'X-RapidAPI-Key': 'b5bd9c36ccmsh1e5a1e0e22e5a0bp109cb4jsn022bef2bc271',
  },
};

const youtubeOptions = {
  type: 'v',
  headers: {
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
    'X-RapidAPI-Key': 'b5bd9c36ccmsh1e5a1e0e22e5a0bp109cb4jsn022bef2bc271',
  },
};

const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';

const Details = async (req, res) => {
  const { id } = req.params;

  try {
    const exerciseDetailData = await axios.get(`${exerciseDbUrl}/exercises/exercise/${id}`, exerciseOptions);
    const exerciseVideosData = await axios.get(`${youtubeSearchUrl}/search?query=${exerciseDetailData.data.name} exercise`, youtubeOptions);
    const targetMuscleExercisesData = await axios.get(`${exerciseDbUrl}/exercises/target/${exerciseDetailData.data.target}`, exerciseOptions);
    const equipmentExercisesData = await axios.get(`${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.data.equipment}`, exerciseOptions);

    const { exerciseDetail, exerciseVideos, targetMuscleExercises, equipmentExercises } = {
      exerciseDetail: exerciseDetailData.data,
      exerciseVideos: exerciseVideosData.data.contents,
      targetMuscleExercises: targetMuscleExercisesData.data,
      equipmentExercises: equipmentExercisesData.data,
    };

    const capitalizedExerciseName = exerciseDetail.name.charAt(0).toUpperCase() + exerciseDetail.name.slice(1);

    const videoListHtml = exerciseVideos.slice(0, 6).map((item, index) => `
      <a
        key=${index}
        className="exercise-video"
        href="https://www.youtube.com/watch?v=${item.video.videoId}"
        target="_blank"
        rel="noreferrer"
      >
      <img style={{ borderTopLeftRadius: '20px' }} src=${item.video.thumbnails[0].url} alt=${item.video.title} />
      </a>
      `).join('');

      const similarTargetMuscleButtonsHtml = targetMuscleExercises.map((exercise, index) => `
      <button class="exercise-button" onclick="showDetails('${exercise.id}')">
        <img src="${exercise.gifUrl}" alt="${exercise.name}" width="200" height="150">
        <h3>${exercise.name}</h3>
        <p>Target: ${exercise.target}</p>
        <p>Body Part: ${exercise.bodyPart}</p>
      </button>
    `).join('');
    
    const similarEquipmentButtonsHtml = targetMuscleExercises.map((exercise, index) => `
    <button class="exercise-button" onclick="showDetails('${exercise.id}')">
        <img src="${exercise.gifUrl}" alt="${exercise.name}" width="200" height="150">
        <h3>${exercise.name}</h3>
        <p>Target: ${exercise.target}</p>
        <p>Body Part: ${exercise.bodyPart}</p>
      </button>
    `).join('');
  
    const similarExercisesHtml = `
      <h2>Similar Target Muscle Exercises</h2>
      <div class="exercise-list-container">
        ${similarTargetMuscleButtonsHtml}
      </div>
      <h2>Similar Equipment Exercises</h2>
      <div class="exercise-list-container">
        ${similarEquipmentButtonsHtml}
      </div>
    `;

    res.send(`
      <h1>${capitalizedExerciseName}</h1>
      <img src="${exerciseDetail.gifUrl}" alt="${capitalizedExerciseName}" width="400" height="300">
      <p>Target: ${exerciseDetail.target}</p>
      <p>Equipment: ${exerciseDetail.equipment}</p>
      <p>Instructions:</p>
      <ul>
        ${exerciseDetail.instructions.map(instruction => `<li>${instruction}</li>`).join('')}
      </ul>
      <h1>Watch ${exerciseDetail.name}</h1>
      <ul>
        ${videoListHtml}
      </ul>
        ${similarExercisesHtml}
      <!-- Add more details as needed -->
    `);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default Details;
