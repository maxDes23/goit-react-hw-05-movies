import { NavLink } from 'react-router-dom';

const MoviesList = () => {
  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/movies">Movies</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MoviesList;
