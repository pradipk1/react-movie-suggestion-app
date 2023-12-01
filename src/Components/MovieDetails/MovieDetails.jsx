import React, { useEffect, useState } from 'react'
import './MovieDetails.css'
import { useParams } from 'react-router-dom';

function MovieDetails() {

    const {id} = useParams();
    const [movie, setMovie] = useState({});

    useEffect(() => {
        fetch(`https://www.omdbapi.com/?i=${id}&apikey=ecb448ff`)
        .then(res=> res.json())
        .then(data=>{
            setMovie(data);
        });
    },[]);

    const handleFavorites = () => {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || []
        let filterarr = favorites.filter((el) => el.imdbID===movie.imdbID);
        if(filterarr.length===0) {
        favorites.push(movie);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('Added to favotites!');
        } else {
        alert('Already added!');
        }
    }
  return (
    <div className='MovieDetailsContainer'>
        <div>
            <div className='PosterDiv'>
                <img src={movie.Poster} alt="" />
            </div>
            <h3>{movie.Title}</h3>
            <h4>{movie.Released}</h4>
            <p><b>Genre: </b>{movie.Genre}</p>
            <p><b>Language: </b>{movie.Language}</p>
            <p><b>Actors: </b>{movie.Actors}</p>
            <p><b>Country: </b>{movie.Country}</p>
            <p><b>Plot: </b>{movie.Plot}</p>
            <p><b>imdbRating: </b>{movie.imdbRating}</p>
            <button style={{cursor:'pointer', marginTop:'10px'}} onClick={handleFavorites}>Add to Favorites</button>
        </div>
    </div>
  )
}

export default MovieDetails;