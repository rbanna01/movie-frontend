import React from 'react';
import PropTypes from 'prop-types';
import './movieItem.css';
import ActionIcon from './ActionIcon.js';
import editLine from './delete-row.svg';
import pencilLine from './pencil-line.svg';

export class Movie {
	id: number;
	language?: number;
	name: string;
	filmingStarted?: Date;
	filmingEnded?: Date;

	constructor(id: number, name: string, filmingStarted: Date, filmingEnded: Date)
	{
		this.id = id;
		this.name = name;
		this.filmingStarted= filmingStarted;
		this.filmingEnded= filmingEnded;
	}
}

export class ItemProps {
	key: number;
     movie: Movie;
     editClicked: () => void;
	 deleteConfirmed: () => void;
}


export function MovieItem (props: ItemProps) 
{
	const { movie, editClicked, deleteConfirmed} = props;
	return (
         <tr className="movieItem" key={props.key} itemID={movie.id}>
	     <td className="movieItemName">{movie.name}</td>
		 <td className="movieFilmingStarted">{(movie.filmingStarted).toDateString()}</td>
		 <td className="movieFilmingEnded">  {(movie.filmingEnded).toDateString()}</td>
		 <td className="movieRowIcon movieEdit" ><ActionIcon imageURL={pencilLine} tooltipText="Edit" clickHandler={editClicked}/></td>
         <td className="movieRowIcon movieDelete"><ActionIcon imageURL={editLine} tooltipText="Delete" 
		 clickHandler={() => 
		 {
		    if(window.confirm('Delete entry "' + movie.name + '"?')) 
			{
			   deleteConfirmed();
		    }
		 }}/>
		</td>
	  </tr>
    );
}


export default MovieItem;
