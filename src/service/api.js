import axios from 'axios';
import { imgNormalize } from 'helpers/imgNormalize';

const API_KEY = '33414632-91dc2c07012505ffb510f0739';

export const fetchImg = async (query, params) => {
  const data = { data: [], totalHits: null };
  try {
    const res = await axios.get(
      `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&`,
      { params: { page: 1, per_page: 12, ...params } }
    );

    data.data = imgNormalize(res.data.hits);
    data.totalHits = res.data.totalHits;

    return data;
  } catch (error) {}
};

// function fetchImg(query, page) {
//   console.log(query, page);
//   return fetch(
//     `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&page=${page}&per_page=12`
//   ).then(response => {
//     if (response.ok) {
//       return response.json();
//     }
//     return Promise.reject(new Error('Nothing is finding'));
//   });
// }
// const api = {
//   fetchImg,
// };
