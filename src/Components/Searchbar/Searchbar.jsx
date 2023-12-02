import React, { useContext, useEffect, useState } from 'react'
import './Searchbar.css'
import Movie from '../Movie/Movie';
import myContext from '../Context/Context';

function Searchbar() {

  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState(false);
  const [sort, setSort] = useState('');
  const [filterYear, setFilterYear] = useState('');

  const {page, setPage, totalPage, setTotalPage, latestSearch, setLatestSearch} = useContext(myContext);

  const handleSort = (initialValue='', arr=[]) => {
    let results = arr;
    if(initialValue==='ascending') {
      results.sort((a,b) => a.Year-b.Year);
      handleFilter(filterYear, results);

    } else if(initialValue==='descending') {
      results.sort((a,b) => {
        if(a.Year>b.Year) return -1;
        if(a.Year<b.Year) return 1;
        return 0;
      });
      handleFilter(filterYear, results);
      
    } else {
      handleFilter(filterYear, results);
    }
  }

  const handleFilterYear = (initialValue='') => {
    setFilterYear(initialValue);
    let results = JSON.parse(localStorage.getItem('searchResults'));
    if(initialValue==='') {
      if(sort==='ascending') {
        results.sort((a,b) => a.Year-b.Year);
        setSearchResult(results);
  
      } else if(sort==='descending') {
        results.sort((a,b) => {
          if(a.Year>b.Year) return -1;
          if(a.Year<b.Year) return 1;
          return 0;
        });
        setSearchResult(results);
        
      } else {
        setSearchResult(results);
      }

    } else {
      const filterArr = results.filter((ele) => ele.Year===initialValue);
      handleSort(sort, filterArr);
    }
    
  }

  const handleFilter = (initialValue='', arr=[]) => {
    if(initialValue==='') {
      setSearchResult(arr)
    } else {
      const filterArr = arr.filter((ele) => ele.Year===initialValue);
      setSearchResult(filterArr);
    }
  }

  let endYear = new Date().getFullYear();
  let yearArr = [];
  for(let i=endYear; i>=1900; i--) {
    yearArr.push(i);
  }

  useEffect(() => {
    if(latestSearch!==''){
      fetch(`https://www.omdbapi.com/?s=${latestSearch}&page=${page}&type=movie&apikey=ecb448ff`)
      .then(res => res.json())
      .then((data) => {
        if(data.Response==='True') {
          let totalPage = Math.ceil(data.totalResults/10);
          setTotalPage(totalPage);
          localStorage.setItem('searchResults', JSON.stringify(data.Search));
          handleSort(sort, data.Search);
          
        } else {
          setError(true);
          setSearchResult([]);
          setPage(1);
          setTotalPage(0);
          localStorage.setItem('searchResults', JSON.stringify([]));
        }
      });
    }
    
  },[latestSearch, page]);

  return (
    <div className='SearchbarContainer'>

      <div className='SearchInputFilterContainer'>
        <div className='SearchInputContainer'>
          <input type="text" placeholder='Enter Something!' value={latestSearch}
            onChange={(e) => setLatestSearch(e.target.value)} 
          />
        </div>

        <div className='SortFilterContainer'>
          <select onChange={(e) =>{
            setSort(e.target.value);
            let res=JSON.parse(localStorage.getItem('searchResults'));
            handleSort(e.target.value, res);
          }} value={sort}>
            <option value="">Sort by Year</option>
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
          
          <select onChange={(e) => {
            setFilterYear(e.target.value);
            handleFilterYear(e.target.value);
          }}>
            <option value="">Filter by Year</option>
            {
              yearArr.map((ele,ind) => (
                <option value={ele} key={'option'+ind}>{ele}</option>
              ))
            }
          </select>
        </div>
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
      {
        searchResult.length!==0 && (
          <div className='PaginationContainer'>
            <button className='PaginationPrevBtn' onClick={() => setPage(page-1)} disabled={page===1}>PREV</button>
            <span style={{fontWeight:'500'}}>{page} of {totalPage}</span>
            <button className='PaginationNextBtn' onClick={() => setPage(page+1)} disabled={page===totalPage}>NEXT</button>
          </div>
        )
      }
    </div>
  )
}

export default Searchbar;