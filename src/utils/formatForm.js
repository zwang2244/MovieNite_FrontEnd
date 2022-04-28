//convert data getting from frontend into the backend format

import { formatDate } from "./formatDate";

/**
 * {
 *   "movieEvent": {
 *   "eventID": 1038,
 *       "location": "Octave2321321",
 *       "dateTime": "2022-04-23 16:20:34",
 *       "host": 20
 * },
 *   "movieInfo": {
 *   "imdbID": "tt0279623",
 *       "title": "Above & Beyond",
 *       "genres": [
 *     "Drama",
 *     "Romance"
 *   ],
 *       "release_date": "2001-05-25",
 *       "overview": "Cop drama meets romance: This intense thriller is about a police officer who shoots his best friend (who also wears a badge) while on the job. His buddy is permanently paralyzed, and the incident raises eyebrows around the precinct. Was it an accident, or did this detective's feelings for his pal's wife cause him to cross the line? Only true super sleuths will figure it out before the end!"
 * },
 *   "attendees": [
 *   {
 *     "userID": 26,
 *     "emailAddr": "aterramp@squidoo.com",
 *     "firstName": "Archambault",
 *     "lastName": "Terram",
 *     "loginToken": null
 *   },
 *   {
 *     "userID": 27,
 *     "emailAddr": "aharnottq@google.ru",
 *     "firstName": "Anthony",
 *     "lastName": "Harnott",
 *     "loginToken": null
 *   },
 *   {
 *     "userID": 37,
 *     "emailAddr": "lsollam10@prlog.org",
 *     "firstName": "Louisa",
 *     "lastName": "Sollam",
 *     "loginToken": null
 *   }
 * ]
 * }
 * @param data
 */
export const formatDataToForm = (data) => {
  let array = [];
  data.map((item) => {
    let obj = {
      movie: {
        imdbNumber: "",
        title: "",
        genre: "",
        yearReleased: "",
      },
      dateTime: "",
      host: {
        id: "",
      },
      invitedFriendList: [],
      location: "",
      eventId: "",
    };
    obj.movie.imdbNumber = item.movieInfo?.imdbID;
    obj.movie.title = item.movieInfo?.title;
    obj.movie.genre = item.movieInfo?.genres;
    obj.movie.yearReleased = item.movieInfo?.release_date;
    obj.footage = item.movieInfo?.poster_path;

    obj.dateTime = item.movieEvent?.dateTime;
    obj.host.id = item.movieEvent?.host;

    obj.invitedFriendList = [...item.attendees];
    obj.location = item.movieEvent?.location;

    obj.eventId = item.movieEvent?.eventID;
    array.push(obj);
  });
  return array;
};

export const formatForm = (data, isMember) => {
  let obj = {};

  obj.friends = "";
  data.invitedFriendList.map((item) => (obj.friends += item.userID + ", "));
  obj.friends = obj.friends.substring(0, obj.friends.length - 2);

  obj.movie = {
    genre: "",
    imdbNumber: "",
    title: "",
    yearReleased: "",
  };
  obj.movie.genre = data?.movie?.genre;
  obj.movie.imdbNumber = data?.movie?.imdbNumber;
  obj.movie.title = data?.movie?.title;
  obj.movie.yearReleased = data?.movie?.yearReleased;

  obj.movieEvent = {};
  obj.movieEvent.dateTime = formatDate(data.dateTime);
  obj.movieEvent.eventID = 1;
  obj.movieEvent.host = 20; //userId
  obj.movieEvent.location = data.location;
  obj.member = isMember;
  return obj;
};
