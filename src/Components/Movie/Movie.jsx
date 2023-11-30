import React from 'react'
import './Movie.css'
import {Link} from 'react-router-dom'

function Movie({ele}) {
    
  return (
    <div className='MovieContainer'>
        <Link to='' className='MoviePosterLink'>
            <img src={ele.Poster} alt="" />
        </Link>
        <p className='MovieTitle'>{ele.Title}</p>
        <div className='MovieFavoriteBtnDiv'>
            <span className='MovieYearSpan'>{ele.Year}</span>
            <button>Add to Favorites</button>
        </div>
        
    </div>
  )
}

export default Movie;