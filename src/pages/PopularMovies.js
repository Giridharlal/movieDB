import {useEffect, useState} from 'react'
import Loader from 'react-loader-spinner'
import {fetchMovies} from '../api'
import MovieGrid from '../components/MovieGrid'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const PopularMovies = () => {
  const [movies, setMovies] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  useEffect(() => {
    const fetchData = async () => {
      setApiStatus(apiStatusConstants.inProgress) // Set status to loading

      try {
        const data = await fetchMovies('popular')
        setMovies(data)
        setApiStatus(apiStatusConstants.success) // Set status to success
      } catch (error) {
        setApiStatus(apiStatusConstants.failure) // Set status to failure
      }
    }

    fetchData()
  }, [])

  const renderUI = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return (
          <div data-testid="loader" className="jobs-loader-container">
            <Loader type="ThreeDots" color="#ffcc00" height="50" width="50" />
          </div>
        )

      case apiStatusConstants.success:
        return <MovieGrid movies={movies} />

      case apiStatusConstants.failure:
        return <p>Failed to load Popular movies. Please try again.</p>

      default:
        return null
    }
  }

  return <div className="popular-movies-container">{renderUI()}</div>
}

export default PopularMovies
