import { CHANGE_FILTER } from '../constants/actionTypes'
import produce from 'immer'


export default produce((draft = 0,action) => {
	switch(action.type) {
		case CHANGE_FILTER:
			return action.data

		default:
			return draft
	}
})
