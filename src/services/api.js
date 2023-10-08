import axios from 'axios';

export const fetchFinder = async (postId, page) => {
  const API_KEY = '38874967-f841ab5810138828c5f6e1fdb';
  const URL = 'https://pixabay.com/api/';
  const END_POINT =
    '&q=' + postId + '&image_type=photo&orientation=horizontal&safesearch=true';
  const params = new URLSearchParams({
    key: API_KEY,
    page,
    per_page: 12,
  });

  const { data } = await axios.get(`${URL}?${params}${END_POINT}`);
  return data;
};
