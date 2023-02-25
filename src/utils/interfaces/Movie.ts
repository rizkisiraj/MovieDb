import Genre from "./Genre";

interface Movie {
  id:number,
  original_title:string,
  poster_path:string,
  vote_average:string,
  title?:string,
  release_date?:string,
  backdrop_path?:string,
  overview?:string | null,
  tagline?:string,
  genres?:Genre[],
  runtime?:string | null,
}

export default Movie;