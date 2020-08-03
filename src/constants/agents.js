import {
	SEARCH_ASYNC_START,
	SEARCH_ASYNC_SUCCESS,
	SEARCH_ASYNC_ERROR,

	MOVIE_ASYNC_START,
	MOVIE_ASYNC_SUCCESS,
	MOVIE_ASYNC_ERROR

} from './actionTypes'


const BASE_URL = 'https://omdbapi.com/?apikey=5fb249fa&'


//one goodest thunk
export const getSearchResults = (search) => {
	return (dispatch) => {
		dispatch({type: SEARCH_ASYNC_START})
		return fetch(BASE_URL+'s='+search)
		.then(body => body.json())
		.then(responce => dispatch({type: SEARCH_ASYNC_SUCCESS, payload: responce} ))
		.catch(error => dispatch({type: SEARCH_ASYNC_ERROR, error: error}))
	}
}

export const getMovieData = (imdbID) => {
	return (dispatch) => {
		dispatch({type: MOVIE_ASYNC_START})
		console.log('MOVIE DISPATCHED FROM agent')
		return fetch(BASE_URL+'i='+imdbID)
		.then(body => body.json())
		.then(response => dispatch({type: MOVIE_ASYNC_SUCCESS, payload: response} ))
		.catch(error => dispatch({type: MOVIE_ASYNC_ERROR, error: error}))
	}
}