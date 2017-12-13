import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import {Grid, Segment, Header, Image} from 'semantic-ui-react';

// Import Style
//import styles from './ClothListItem.css';

function ClothListItem(props) {
	let style = {};
    let sample = '/assets/images/' + props.cloth.bodypart + '_sample.png';
	let picture_color = '#fff';
	if (!props.cloth.picture){
		picture_color = props.cloth.color;
		switch (props.cloth.color) {
			case 'blue':
				picture_color = '#0085da';
				break;
			case 'red':
				picture_color = '#e63441';
				break;
			case 'green':
				picture_color = '#00af1d';
				break;
			// case 'orange':
			// 	picture_color = 'orange';
			// 	break;
			// case 'yellow':
			// 	picture_color = 'yellow';
				break;
			case 'white':
				picture_color = '#ffffff';
				break;
			case 'grey':
				picture_color = '#777777';
				break;
			case 'black':
				picture_color = '#111111';
				break;
			// case 'purple':
			// 	picture_color = 'purple';
			// 	break;
			// case 'teal':
			// 	picture_color = 'teal';
			// 	break;
			// case 'pink':
			// 	picture_color = 'pink';
			// 	break;
			// case 'navy':
			// 	picture_color = 'navy';
				break;
			case 'brown':
				picture_color = '#723e00';
				break;
			case 'beige':
				picture_color = '#d8bd9d';
				break;
		};
		style={
			background: picture_color + " url('" + sample + "') no-repeat",
			backgroundSize: "auto 100%",
			backgroundPosition: "center center",

		}
	}else{
		let picture_url = props.cloth.picture;
		style = {
			background: "no-repeat, no-repeat",
			backgroundColor: picture_color, //TODO need to handle error of loading the image
			backgroundImage: "url('" + sample + "'), url('" + picture_url + "')",
			backgroundSize: "auto 100%, auto",
			backgroundPosition: "center, center center ",
		}
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
      slug: PropTypes.string.isRequired,
      cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ClothListItem;
