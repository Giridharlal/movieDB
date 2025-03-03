import {useEffect, useState} from 'react'
import {fetchMovies} from '../api'
import MovieGrid from '../components/MovieGrid'
import LoadingPage from '../components/LoadingPage'

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
      setApiStatus(apiStatusConstants.inProgress)

      try {
        const data = await fetchMovies('top_rated')
        setMovies(data)
        setApiStatus(apiStatusConstants.success)
      } catch (error) {
        setApiStatus(apiStatusConstants.failure)
      }
    }

    fetchData()
  }, [])

  const renderUI = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return <LoadingPage />

      case apiStatusConstants.success:
        return <MovieGrid movies={movies} />

      case apiStatusConstants.failure:
        return <p>Failed to load Top Rated movies. Please try again.</p>

      default:
        return null
    }
  }

  return <div className="popular-movies-container">{renderUI()}</div>
}

export default PopularMovies
