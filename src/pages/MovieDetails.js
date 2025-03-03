import {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom'
import {fetchMovieDetails, IMAGE_BASE_URL} from '../api'
import LoadingPage from '../components/LoadingPage'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const MovieDetails = () => {
  const {id} = useParams()
  const [movie, setMovie] = useState(null)
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  useEffect(() => {
    const getMovieDetails = async () => {
      setApiStatus(apiStatusConstants.inProgress) // Set loading state

      try {
        const data = await fetchMovieDetails(id)
        setMovie(data)
        setApiStatus(apiStatusConstants.success) // Set success state
      } catch (error) {
        setApiStatus(apiStatusConstants.failure) // Set failure state
      }
    }

    getMovieDetails()
  }, [id])

  const renderUI = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return <LoadingPage />

      case apiStatusConstants.success:
        return (
          <div className="movie-details-container">
            <img
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <div>
              <h1 className="movie-title">{movie.title}</h1>
              <p className="movie-overview">{movie.overview}</p>
              <Link to={`/movie/${movie.id}/cast`} className="view-cast-button">
                View Cast
              </Link>
            </div>
          </div>
        )

      case apiStatusConstants.failure:
        return <p>Failed to load movie details. Please try again.</p>

      default:
        return null
    }
  }

  return <>{renderUI()}</>
}

export default MovieDetails
