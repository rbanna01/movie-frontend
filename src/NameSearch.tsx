import { NameSearchData } from './MoviePanel';
export type NameSearchOption = 0 | 1 | 2
type NameSearchDataItem = {
	label: string;
	key: NameSearchOption;
}

const valueToLabelMap: NameSearchDataItem[] = 
	[
		{ key: 0,  label: 'contains'},
		{ key: 1, label: 'does not contain'},
	    {key: 2, label: 'exact match'}
	];

	class NameSearchProps {
		inputState: NameSearchData;
		 blurHandler: (input: NameSearchData) => void
	}

function NameSearch(props: NameSearchProps) {
	const {inputState, blurHandler} = props;
	function updateSearchOption(selectedOption: NameSearchOption)
	{
		var newState = 
		{
			    searchString: inputState.searchString,
                option: selectedOption,
		};
		blurHandler(newState);
	}

	function updateSearchText(text: string)
	{
		var newState = 
		{
			...inputState,
			searchString: text,
		};
		blurHandler(newState);
	}

	return (
	<div>
	   <div>
		    { valueToLabelMap.map((item) => 
			{
                const key = item.key;
				const value = item.label;
				const checkedString = inputState.option === key ? 'checked' : undefined; 
            	
				if(checkedString) 
				{
					return (<span key={key}>
						<label>{value}</label>
						<input type="radio" name="nameOptions" value = {value}
							onClick={e => updateSearchOption(key)} 
							defaultChecked
						   />
					</span>);
				}
				else {
				return (<span key={key}>
				    <label>{value}</label>
		            <input type="radio" name="nameOptions" value = {value}
				         onClick={e => updateSearchOption(key)}
					   />
			    </span>);
				}
			})
			}
	   </div>
	   <input type="text" id="txtName" defaultValue={inputState.searchString} onBlur={(e) => updateSearchText(e.target.value)} />//value= {inputState.searchString ?? ''}  
	</div>
	);
}

export { NameSearch}


