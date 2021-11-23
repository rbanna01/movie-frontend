import PropTypes from 'prop-types';
import React from 'react';
import './actionIcon.css';

function ActionIcon({ imageURL, tooltipText, clickHandler})
{
	return (
		 <>
		   <img className="actionIcon" src={imageURL} title={tooltipText} alt={tooltipText} onClick={clickHandler} /> 
		 </>
		 );
}

 ActionIcon.propTypes = {
	imageURL: PropTypes.string.isRequired,
	tooltipText: PropTypes.string.isRequired,
	clickHandler: PropTypes.func
 }

export default ActionIcon