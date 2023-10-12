import { useEffect, useState } from 'react';
import MovieCard from './MovieCard'; 
import './App.css';
import SearchIcon from './search.svg';

const API_URL = 'http://www.omdbapi.com?apikey=2df47785'; // Define the OMDB API URL

const App = () => {
    // State variables for managing movies and search term
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Function to search for movies based on the provided title
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        // Update the movies state with search results
        setMovies(data.Search);
    };

    // useEffect to initiate an initial search for 'Your Name' on component load
    useEffect(() => {
        searchMovies('Your Name');
    }, []);

    // Function to handle search when the Enter key is pressed
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            searchMovies(searchTerm);
        }
    };

    return (
        <div className='app'>
            <h1>Movie Land</h1>

            <div className='search'>
                {/* Input for searching movies */}
                <input
                    placeholder='Search for movies'
                    value={searchTerm}
                    onChange={(x) => setSearchTerm(x.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <img
                    src={SearchIcon}
                    alt='search'
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {movies?.length > 0 ? (
                <div className='container '>
                    {/* Map through movies and render MovieCard component for each movie */}
                    {movies.map((movie) => (
                        <MovieCard movie={movie} />
                    ))}
                </div>
            ) : (
                <div className="empty">
                    <h1>No movies found</h1>
                </div>
            )}
        </div>
    );
};

export default App;
