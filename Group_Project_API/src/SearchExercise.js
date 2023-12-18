const exerciseOptions = {
  headers: {
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
      'X-RapidAPI-Key': 'b5bd9c36ccmsh1e5a1e0e22e5a0bp109cb4jsn022bef2bc271',
  },
};

async function Search() {
  const searchInput = document.getElementById('searchInput');
  const searchTerm = searchInput.value.trim();

  if (searchTerm !== '') {
    try {
      const response = await axios.get('https://exercisedb.p.rapidapi.com/exercises?limit=9999', exerciseOptions);
      const exercisesData = response.data;

      const searchedExercises = exercisesData.filter(
        (exercise) => exercise.name.includes(searchTerm.toLowerCase())
          || exercise.target.includes(searchTerm.toLowerCase())
          || exercise.equipment.includes(searchTerm.toLowerCase())
          || exercise.bodyPart.includes(searchTerm.toLowerCase())
      );

      const resultsContainer = document.getElementById('results');
      
      // Clear existing content before adding new content
      resultsContainer.innerHTML = '';

      if (searchedExercises.length > 0) {
        searchedExercises.forEach((exercise) => {
          const exerciseButton = document.createElement('button');
          exerciseButton.classList.add('exercise-button');
          exerciseButton.innerHTML = `
            <img src="${exercise.gifUrl}" alt="${exercise.name}" width="200" height="150">
            <h3>${exercise.name}</h3>
            <p>Target: ${exercise.target}</p>
            <p>Body Part: ${exercise.bodyPart}</p>`;
          exerciseButton.addEventListener('click', () => showDetails(exercise));
          resultsContainer.appendChild(exerciseButton);
        });
      } else {
        resultsContainer.innerHTML = `<p>There is no exercise related to ${searchTerm}</p>`;
      }
    } catch (error) {
      console.error(error);
      // Xử lý lỗi
    }
  } else {
    // Xóa kết quả nếu từ khóa tìm kiếm trống
    document.getElementById('results').innerHTML = '';
  }
}
const showDetails = (exerciseId) => {
  window.location.href = `/exercise/${exerciseId}`;
}

export default showDetails;

