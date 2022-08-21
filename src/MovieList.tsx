import {useState} from 'react';
import './movieList.css';
import {MovieItem, Movie } from './MovieItem';
import MovieItemEdit from './MovieItemEdit';
import AddItemRow from './AddItemRow';
export class Props {
	movies: Movie[];
	deleteCallback: (id) => void;
	savingCallback: (m: Movie) => void
}

class EditingIndexConstants {
	static editingNothing = -1;
	static editingNewItem = -2;
}

function MovieList(props: Props)
{
	const [editingId, setEditingID] = useState(EditingIndexConstants.editingNothing)
	const {movies, deleteCallback, savingCallback} = props;

    function onSaveClicked(movieInput: Movie) 
    {
	    setEditingID(EditingIndexConstants.editingNothing);
	    savingCallback(movieInput);
    }

        return (
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
			{
			movies.map((movie) => 
				{ 
				    if(editingId === movie.id)
				    {
				    	return <MovieItemEdit key={movie.id} movie={movie} 
						saveClicked = {(movieToSave) => {
							onSaveClicked(movieToSave);
						}} 
		                cancelClicked = {() => setEditingID(EditingIndexConstants.editingNothing)} />;
		            }
		            else 
		            {
		            	return <MovieItem key={movie.id} movie={movie} editClicked = {() => setEditingID(movie.id)} 
		            	deleteConfirmed={() => deleteCallback(movie.id)}
						/>;
		            }
			})}
			<AddItemRow key={EditingIndexConstants.editingNewItem} saveClicked={onSaveClicked} 
			    editing={editingId === EditingIndexConstants.editingNewItem} 
			    setEditingFunc={() => setEditingID(EditingIndexConstants.editingNewItem)}/>
			</tbody>
		</table>
	</div>
 );
}

export { MovieList };