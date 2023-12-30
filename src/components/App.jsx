import React, { Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from '../Layout/Layout';

const Home = React.lazy(() => import('../pages/Home'));
const Cast = React.lazy(() => import('../pages/Cast'));
const MovieDetails = React.lazy(() => import('../pages/MovieDetails'));
const Movies = React.lazy(() => import('../pages/Movies'));
const Reviews = React.lazy(() => import('../pages/Reviews'));

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="movies"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Movies />
            </Suspense>
          }
        />
        <Route
          path="movies/:movieId/*"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <MovieDetails>
                <Route path="cast" element={<Cast />} />
                <Route path="reviews" element={<Reviews />} />
              </MovieDetails>
            </Suspense>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
