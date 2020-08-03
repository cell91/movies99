import { combineReducers } from 'redux'

import movielist from './movielist'
import moviesearch from './moviesearch'
import moviepage from './moviepage'
import moviefilter from './moviefilter'

export default combineReducers({
	movielist,
	moviesearch,
	moviepage,
	moviefilter,
})