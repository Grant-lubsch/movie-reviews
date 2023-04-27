import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setMovieList] = useState([]);

  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3007/api/get").then((response) => {
      setMovieList(response.data);
    });
  }, []);

  const submitReview = () => {
    Axios.post("http://localhost:3007/api/insert", {
      movieName: movieName,
      movieReview: review,
    });

    setMovieList([
      ...movieReviewList,
      { movieName: movieName, movieReview: review },
    ]);
  };

  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3007/api/delete/${movie}`).then(
      (response) => {
        setMovieList(movieReviewList.filter((val) => val.movieName !== movie));
      }
    );
  };

  const updateReview = (movie) => {
    Axios.put("http://localhost:3007/api/update", {
      movieName: movie,
      movieReview: newReview,
    }).then((response) => {
      setMovieList(
        movieReviewList.map((val) => {
          if (val.movieName === movie) {
            val.movieReview = newReview;
          }
          return val;
        })
      );
    });
    setNewReview("");
  };

  return (
    <div className="App">
      <h1>CRUD Movie Reviews</h1>
      <div className="form">
        <label>Movie Name:</label>
        <input
          type="text"
          name="movieName"
          onChange={(e) => {
            setMovieName(e.target.value);
          }}
        />
        <label>Movie Review:</label>
        <input
          type="text"
          name="review"
          onChange={(e) => {
            setReview(e.target.value);
          }}
        />

        <button onClick={submitReview}>Submit</button>

        {movieReviewList.map((val) => {
          return (
            <div className="card">
              <h1>{val.movieName}</h1>
              <p>Movie Review: {val.movieReview}</p>

              <button
                onClick={() => {
                  deleteReview(val.movieName);
                }}
              >
                Delete
              </button>
              <input
                type="text"
                id="updateInput"
                onChange={(e) => {
                  setNewReview(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  updateReview(val.movieName);
                }}
              >
                Update
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
