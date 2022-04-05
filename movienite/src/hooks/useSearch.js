import {useQuery} from 'react-query';
import axios from 'axios';

export function useSearch(keywords) {
  let url = `https://moive-nite.azurewebsites.net/movie/search?keyword=${keywords}`;

  return useQuery(
      ['keywords', keywords],
      () => axios.get(url).then(res => res.data)
  )
}
