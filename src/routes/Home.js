import { useEffect, useState } from "react";
import Movie from "../components/Movie"

// git push
function Home() {
  const [loading, setLoading] = useState(true);

  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const res = await fetch(`https://yts.lt/api/v2/list_movies.json?mininum_rating=9&sort_by=year`);
    const json = await res.json();
    setMovies(json.data.movies);
    setLoading(false);
  }
  useEffect(() => {
    getMovies();
  }, []);


  return (
    <div>
      {
        loading ? <h1>Loading ..</h1>
          :
          <div>
            {movies.map(movie =>
              <Movie key={movie.id} coverImage={movie.medium_cover_image}
                title={movie.title}
                id={movie.id}
                summary={movie.summary}
                genres={movie.genres}
              />
            )
            }
          </div>
      }
    </div>
  );
}
export default Home;