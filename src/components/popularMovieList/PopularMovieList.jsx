import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { PopularMovieListStyle } from './PopularMovieListStyle.styled';

import NoPoster from '..//..//images/no-photo.jpg';



 const  PopularMoviesList = ({ trendFilms, searchResults}) => {
  const location = useLocation();
  const [arrayList, setArrayList] = useState([]);
  const isHomePage = location.pathname === "/";


  useEffect(() => {
    const films = trendFilms || searchResults;

    if (!films) {
      return;
    }


    const promises = films.map(item => {
      if (!item.poster_path) {
        return Promise.resolve();
      }

      return new Promise(({resolve, reject}) => {
        const img = new Image();
        img.src = `https://image.tmdb.org/t/p/original/${item.poster_path}`;
        img.onload = resolve;
        img.onerror = reject;
      });
    });


    Promise.all(promises)
      .then(() => {
      })
      .catch(() => {
        console.log('Error loading images');
      });
      setArrayList(films);
  }, [trendFilms, searchResults]);


  const createMovieDetailsURL = movieID => {
    return `/movies/${movieID}`;
  };



  return (


      <PopularMovieListStyle>
         {isHomePage && <h1 className='hero-section-title'>Trending Movies</h1>}
        <ul className='movie-list'>
          {arrayList.map(item => (
            <li className='movie-item' key={item.id}>
              <div className='movie-preview'>
                <Link
                  style={{ textDecoration: 'none', color: 'black' }}
                  to={createMovieDetailsURL(item.id)}
                  state={{ from: location }}
                >
                  <img
                    className='movie-img'
                    width={210}
                    height={315}
                    loading='lazy'
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/original/${item.poster_path}`
                        :  NoPoster
                    }
                    alt={item.title}
                    onError={error => {
                      error.target.src = NoPoster;

                    }}
                  />
                <p className='film-name'>{item.title}</p>
                </Link>
              </div>
            </li>
          ))}
        </ul>
        </PopularMovieListStyle>
    )
};


 



export default PopularMoviesList;