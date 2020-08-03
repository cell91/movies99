import produce from 'immer'
import { ADD_MOVIE, TOGGLE_MOVIE, REMOVE_MOVIE } from '../constants/actionTypes.js'
import moment from 'moment'


export default produce((draft=[],action) => {
	switch(action.type) {
		case ADD_MOVIE:
			if (!draft.some(x => x.imdbID == action.data.imdbID)) {
				draft.push({...action.data,isWatching: false})
			}
			return draft

		case TOGGLE_MOVIE:
			if (draft[action.id].isWatching) {
				draft[action.id].lastWatch = moment()
			}

			draft[action.id].isWatching = !draft[action.id].isWatching

			return draft

		case REMOVE_MOVIE:
			draft.splice(action.id,1)
			return draft

		default:
			return draft

	}

})