import React, {useState} from 'react';
import PropTypes from 'prop-types';
import icon from './images/add-circle-line.svg';
import ActionIcon from './ActionIcon';
import MovieItemEdit from './MovieItemEdit.js';

function AddItemRow({saveClicked, editing, setEditingFunc})
{
	if(editing)
    {
        return (
		  <>
             <MovieItemEdit 
			     movie={{ id: '0', name: '', filmingStarted: '', filmingEnded: ''}} 
			     saveClicked = {saveClicked} 
			     cancelClicked = {() => setEditingFunc(false)} />
		  </>
        );
    }
    else 
    {
        return (
		<>
           <tr>										
      	      <td><ActionIcon imageURL={icon} tooltipText="Add" clickHandler={() => setEditingFunc(true)}/></td>
      	      <td> </td>
      	      <td> </td>
      	   </tr>
		 </>
        );
    }
}

export default AddItemRow;