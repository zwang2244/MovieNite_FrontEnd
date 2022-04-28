import {useQuery} from 'react-query';
import axios from 'axios';
export function useSearchFriend(keywords,userId) {
  let url = `https://moive-nite.azurewebsites.net/user/search?keyword=${keywords}&userId=${userId}`;

  return useQuery(
      ['keywords', keywords],
      () => axios.get(url).then(res => res.data)
  )
}
