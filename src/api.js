const API_KEY = '1eb91f3510a3700f59d03ecc3d444c10'

export const API_URL = 'https://api.themoviedb.org/3'
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'
const MovieCast =
  'https://api.themoviedb.org/3/movie/539972/credits?api_key=1eb91f3510a3700f59d03ecc3d444c10&language=en-US'
const POPULAR_MOVIES_API = `https://api.themoviedb.org/3/movie/top_rated?api_key=1eb91f3510a3700f59d03ecc3d444c10&language=en-US&page=1`

// export const fetchMovies = async category => {
//   const url = `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&language=en-US&page=1`
//   console.log(url)
//   const response = await fetch(url)
//   const data = await response.json()
//   console.log(data)
//   return data.results
// }

export const fetchMovies = async category => {
  const url = `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&language=en-US&page=1`
  console.log(url)

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    console.log(data)
    return data.results
  } catch (error) {
    console.error('Fetch failed:', error)
    throw error // Propagate the error to handle it in the component
  }
}
export const fetchMovieDetails = async id => {
  const url = `${API_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Fetch Movie Details failed:', error)
    throw error
  }
}

export const fetchMovieCast = async id => {
  const url = `${API_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Fetch Movie Cast failed:', error)
    throw error
  }
}

export const searchMovies = async query => {
  const url = `${API_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    return data.results
  } catch (error) {
    console.error('Search Movies failed:', error)
    throw error
  }
}
