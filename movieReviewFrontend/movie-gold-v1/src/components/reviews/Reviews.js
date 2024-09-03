import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';
import axios from 'axios';
import React from 'react';

// Default prop value to ensure reviews is an array
const Reviews = ({ getMovieData, movie, reviews = [], setReviews }) => {
    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;

    useEffect(() => {
        getMovieData(movieId);
    }, [movieId, getMovieData]);

    const addReview = async (e) => {
        e.preventDefault();
        const rev = revText.current;

        if (!rev || !rev.value) return; // Check if rev or rev.value is empty

        try {
            const response = await axios.post("http://localhost:8080/api/v1/review", {
                reviewBody: rev.value,
                imdbId: movieId
            });

            const newReview = response.data; // Ensure response contains the new review data
            const updatedReviews = [...reviews, newReview];
            
            rev.value = ""; // Clear the input field
            setReviews(updatedReviews); // Update the reviews state

        } catch (err) {
            console.error("Error adding review:", err);
        }
    };

    return (
        <Container>
            <Row>
                <Col><h3>Reviews</h3></Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <img src={movie?.poster} alt="" />
                </Col>
                <Col>
                    <Row>
                        <Col>
                            <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review?" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <hr />
                        </Col>
                    </Row>
                    {reviews.map((r, index) => (
                        <React.Fragment key={index}>
                            <Row>
                                <Col>{r.body}</Col>
                            </Row>
                            <Row>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                        </React.Fragment>
                    ))}
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
        </Container>
    );
};

export default Reviews;




// import {useEffect, useRef} from 'react';
// // import api from '../../api/axiosConfig';
// import {useParams} from 'react-router-dom';
// import {Container, Row, Col} from 'react-bootstrap';
// import ReviewForm from '../reviewForm/ReviewForm';

// import React from 'react'
// import axios from 'axios';

// const Reviews = ({getMovieData,movie,reviews = [],setReviews}) => {

//     const revText = useRef();
//     let params = useParams();
//     const movieId = params.movieId;

//     useEffect(()=>{
//         getMovieData(movieId);
//     },[movieId,getMovieData])

//     const addReview = async (e) =>{
//         e.preventDefault();

//         const rev = revText.current;

//         if (!rev || !rev.value) return; // Check if rev or rev.value is empty


//         try
//         {
//             const response = await axios.post("http://localhost:8080/api/v1/review",{reviewBody:rev.value,imdbId:movieId});

//             // const updatedReviews = [...reviews, {body:rev.value}];
//             const newReview = response.data; // Ensure response contains the new review data
//             const updatedReviews = [...reviews, newReview];

//             rev.value = "";
    
//             setReviews(updatedReviews);
//         }
//         catch(err)
//         {
//             console.error(err);
//         }
        



//     }

//   return (
//     <Container>
//         <Row>
//             <Col><h3>Reviews</h3></Col>
//         </Row>
//         <Row className="mt-2">
//             <Col>
//                 <img src={movie?.poster} alt="" />
//             </Col>
//             <Col>
//                 {
//                     <>
//                         <Row>
//                             <Col>
//                                 <ReviewForm handleSubmit={addReview} revText={revText} labelText = "Write a Review?" />  
//                             </Col>
//                         </Row>
//                         <Row>
//                             <Col>
//                                 <hr />
//                             </Col>
//                         </Row>
//                     </>
//                 }
//                 {
//                     reviews?.map((r) => {
//                         return(
//                             <>
//                                 <Row>
//                                     <Col>{r.body}</Col>
//                                 </Row>
//                                 <Row>
//                                     <Col>
//                                         <hr />
//                                     </Col>
//                                 </Row>                                
//                             </>
//                         )
//                     })
//                 }
//             </Col>
//         </Row>
//         <Row>
//             <Col>
//                 <hr />
//             </Col>
//         </Row>        
//     </Container>
//   )
// }

// export default Reviews;