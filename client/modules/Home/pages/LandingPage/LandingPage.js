import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {Grid, Segment, Image} from 'semantic-ui-react';

// Import Components

// Import Actions
// import { addClothRequest, fetchClothes, deleteClothRequest } from '../../ClothActions';
// import { toggleAddCloth } from '../../../App/AppActions';

// Import Selectors
// import { getShowAddCloth } from '../../../App/AppReducer';
// import { getClothes } from '../../ClothReducer';

//Import Styles
//import styles from './LandingPage.css';

//Import images




class LandingPage extends Component {
  componentDidMount() {
    //this.props.dispatch(fetchClothes());
  }

  render() {
    return (
        <div className='page-background'>
            <Image src='/assets/images/landing_logo.jpg' centered className='static'/>
        </div>

    );

  }
}

// Actions required to provide data for this component to render in sever side.
//ClothListPage.need = [() => { return fetchClothes(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    // showAddCloth: getShowAddCloth(state),
    // clothes: getClothes(state),
  };
}

// ClothListPage.propTypes = {
//   clothes: PropTypes.arrayOf(PropTypes.shape({
//       name: PropTypes.string.isRequired,
//       bodypart: PropTypes.string.isRequired,
//       brand: PropTypes.string.isRequired,
//       size: PropTypes.string.isRequired,
//       color: PropTypes.string.isRequired,
//       fabric: PropTypes.string.isRequired,
//       picture: PropTypes.string.isRequired
//   })).isRequired,
//   showAddCloth: PropTypes.bool.isRequired,
//   dispatch: PropTypes.func.isRequired,
// };

LandingPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(LandingPage);
