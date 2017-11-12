import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './ClothListItem.css';

function ClothListItem(props) {
  return (
    <div className={styles['single-post']}>
      <h3 className={styles['post-title']}>
        <Link to={`/clothes/${props.cloth.slug}-${props.cloth.cuid}`} >
          {props.cloth.name}
        </Link>
      </h3>
      <p className={styles['author-name']}><FormattedMessage id="by" /> {props.cloth.brand}</p>
      <p className={styles['post-desc']}>{props.cloth.description}</p>
      <p className={styles['post-action']}><a href="#" onClick={props.onDelete}><FormattedMessage id="deleteCloth" /></a></p>
      <hr className={styles.divider} />
    </div>
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
