import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Import Style
//import styles from '../../components/ClothListItem/ClothListItem.css';

// Import Actions
import { fetchCloth } from '../../ClothActions';

// Import Selectors
import { getCloth } from '../../ClothReducer';



export function ClothDetailPage(props) {
  return (
    <div>
      <Helmet title={props.cloth.name} />
      <div className='single-post post-detail'>
        <h3 className='post-title'><img src={props.cloth.picture}/></h3>
        <p className='author-name'><FormattedMessage id="by" /> {props.cloth.brand}</p>
        <p className='post-desc'>{props.cloth.bodypart}</p>
        <p className='post-desc'>{props.cloth.size}</p>
        <p className='post-desc'>{props.cloth.color}</p>
        <p className='post-desc'>{props.cloth.fabric}</p>
        <p className='post-desc'>{props.cloth.dateAdded}</p>
      </div>
    </div>
  );
}

// Actions required to provide data for this component to render in sever side.
ClothDetailPage.need = [params => {
  return fetchCloth(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    cloth: getCloth(state, props.params.cuid),
  };
}



ClothDetailPage.propTypes = {
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
};

export default connect(mapStateToProps)(ClothDetailPage);
