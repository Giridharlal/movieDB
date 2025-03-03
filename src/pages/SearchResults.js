import {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom'
import {searchMovies} from '../api'
import MovieGrid from '../components/MovieGrid'
import LoadingPage from '../components/LoadingPage'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const SearchResults = () => {
  const {query} = useParams()
  const [movies, setMovies] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  useEffect(() => {
    const getSearchResults = async () => {
      if (!query) return

      setApiStatus(apiStatusConstants.inProgress)

      try {
        const results = await searchMovies(query)
        setMovies(results || [])
        setApiStatus(apiStatusConstants.success)
      } catch (error) {
        setApiStatus(apiStatusConstants.failure)
      }
    }

    getSearchResults()
  }, [query])

  const renderUI = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return <LoadingPage />

      case apiStatusConstants.success:
        return <MovieGrid movies={movies} />

      case apiStatusConstants.failure:
        return <p>Failed to load search results. Please try again.</p>

      default:
        return null
    }
  }

  return (
    <div>
      <h2>Search Results for "{query}"</h2>
      {renderUI()}
    </div>
  )
}

export default SearchResults
