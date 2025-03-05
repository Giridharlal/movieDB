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
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      setApiStatus(apiStatusConstants.inProgress) // Set status to loading

      try {
        const {movies, totalPages} = await fetchMovies('popular', page)
        setMovies(movies)
        setTotalPages(totalPages)
        setApiStatus(apiStatusConstants.success) // Set status to success
      } catch (error) {
        setApiStatus(apiStatusConstants.failure) // Set status to failure
      }
    }

    fetchData()
  }, [page])

  const renderPagination = () => (
    <div className="pagination">
      <button
        type="button"
        onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))}
        disabled={page === 1}
      >
        Prev
      </button>
      <p>{page}</p>
      <button
        type="button"
        onClick={() => setPage(prevPage => Math.min(prevPage + 1, totalPages))}
        disabled={page >= totalPages}
      >
        Next
      </button>
    </div>
  )

  const renderUI = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return <LoadingPage />

      case apiStatusConstants.success:
        return (
          <div>
            <MovieGrid movies={movies} />
          </div>
        )

      case apiStatusConstants.failure:
        return <p>Failed to load Popular movies. Please try again.</p>

      default:
        return null
    }
  }

  return (
    <div className="popular-movies-container">
      {renderUI()}
      {renderPagination()}
    </div>
  )
}

export default PopularMovies
