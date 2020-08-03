import React from 'react'
import ResultItem from './ResultItem'
import { connect } from 'react-redux'
import { ADD_MOVIE, CHANGE_FILTER } from '../constants/actionTypes'

const mapStateToProps = (state) => {
	return {
		savedList: state.movielist,
		filterId: state.moviefilter,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateFilter: (filterId) => dispatch({type: CHANGE_FILTER, data: filterId }),
	}
}



function Home(props) {
	let filters = ['All','Watched','Watching','Unwatched']
	let filterTitles = ['All Movies','Watched Before','Currently Watching','Never Watched']

	function _filterList() {
		switch(props.filterId) {
			case 1:
				return props.savedList.filter((x,i)=> x.lastWatch !== undefined)
			case 2:
				return props.savedList.filter((x,i) => x.isWatching )
			case 3:
				return props.savedList.filter((x,i) => x.lastWatch === undefined && !x.isWatching )
			default:
				return props.savedList
		}
	}

	return (
	<div>
		<h2> {filterTitles[props.filterId]} </h2>
		<br/>
		<div className='btn-group btn-group-toggle btn-block mb-4'>
			{
				filters.map((x,i)=>{
					return <button onClick={()=>props.updateFilter(i)} className={'btn btn-dark'+ (i == props.filterId && ' active') }>{x}</button>
				})
			}
		</div>
		<ul className='list-group'>
			{_filterList().map((x,i) => <ResultItem data={x}/>)}
		</ul>


	</div>
	)
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)