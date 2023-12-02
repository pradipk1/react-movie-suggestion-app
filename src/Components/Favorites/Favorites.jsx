import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './Favorites.css'

function Favorites() {
  
  const[favorites, setFavorites] = useState([]);

  useEffect(() => {
    let favoritesArr = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(favoritesArr);
  },[]);

  const removeFromFavorite = (ind) => {
    console.log(ind);
    let favoritesArr = JSON.parse(localStorage.getItem('favorites'));
    favoritesArr.splice(ind,1);
    localStorage.setItem('favorites', JSON.stringify(favoritesArr));
    setFavorites(favoritesArr);
  }

  return (
    
        favorites.length===0 ? <h2 style={{textAlign:'center'}}>No favorites added</h2> : 
        <div className='FavoritesContainer'>
          {
            favorites.map((ele,ind) => (
              <div className='FavoritesCardContainer' key={'favorites'+ind}>
                <Link to={`/moviedetails/${ele.imdbID}`} className='FavoritesPosterLink'>
                    <img src={ele.Poster} alt="" />
                </Link>
                <div className='FavoritesDetailsDiv'>
                  <p className='FavoritesTitle'>{ele.Title}</p>
                  <span>{ele.Year}</span>
                  <button style={{cursor:'pointer'}} className='RemoveFromFavoritesBtn' onClick={() => removeFromFavorite(ind)}>Remove</button>
                </div>
              </div>
            ))
          }
        </div>
  )
}

export default Favorites