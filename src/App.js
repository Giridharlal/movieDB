import {Route, Switch} from 'react-router-dom'
import PopularMovies from './pages/PopularMovies'
import './App.css'
import TopRatedMovies from './pages/TopRatedMovies'
import UpcomingMovies from './pages/UpcomingMovies'
import MovieDetails from './pages/MovieDetails'
import SearchResults from './pages/SearchResults'
import MovieCast from './pages/MovieCast'
import Navbar from './components/Navbar'

const App = () => (
  <div>
    <Navbar />
    <Switch>
      <Route exact path="/" component={PopularMovies} />
      <Route exact path="/top-rated" component={TopRatedMovies} />
      <Route exact path="/upcoming" component={UpcomingMovies} />
      <Route exact path="/movie/:id" component={MovieDetails} />
      <Route exact path="/search/:query" component={SearchResults} />
      <Route path="/movie/:id/cast" component={MovieCast} />
    </Switch>
  </div>
)

export default App
