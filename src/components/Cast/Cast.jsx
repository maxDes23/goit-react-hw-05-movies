import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  margin: 10px;
  padding: 10px;
`;

const Image = styled.img`
  width: 100px;
  height: auto;
`;

const Name = styled.h2`
  font-size: 1.5em;
`;

const Character = styled.p`
  font-size: 1em;
`;

const Cast = () => {
  const [cast, setCast] = useState(null);
  const { movieId } = useParams(); 

  useEffect(() => {
    const apiKey = '76c27c3a423231198130bdfb1ad095ef'; 
    const fetchCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
        );
        setCast(response.data.cast);
      } catch (error) {
        console.error('Error fetching movie cast:', error);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <div>
      {cast ? (
        <div>
          {cast.map(actor => (
            <Container key={actor.cast_id}>
              <Name>{actor.name}</Name>
              <Character>{actor.character}</Character>
              {actor.profile_path && (
                <Image
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                />
              )}
            </Container>
          ))}
        </div>
      ) : (
        'Loading...'
      )}
    </div>
  );
};

export default Cast;
