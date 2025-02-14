import MovieCard from './MovieCard'

const MovieGrid = ({movies}) => {
  return (
    <div className="movies-grid">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

export default MovieGrid
