import axios from 'axios';

export const exerciseOptions = {
    method: 'get',
    headers: {
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
        'X-RapidAPI-Key': 'b5bd9c36ccmsh1e5a1e0e22e5a0bp109cb4jsn022bef2bc271',
    },
};

export const youtubeOptions = {
    method: 'GET',
    type: 'v',
    headers: {
      'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
      'X-RapidAPI-Key': 'b5bd9c36ccmsh1e5a1e0e22e5a0bp109cb4jsn022bef2bc271',
    },
  };

export const fetchData = async (url, options) => {
  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu:', error.message);
    throw error;
  }
};

