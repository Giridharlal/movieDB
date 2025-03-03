import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import LoadingPage from '../components/LoadingPage'
import {fetchMovieCast, IMAGE_BASE_URL} from '../api'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const MovieCast = () => {
  const [cast, setCast] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const {id} = useParams()

  useEffect(() => {
    const getCast = async () => {
      setApiStatus(apiStatusConstants.inProgress)

      try {
        const data = await fetchMovieCast(id)
        setCast(data.cast)
        setApiStatus(apiStatusConstants.success)
      } catch (error) {
        console.error('Error fetching cast details:', error)
        setApiStatus(apiStatusConstants.failure)
      }
    }

    getCast()
  }, [id])

  const renderUI = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return <LoadingPage />

      case apiStatusConstants.success:
        return (
          <div className="cast-container">
            {cast.length > 0 ? (
              cast.map(actor => (
                <div key={actor.id} className="cast-card">
                  <img
                    src={
                      actor.profile_path
                        ? `${IMAGE_BASE_URL}${actor.profile_path}`
                        : '/default-profile.png'
                    }
                    alt={actor.name}
                    className="cast-image"
                  />
                  <h3 className="cast-name">{actor.name}</h3>
                  <p className="cast-role">
                    as <strong>{actor.character}</strong>
                  </p>
                </div>
              ))
            ) : (
              <p className="no-cast-message">No cast details available.</p>
            )}
          </div>
        )

      case apiStatusConstants.failure:
        return (
          <p className="error-message">
            Failed to load cast details. Please try again.
          </p>
        )

      default:
        return null
    }
  }

  return (
    <div>
      <h2 className="cast-heading">Movie Cast</h2>
      {renderUI()}
    </div>
  )
}

export default MovieCast
