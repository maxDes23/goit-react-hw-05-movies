import { Outlet } from 'react-router-dom';
import MoviesList from '../components/MoviesList/MoviesList';

const Layout = () => {
  return (
    <div>
      <MoviesList />
      <Outlet />
    </div>
  );
};

export default Layout;
