import React from 'react';
import PropTypes from 'prop-types';
import './movieItem.css';
import ActionIcon from './ActionIcon.js';
import editLine from './delete-row.svg';
import pencilLine from './pencil-line.svg';

function MovieItem ({movie, editClicked, deleteConfirmed}) 

{
	return (
         <tr className="movieItem" itemID={movie.id}>
	     <td className="movieItemName">{movie.name}</td>
		 <td className="movieFilmingStarted">{new Date(movie.filmingStarted).toDateString()}</td>
		 <td className="movieFilmingEnded">  {new Date(movie.filmingEnded).toDateString()}</td>
		 <td className="movieRowIcon movieEdit" ><ActionIcon imageURL={pencilLine} tooltipText="Edit" clickHandler={editClicked}/></td>
         <td className="movieRowIcon movieDelete"><ActionIcon imageURL={editLine} tooltipText="Delete" 
		 clickHandler={() => 
		 {
		    if(window.confirm('Delete entry "' + movie.name + '"?')) 
			{
			   deleteConfirmed.call();
		    }
		 }}/>
		</td>
	  </tr>
    );
}

MovieItem.propTypes = 
{
	movie: PropTypes.shape ({
		id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	 filmingStarted: PropTypes.string.isRequired,
	 filmingEnded: PropTypes.string.isRequired,
	}).isRequired,
	editClicked: PropTypes.func,
	deleteClicked: PropTypes.func
};

export default MovieItem;
