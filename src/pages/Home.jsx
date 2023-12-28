import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL, API_KEY } from '../components/Api/Api';
import axios from 'axios';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  background-image: url('https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700');
  background-repeat: no-repeat;
`;
const Text = styled.h1`
  margin-left: 20px;
`;

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
        );
        setTrendingMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
        setTrendingMovies([]);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <PageContainer>
      <Text>Trending today</Text>

      <ul>
        {trendingMovies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </PageContainer>
  );
};

export default Home;
