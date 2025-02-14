import {NavLink, useHistory} from 'react-router-dom'
import {useState} from 'react'

const Navbar = () => {
  const [search, setSearch] = useState('')
  const history = useHistory()

  const handleSearch = () => {
    if (search.trim()) {
      history.push(`/search/${search}`)
    }
  }

  return (
    <nav className="navbar">
      <NavLink exact to="/" className="logo">
        <h1>movieDB</h1>
      </NavLink>
      <ul>
        <li>
          <NavLink exact to="/" activeClassName="active">
            <h1>Popular</h1>
          </NavLink>
        </li>
        <li>
          <NavLink to="/top-rated" activeClassName="active">
            <h1>Top Rated</h1>
          </NavLink>
        </li>
        <li>
          <NavLink to="/upcoming" activeClassName="active">
            <h1>Upcoming</h1>
          </NavLink>
        </li>
      </ul>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </div>
    </nav>
  )
}

export default Navbar
