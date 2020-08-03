import produce from 'immer'
import { MOVIE_ASYNC_START, MOVIE_ASYNC_SUCCESS, MOVIE_ASYNC_ERROR, MOVIE_CLEAR} from '../constants/actionTypes.js'


const _initState = {
	inProgress: false,
	error: null,
	data: null,
}

export default produce((draft=_initState , action) => {
	switch(action.type) {
		case MOVIE_ASYNC_START:
			draft.inProgress = true
			draft.error = null
			draft.data = null
			return draft

		case MOVIE_ASYNC_SUCCESS:
			draft.inProgress = false
			if (action.payload.Response == "True") {
				draft.data = {...action.payload}
			} else {
				draft.error = 'wrong imdb'
			}

			return draft

		case MOVIE_ASYNC_ERROR:
			draft.inProgress = false
			draft.error = 'something went wrong :/'
			return draft

		//this may be repated alot
		case MOVIE_CLEAR:
			return _initState

		default:
			return draft

	}

})