import React from 'react'
import { connect } from 'react-redux'
import { getSearchResults } from '../constants/agents'
import { SEARCH_CLEAR } from '../constants/actionTypes'

import { debounce } from "debounce";

import ResultItem from './ResultItem'
import ReactLoading from 'react-loading'

const mapStateToProps = state => {
	return {...state.moviesearch}
}

const mapDispatchToProps = dispatch => {
	return {
		searchMovie: search => dispatch(getSearchResults(search)),
		clearSearch: () => dispatch({type: SEARCH_CLEAR}),	
	}
}

class AddMovie extends React.Component {
	constructor() {
		super()
		
		this.debouncedSearch = debounce((e) => {
			if (e.target.value !== '') {
					this.props.searchMovie(e.target.value)
				}
		},800)

		this.handleChange = this.handleChange.bind(this)	
	}

	componentWillUnmount() {
		this.props.clearSearch()
	}

	handleChange(e) {
		e.persist()
		this.debouncedSearch(e)
	}


	render() {
		return (
			<div>
				<input 
				className='form-control form-control-lg' 
				placeholder='🔍 search for movies'
				value={this.props.searchText}
				onChange={this.handleChange}
				/>
				<br/>
				<ul className="list-group">
					{this.props.results.map((x,i) => <ResultItem data={x}/>)}
				</ul>

				{this.props.inProgress && <ReactLoading color="#3498db" type="spin" className="m-auto"/>}
				{this.props.error && <p className="text-warning"><strong>{this.props.error}</strong></p>}
			</div>
		)
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(AddMovie)