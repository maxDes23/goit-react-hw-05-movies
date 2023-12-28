import React, { useState, useEffect } from 'react';
import {
  useParams,
  Link,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import Cast from '../pages/Cast';
import Reviews from '../pages/Reviews';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import styled from 'styled-components';

  const MainContainer = styled.div`
    background-color: #e0c372;
    padding: 20px;
  `;

  const Container = styled.div`
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
  `;

  const Info = styled.div`
    margin-left: 20px;
  `;

  const Poster = styled.img`
    width: 200px;
    height: auto;
  `;

  const Actions = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    border-top: 3px solid #b6aeae;
    border-bottom: 3px solid #b6aeae;
    padding: 10px 0;
    margin-bottom: 20px;
    gap: 2px;
    color: #050505;
  `;

  const GoBackButton = styled.button`
    display: flex;
    align-items: center;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 13px;
    color: #0e0c0c;
    margin-bottom: 12px;
    margin-top: 12px;
    &:hover {
      color: #4e6175;
    }
  `;

  const BackIcon = styled(FaArrowLeft)`
    margin-right: 5px;
  `;
const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=04b4d601805ac31a2739906707e3a331`
        );
        setMovieDetails(result.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchData();
  }, [movieId]);

  const handleGoBack = () => {
    navigate(location.state?.from || '/home');
  };

  if (!movieDetails) return 'Loading...';



  return (
    <MainContainer>
      <GoBackButton onClick={handleGoBack}>
        <BackIcon />
        Go Back
      </GoBackButton>
      <Container>
        <Info>
          <h1>{movieDetails.title}</h1>
          <p>User Score: {Math.round(movieDetails.vote_average * 10)}%</p>
          <h3>Overview:</h3>
          <p>{movieDetails.overview}</p>
          <h3>Genres:</h3>
          <p>{movieDetails.genres.map(genre => genre.name).join(', ')}</p>
        </Info>
        <Poster
          src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
          alt={movieDetails.title}
        />
      </Container>
      <Actions>
        <h3>Additional Information</h3>
        <Link to={`/movies/${movieId}/cast`}>Cast</Link>
        <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
      </Actions>
      <Routes>
        <Route path="cast" element={<Cast movieId={movieId} />} />
        <Route path="reviews" element={<Reviews />} />
      </Routes>
    </MainContainer>
  );
};

export default MovieDetails;
