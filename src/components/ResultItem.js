import React from 'react'
import { connect } from 'react-redux'
import { ADD_MOVIE, REMOVE_MOVIE } from '../constants/actionTypes'
import {Link} from 'react-router-dom'
import {useSpring, animated} from 'react-spring'


const mapDispatchToProps = dispatch => {
	return {
		addMovie: data => dispatch({type: ADD_MOVIE, data: data}),
		removeMovie: id => dispatch({type: REMOVE_MOVIE, id: id}),
	}
}

const mapStateToProps = state => {
	return {
		myList: state.movielist,

	}
}


function ResultItem(props) {
	//guess what this is called a component.
	function _renderLabel() {
		let index = props.myList.findIndex(x => x.imdbID == props.data.imdbID)

		if (!props.myList[index]) {
			return 
		}

		if (props.myList[index].isWatching) {
			return <strong className="text-success">watching</strong>
		}

	}

	//ok, scope problem
	function _renderFav() {
		let index = props.myList.findIndex(x => x.imdbID == props.data.imdbID)

		if (index > -1) {
			return <i  className="fas fa-heart h3 text-primary favicon" onClick={()=>props.removeMovie(index)}></i>
		} else {
			return <i className="far fa-heart h3 favicon" onClick={()=>props.addMovie(props.data)}></i>
		}
	}

	//anims
	const cssFadeIn = useSpring({
		from: {
			opacity: 0,
		},
		to: {
			opacity: 1,
		}
	})


	return (
		<animated.li style={cssFadeIn} className='list-group-item d-flex align-items-center'>
			<div>
				<img width='100' className="rounded" style={{objectFit: 'cover'}} src={props.data.Poster}/>
			</div>

			<div  className='p-4'>
				{_renderLabel()}
				<h4>{props.data.Title} </h4>
				<p>{props.data.Year}</p>

				<div style={{flexShrink: 0}} className='d-flex align-items-center'>
					<Link to={'/movie/'+props.data.imdbID} ><i className="fas fa-info-circle h3 mr-4"></i></Link>
					{_renderFav()}
					
				</div>
			</div>

			
		</animated.li>
	)
}

export default connect(mapStateToProps,mapDispatchToProps)(ResultItem)