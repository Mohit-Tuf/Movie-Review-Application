import './App.css';
import api from './api/axiosConfig';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './components/Layout';
import {Routes, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';
import NotFound from './components/notFound/NotFound';



function App() {

  const[movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);

  
  const getMovies = async ()=>{

    // useEffect(() => {
    //   const getMovies = async () => {
    //     try {
    //       const response = await axios.get('http://localhost:8080/api/v1/movie');
    //       console.log(response.data);
    //       setMovies(response.data);
    //     } catch (error) {
    //       console.error('Error fetching movies:', error);
    //     }
    //   };
  
    //   getMovies();
    // }, []);

    try {

      // const response = await axios.get("/api/v1/movie");
      const response = await axios.get('http://localhost:8080/api/v1/movie');


      // console.log(response.data);
    
      setMovies(response.data)
      
    } catch (error) {
      console.log(error);
    }

    
  }

  const getMovieData = async (movieId) => {
     
    try 
    {
     
        const response = await api.get(`http://localhost:8080/api/v1/movie/${movieId}`);

        const singleMovie = response.data;

        setMovie(singleMovie);

        setReviews(singleMovie.reviews);
        

    } 
    catch (error) 
    {
      console.error(error);
    }

  }

  useEffect(()=>{
    getMovies();
  },[])

  return (
    <div className="App">
      
      <Header/>
      <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="/" element={<Home movies={movies} />} ></Route>
            <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}></Route>
            <Route path="/Reviews/:movieId" element ={<Reviews getMovieData = {getMovieData} movie={movie} reviews ={reviews} setReviews = {setReviews} />}></Route>
            <Route path="*" element = {<NotFound/>}></Route>
          </Route>
      </Routes>


    </div>
  );
}

export default App;
