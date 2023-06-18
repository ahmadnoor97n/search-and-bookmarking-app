import axios from 'axios';

export const fetchRepos = async (query, page) => {
  if (query) {
    const response = await axios.get(
      `https://api.github.com/search/repositories?q=${query}&page=${page}&per_page=10`, {
        headers: {Authorization : 'token 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'}
      }
    );
    return {
      items: response.data.items,
      total_count: response.data.total_count,
    };
  } else {
    return {
      items: [],
      total_count: 0,
    };
  }
};
