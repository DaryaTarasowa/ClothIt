import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import {Grid, Segment, Header, Image} from 'semantic-ui-react';

// Import Style
//import styles from './ClothListItem.css';

function ClothListItem(props) {

    let picture_url = props.cloth.picture;
	//let picture_url = '/assets/images/hmprod\(9\).jpg';


    let style = {
    	//background: `#eee `, //TODO need to handle error of loading the image
    //   backgroundSize: "100% 100%",
		backgroundImage: "url('" + picture_url + "')",
		//backgroundImage: '"url(' + picture_url + ')"',
		backgroundSize: "100% 100%",
    }

  return (
    <Grid.Column>
        <Segment style={style}>
          <Header as ='h3'>
            <Link to={`/clothes/${props.cloth.slug}-${props.cloth.cuid}`} >
              {props.cloth.name}
            </Link>
          </Header>





          <p className='author-name'><FormattedMessage id="by" /> {props.cloth.brand}</p>
          <p className='post-desc'>{props.cloth.description}</p>
          <p className='post-action'><a href="#" onClick={props.onDelete}><FormattedMessage id="deleteCloth" /></a></p>
        </Segment>
    </Grid.Column>
  );
}

ClothListItem.propTypes = {
  cloth: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bodypart: PropTypes.string.isRequired,
      brand: PropTypes.string.isRequired,
      size: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      fabric: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ClothListItem;
