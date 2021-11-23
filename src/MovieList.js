import React from 'react';
import './movieList.css';
import MovieItem from './MovieItem.js';
import MovieItemEdit from './MovieItemEdit.js';
import AddItemRow from './AddItemRow.js';

class MovieList extends React.Component 
{
	state = {
		moviesToShow: [],
		itemBeingEdited: -1
	};
	
	deleteMovie(id)
	{
		var URI = 'https://localhost:44364/api/movies/' + id; 
		fetch(URI,
		{
		 method: "DELETE"
		});
		console.log('delete movie with ID: ' + id);
	}
	
	refreshMovies()
	{
	   const URI = 'https://localhost:44364/api/movies/';
	   fetch(URI, 
	   { 
	   	method: 'GET',
	   	headers: {
	   		'Accept': 'application/json',
	   		'Content-Type': 'application/json'
	   	}
	   }).then(response => response.json())
	   .then(x =>  {
		      this.setState({ moviesToShow: x, itemBeingEdited: -1});
	    })
	    .catch(error => console.log(error));	
	}
	    
	componentDidMount() 
	{
		this.refreshMovies();
		return true;
	}
	
  render() {		
  var items = this.state.moviesToShow;
  var idBeingEdited = this.state.itemBeingEdited;
  var deleteFunc = this.deleteMovie;
  var editingNothing = -1;
  var editingNewItem = 0;
  var refresh = () => 
  {
	  const URI = 'https://localhost:44364/api/movies/';
	  fetch(URI, 
	  { 
	  	method: 'GET',
	  	headers: {
	  		'Accept': 'application/json',
	  		'Content-Type': 'application/json'
	    }
	  })
	  .then(response => response.json()) 
	  .then(x =>  this.setState({ moviesToShow: x, itemBeingEdited: editingNothing}));
  };
  var nothingBeingEdited = () => this.setState({itemBeingEdited: editingNothing});
  var saveNewMovie = (toSave) => 
							{
							    var toSend = JSON.stringify(toSave);
		                        var URI ='https://localhost:44364/api/movies/';
		                        
		                        fetch(URI,
		                        {
		                        	method: "POST",
		                        	headers: {
		                        	'Content-Type': 'application/json'
		                        	},
		                        	body: toSend
		                        })
							    .then((reponse) =>
		                        {
									refresh();
									nothingBeingEdited();
		                        });
                             };
  return (
	<>
	  <div className="movieList">
		<table className="itemList">
			<thead>
				<tr>
					<td>Name</td>
					<td>Filming Started</td>
					<td>Filming Ended</td>
					<td></td>
					<td></td>
				</tr>
			</thead>
			<tbody>
			{items.map((movie) => 
				{ 
				    if(idBeingEdited === movie.id)
				    {
				    	return <MovieItemEdit key={movie.id} movie={movie} 
						saveClicked = {(toSave) => 
							              {
							                 var toSend = JSON.stringify(toSave);
		                                     var URI ='https://localhost:44364/api/movies/' + toSave.id;
		                                     
		                                     fetch(URI,
		                                     {
		                                     	method: "PUT",
		                                     	headers: {
		                                     	'Content-Type': 'application/json'
		                                     	},
		                                     	body: toSend
		                                     })
							                 .then(() =>
		                                          {
		                  	                          refresh();
		                                           });
						}} 
		                cancelClicked = {() => nothingBeingEdited()} />;
		            }
		            else 
		            {
		            	return <MovieItem key={movie.id} movie={movie} editClicked = {() => this.setState({ itemBeingEdited: movie.id })} 
		            	deleteConfirmed = {() => 
						{ 
						    var URI = 'https://localhost:44364/api/movies/' + movie.id; 
		                    fetch(URI,
		                    {
		                     method: "DELETE"
		                    })
							.then( () =>
							 {
		                           refresh();
								   nothingBeingEdited();
							});
					    }} 
						/>;
		            }
			})}
			<AddItemRow saveClicked= {saveNewMovie} editing = {idBeingEdited === editingNewItem} setEditingFunc={(isCurrentlyEditing) => {
                      if(isCurrentlyEditing) this.setState({itemBeingEdited: editingNewItem});
					  else nothingBeingEdited();
			}}/>
			</tbody>
		</table>
	  </div>
	</>
 );
  } 
 }


export default MovieList;