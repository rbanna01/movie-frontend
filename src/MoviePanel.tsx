import {MovieList} from './MovieList'
import {NameSearch, NameSearchOption} from './NameSearch'
import {useState} from 'react'
import { Movie} from './MovieItem'


export class NameSearchData {
	searchString: string;
	option: NameSearchOption;
}

export class MoviePanelState {
	nameSearchData: NameSearchData;
	movies: Movie[];
}

function MoviePanel() {
	const searchDefaults: MoviePanelState = { 
		nameSearchData: { searchString: '', option: 0},
		movies: []
	};
	
    const [searchState, setSearchState] = useState(searchDefaults)

	function reduceState(state: MoviePanelState, updateToApply: NameSearchData): MoviePanelState
	{
		return {
			...state,
			 nameSearchData: updateToApply,
		};
	}

	function deleteMovie(id)
	{
		var URI = 'https://localhost:44364/api/movies/' + id; 
		fetch(URI,
		{
		 method: "DELETE"
		});
	}
	
	function refreshMovies(filterData: NameSearchData) 
	{

		if(filterData 
			&& filterData.searchString
			&& filterData.searchString !== '') {
            const URI = `https://localhost:44364/api/movies/byNameFilter`;
			return fetch(URI, 
			{ 
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
				   searchstring: filterData.searchString,
				   option: filterData.option	
			 }),
			}).then(response => response.json()) 
			.then(x =>  {
				setSearchState({...searchState, movies: mapMoviesFromJSON(x) });			 
			})
			 .catch(error => console.log(error));
		}
		else {
			const URI = 'https://localhost:44364/api/movies/';
			return fetch(URI, 
			{ 
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
			}).then(response => response.json())
			.then(x =>  {
				   setSearchState({...searchState, movies: mapMoviesFromJSON(x) });
			 })
			 .catch(error => console.log(error));
		}
	}

	function saveCallback(toSave: Movie)  
	{
		var toSend = JSON.stringify(toSave);
		var URI = toSave.id == 0 ? 'https://localhost:44364/api/movies/' //new movie 
		                         : 'https://localhost:44364/api/movies/' + toSave.id;
		                                     
		fetch(URI,
		{
		    method: "POST",
		    headers: {
		            'Content-Type': 'application/json'
		            },
		    body: toSend
		})
		.then(() =>
		{
			refreshMovies(searchState.nameSearchData);
		});
	}
    
	function mapMoviesFromJSON(movieSetJSON: any): Movie[] 
    {
	    return movieSetJSON.map(dataItem => new Movie(dataItem.id, dataItem.name, new Date(dataItem.filmingStarted), new Date(dataItem.filmingEnded)));
    }
    //refreshMovies(searchState.nameSearchData);
	return (
	<>
	   <div className="panelFilters">
	   <NameSearch inputState={searchState.nameSearchData} 
	    blurHandler={(nameSearchState)=> {
			setSearchState(reduceState(searchState, nameSearchState));
			refreshMovies(searchState.nameSearchData);
		}}/>
	   </div>
	   <div className="panelResults">
	   <MovieList movies={searchState.movies} savingCallback={saveCallback} deleteCallback={deleteMovie}/>
	   </div>
	</>
	);
}

export default MoviePanel;