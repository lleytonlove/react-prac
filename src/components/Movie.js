import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Movie({ coverImage, title, id, summary, genres }) {
    return <div key={id}>
        <h2>
            <Link to={`/movie/${id}`}>{title}</Link>
        </h2>
        <img src={coverImage} alt={`${title} imag`} />
        <p>{summary}</p>
        <ul>
            {genres.map((g, index) => <li key={index}>{g}</li>)}
        </ul>
    </div>;
}

Movie.propTypes = {
    id: PropTypes.number.isRequired,
    coverImage: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Movie;