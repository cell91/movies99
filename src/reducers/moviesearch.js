import produce from 'immer'

import {
	SEARCH_ASYNC_START,
	SEARCH_ASYNC_SUCCESS,
	SEARCH_ASYNC_ERROR,
	SEARCH_CLEAR,
} from '../constants/actionTypes'

const _initState = {
	results: [],
	inProgress: false,
	error: null,
}


export default produce((draft=_initState,action) => {
	switch(action.type) {
		case SEARCH_ASYNC_START:
			draft.inProgress = true
			draft.results = []
			draft.error = null
			return draft

		case SEARCH_ASYNC_SUCCESS:
			draft.inProgress = false

			if (action.payload.Response == "True") {
				draft.results = action.payload.Search.slice(0,4)
			} else {
				draft.results = []
				draft.error = "...something went wrong"
			}
			return draft

		case SEARCH_ASYNC_ERROR:
			draft.inProgress = false
			return draft

		case SEARCH_CLEAR:
			draft.results = []
			return draft

		default:
			return draft
	}
})

