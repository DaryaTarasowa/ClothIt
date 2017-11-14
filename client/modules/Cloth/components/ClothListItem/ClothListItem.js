import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import {Grid, Segment, Header, Image} from 'semantic-ui-react';

// Import Style
import styles from './ClothListItem.css';

function ClothListItem(props) {
    const picture_url = 'landing_logo.jpg';
    const picture = require(`images/${picture_url}`);
    console.log(picture);
    //let picture = <Image src=require(`${picture_url}`)/>;
    let style = {
     background: '#eee' // url(picture), //TODO need to handle error of loading the image
    //   backgroundSize: "100% 100%",
    }

  return (
    <Grid.Column>
        <Segment style={style}>
          <Header as ='h3'>
            <Link to={`/clothes/${props.cloth.slug}-${props.cloth.cuid}`} >
              {props.cloth.name}
            </Link>
          </Header>
          {/* <Image src={require(props.cloth.picture)}/>
          <Image src={picture} centered/>
          */}


          <p className={styles['author-name']}><FormattedMessage id="by" /> {props.cloth.brand}</p>
          <p className={styles['post-desc']}>{props.cloth.description}</p>
          <p className={styles['post-action']}><a href="#" onClick={props.onDelete}><FormattedMessage id="deleteCloth" /></a></p>
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
