import {Link} from 'react-router-dom'
import {IMAGE_BASE_URL} from '../api'

const MovieCard = ({movie}) => {
  return (
    <div className="movie-card">
      <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>⭐ {movie.vote_average}</p>
      <Link to={`/movie/${movie.id}`} className="details-btn">
        <button role="button">View Details</button>
      </Link>
    </div>
  )
}

export default MovieCard
