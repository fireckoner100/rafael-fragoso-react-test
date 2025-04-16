import axios from 'axios';

export const getCharacters = async (page: number = 1) => {
  try {
    const response = await axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`);
    return {
      results: response.data.results,
      totalPages: response.data.info.pages
    };
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error; // Puedes relanzar el error si quieres manejarlo después
  }
};
