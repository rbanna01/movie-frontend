import React from 'react';
import icon from './images/add-circle-line.svg';
import ActionIcon from './ActionIcon';
import MovieItemEdit from './MovieItemEdit';

function AddItemRow({key, saveClicked, editing, setEditingFunc})
{
	if(editing)
    {
        return (
		  <>
             <MovieItemEdit 
			     key={key} movie={{ id: 0, language: 0, name: '', filmingStarted: new Date(), filmingEnded: new Date()}} 
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