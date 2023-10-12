import React, { useState, useEffect } from 'react';

const MovieCard = ({ movie }) => {
    const [plot, setPlot] = useState('');

    useEffect(() => {
        // Fetch the plot information from the OMDB API
        async function fetchPlot() {
            const response = await fetch(`http://www.omdbapi.com?apikey=2df47785&i=${movie.imdbID}`);
            const data = await response.json();
            setPlot(data.Plot);
        }

        fetchPlot();
    }, [movie.imdbID]);

    return (
        <div className='movie'>
            <div>
                <p>{movie.Year}</p>
                <p className='plot'>{plot}</p>
            </div>
            <div>
                <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'} alt={movie.Title} />
            </div>
            <div>
                <span>{movie.Type}</span>
                <h3>{movie.Title}</h3>
            </div>
        </div>
    );
}

export default MovieCard;
