import React, { PropTypes } from 'react';

// Import Components
import ClothListItem from './ClothListItem/ClothListItem';
import {Grid, Segment} from 'semantic-ui-react';

//import styles from './ClothList.css';

function ClothList(props) {
  	return (
      	<Segment padded='very'>
		    <Grid className='listview' columns={5} doubling>
			    {
			        props.clothes.map(cloth => (
				        <ClothListItem
				            cloth={cloth}
				            key={cloth.cuid}
				            onDelete={() => props.handleDeleteCloth(cloth.cuid)}
				        />
			        ))
			    }
		    </Grid>
    	</Segment>
  	);
}

ClothList.propTypes = {
  clothes: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      bodypart: PropTypes.string.isRequired,
      brand: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      cuid: PropTypes.string.isRequired,
  })).isRequired,
  handleDeleteCloth: PropTypes.func.isRequired,
};

export default ClothList;
