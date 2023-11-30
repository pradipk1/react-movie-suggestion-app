import React, { useState } from 'react'
import './Searchbar.css'
import Movie from '../Movie/Movie';

function Searchbar() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    fetch(`https://www.omdbapi.com/?s=${searchValue}&type=movie&apikey=ecb448ff`)
    .then(res => res.json())
    .then((data) => {
      if(data.Response==='True') {
        setSearchResult(data.Search);
        localStorage.setItem('searchResults', JSON.stringify(data.Search));
        
      } else {
        setError(true);
        setSearchResult([]);
        localStorage.setItem('searchResults', JSON.stringify([]));
      }
    });
  }

  const handleYearSort = (e) => {
    let results = JSON.parse(localStorage.getItem('searchResults'));

    if(e.target.value==='ascending') {
      results.sort((a,b) => a.Year-b.Year);
      setSearchResult(results);

    } else if(e.target.value==='descending') {
      results.sort((a,b) => {
        if(a.Year>b.Year) return -1;
        if(a.Year<b.Year) return 1;
        return 0;
      });
      setSearchResult(results);

    } else {
      setSearchResult(results);
    }
  }

  return (
    <div className='SearchbarContainer'>

        <div className='SearchInputContainer'>
          <input type="text" placeholder='Enter Something'
          onChange={(e) => {
            setSearchValue(e.target.value)
          }}
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>

        <div>
          <select onChange={handleYearSort}>
            <option value="">Sort by Year</option>
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
        </div>
        {
          searchResult.length===0 ? 
          (error ? <h2 style={{textAlign:'center', color:'red'}}>No data found</h2> : '')
          : <div className='SearchResultContainer'>
            {
              searchResult.map((ele, ind) => (
                <Movie ele={ele} key={'movie'+ind}/>
              ))
            }
          </div> 
        }
        
    </div>
  )
}

export default Searchbar;