import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { getMovieData } from '../constants/agents'
import { MOVIE_CLEAR, TOGGLE_MOVIE } from '../constants/actionTypes'
import moment from 'moment'
import ReactLoading from 'react-loading'

const mapStateToProps = (state) => {
	return {...state.moviepage, myList:state.movielist}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getMovie: imdbID => dispatch(getMovieData(imdbID)),
		clearMovie: () => dispatch({type: MOVIE_CLEAR}),
		toggleMovie: imdbID => dispatch({type: TOGGLE_MOVIE, id: imdbID}),
	}
}


class Movie extends React.Component {

	constructor() {
		super()
		
	}

	componentDidMount() {
		this.imdbID = this.props.match.params.imdbid
		this.props.getMovie(this.imdbID) 
	}

	componentWillUnmount() {
		this.props.clearMovie()
	}

	renderWatchButton() {
		let index = this.props.myList.findIndex(x => x.imdbID == this.imdbID )
		let buttonText


		if (this.props.myList[index] == undefined) {
			return
		}

		if (this.props.myList[index].isWatching) {
			buttonText = 'watching' 
		} else {
			buttonText = 'watch'
			if (this.props.myList[index].lastWatch) {
				buttonText = 'watch again'
			}
		}

		return	<div><button onClick={()=>this.props.toggleMovie(index)} className="btn btn-warning">
					{buttonText} 
					</button>
					<br/><br/>
					{this.props.myList[index].lastWatch && <p className="text-muted"><strong>last watched {moment(this.props.myList[index].lastWatch).fromNow()} </strong></p>}
				</div>

	}


	render() {
	return (
		<div>
			{this.props.data && 
				<div>
					<div className="d-flex align-items-center">
						<div style={{width: 180}} className="poster">
							<img className="rounded w-100" style={{objectFit: 'cover'}} src={this.props.data.Poster}/>
							<span><i className="fas fa-video"></i>  {this.props.data.Type}</span>
							<SeasonTag data={this.props.data.totalSeasons} />
							
						</div>
						<div className='p-4'>
							<h2>{this.props.data.Title}</h2>
							<p><i className='fas fa-calendar pr-2 text-muted'></i>{this.props.data.Year}</p>
							<p><i className='fas fa-clock pr-2 text-muted'></i>{this.props.data.Runtime}</p>
							<p><i className='fas fa-quote-right pr-2 text-muted'></i>{this.props.data.Genre}</p>
							{this.renderWatchButton()}

						</div>	
					</div>

					<div className='my-4'>
						<h6 className='text-muted'>Plot</h6>
						<p>{this.props.data.Plot}</p>
					</div>

					<RatingPanel data={this.props.data.Ratings} />

				</div>
			}			



			{this.props.inProgress && <ReactLoading color="#3498db" type="spin" className="m-auto"/>}
			{this.props.error && <p className="text-warning">something went wrong :/</p>}
		</div>

	)}

}

//render only child components
function RatingPanel(props) {
	let ratings = {
		"Internet Movie Database": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/250px-IMDB_Logo_2016.svg.png",
		"Rotten Tomatoes": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Rotten_Tomatoes.svg/30px-Rotten_Tomatoes.svg.png",
		"Metacritic": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Metacritic.svg/88px-Metacritic.svg.png",
	}


	return (
		<div className='d-flex justify-content-between '>	
			{props.data.map(x => {
				return (<div className='d-flex flex-column align-items-center'>	
					<img width='30' height='30' src={ratings[x.Source]} />
					<span style={{letterSpacing: 2}} className='text-muted pt-2'><strong>{x.Value}</strong></span>
				</div>)
			})}
		</div>
	)
}

function SeasonTag(props) {
	if (props.data) {
		let sn = props.data

		return <i> {sn} { sn > 1 ? 'seasons' : 'season'}</i>
	} else {
		return null
	}

}



export default connect(mapStateToProps,mapDispatchToProps)(Movie)