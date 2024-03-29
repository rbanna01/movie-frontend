import React from 'react';
import PropTypes from 'prop-types';
import SaveIcon from './images/save-line.svg';
import CancelIcon from './images/close-circle-line.svg'; 
import ActionIcon from './ActionIcon.js'; 
import $ from 'jquery';
import './movieItemEdit.css';
import {Movie} from './MovieItem';
 
export class Props {
	key: number;
	movie: Movie;
	saveClicked: (Movie) => void
	cancelClicked: () => void
}

 export function MovieItemEdit(props: Props)
 {
	 const errorClass = 'movieItemEditError';
	 const {key, movie, saveClicked, cancelClicked} = props;
	 
	function removeErrorValues(el)
	{
		el.classList.remove(errorClass); 
		el.title = '';
	}
	
	function addErrorValues(el, tooltipText)
	{
		el.title += tooltipText;
		el.classList.add(errorClass);
	}
	 
  function clickHandler(evt)
  {
	  var rowElement = evt.target.parentElement.parentElement;
	  
	  var nameElement = $(rowElement).find('.movieItemName')[0];
	  
	  var filmingStartedElement = $(rowElement).find('.movieFilmingStarted')[0]; 
	  var filmingEndedElement = $(rowElement).find('.movieFilmingEnded')[0];
	  
	  rowElement.title = nameElement.title = filmingStartedElement.title = filmingEndedElement.title = '';
	  var toDelete = rowElement.getElementsByClassName('errorIcon')
	  for(var i = 0; i < toDelete.length; i++)
	  {
		  toDelete.parentElement.delete(toDelete);  
	  }
	  
	  var error = false;
	  //validate:
	  if(nameElement.value.length === 0)
	  {
		  error = true;
		  addErrorValues(nameElement, '"Name" field must not be blank!');
		  //Name input invalid
	  }
	  else 
	  {
		  removeErrorValues(nameElement);
	  }
	  
	  if(filmingStartedElement.value.length === 0)
	  {
    	 error = true;
	     addErrorValues(filmingStartedElement, '"Filming started" must not be blank!');
	  }
	  else 
	  {
		 removeErrorValues (filmingStartedElement);
	  }
	  
	  if(filmingEndedElement.value.length === 0)
	  {
		  error = true;
		 addErrorValues(filmingEndedElement, '"Filming ended" field must not be blank!');
	  }
	  else
	  {
		  removeErrorValues(filmingEndedElement);
	  }
	  
	  if( filmingStartedElement.value.length !== 0 
	       && filmingEndedElement.value.length !== 0
	       && filmingEndedElement.value < filmingStartedElement.value)
	  {
		  error = true;
		  addErrorValues(filmingStartedElement, '"Filming started" must be before "Filming ended"');
		  addErrorValues(filmingEndedElement, '"Filming started" must be before "Filming ended"');
	  }
	  
	  if(!error)
	  {
		//Set validation message and invalid flag?
        var arg = {
			id: rowElement.attributes['itemID'].value,
			name : nameElement.value,
			filmingStarted: filmingStartedElement.value,
			filmingEnded: filmingEndedElement.value,
			language: 1
		};
		saveClicked(arg);		
	  }
  }

function numberToDateFormat(number)
{
	if(number < 10)
	{
		return '0' + number;
	}
	else
	{
		return number;
	}
}
function getDateOrEmptyStringFromInput(inputDate: Date)
{
		return String(inputDate.getFullYear()).padStart(4, '0') 
		+ '-' 
		+ numberToDateFormat(inputDate.getMonth() + 1) 
		+ '-' 
		+ numberToDateFormat(inputDate.getDate());
}

 return (<>
         <tr key={key} className="movieItem" itemID={movie.id}>
	     <td><input className="movieItemName movieItemEditField" type="text" defaultValue={movie.name}/></td>
		 <td><input type="date" className="movieFilmingStarted movieItemEditField" defaultValue ={getDateOrEmptyStringFromInput(movie.filmingStarted)}/></td>
		 <td><input type="date" className="movieFilmingEnded movieItemEditField" defaultValue ={getDateOrEmptyStringFromInput(movie.filmingEnded)}/></td>
		 <td className="movieRowIcon movieSave" ><ActionIcon imageURL={SaveIcon} tooltipText="Save" clickHandler={clickHandler}/></td>
         <td className="movieRowIcon movieCancelEdit"><ActionIcon imageURL={CancelIcon} tooltipText="Cancel" clickHandler={cancelClicked}/></td>
	  </tr>
	 </>
	  
    );
	}
export default MovieItemEdit;
