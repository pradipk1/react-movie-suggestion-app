import React from 'react'
import './Movie.css'
import {Link} from 'react-router-dom'

function Movie({ele}) {

  const addToFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || []
    let filterarr = favorites.filter((el) => el.imdbID===ele.imdbID);
    if(filterarr.length===0) {
      favorites.push(ele);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      alert('Added to favotites!');
    } else {
      alert('Already added!');
    }
  }
    
  return (
    <div className='MovieContainer'>
        <Link to={`/moviedetails/${ele.imdbID}`} className='MoviePosterLink'>
            <img src={ele.Poster} alt="" />
        </Link>
        <p className='MovieTitle'>{ele.Title}</p>
        <div className='MovieFavoriteBtnDiv'>
            <span className='MovieYearSpan'>{ele.Year}</span>
            <button onClick={addToFavorite}>Add to Favorites</button>
        </div>
    </div>
  )
}

export default Movie;