import React, { PropTypes } from 'react';

// Import Components
import ClothListItem from './ClothListItem/ClothListItem';

function ClothList(props) {
  return (
    <div className="listView">
      {
        props.clothes.map(cloth => (
          <ClothListItem
            cloth={cloth}
            key={cloth.cuid}
            onDelete={() => props.handleDeleteCloth(cloth.cuid)}
          />
        ))
      }
    </div>
  );
}

ClothList.propTypes = {
  clothes: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      bodypart: PropTypes.string.isRequired,
      brand: PropTypes.string.isRequired,
      size: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      fabric: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      cuid: PropTypes.string.isRequired,
  })).isRequired,
  handleDeleteCloth: PropTypes.func.isRequired,
};

export default ClothList;
