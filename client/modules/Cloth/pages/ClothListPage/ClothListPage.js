import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import ClothList from '../../components/ClothList';
import ClothCreateWidget from '../../components/ClothCreateWidget/ClothCreateWidget';

// Import Actions
import { addClothRequest, fetchClothes, deleteClothRequest } from '../../ClothActions';
import { toggleAddCloth } from '../../../App/AppActions';

// Import Selectors
import { getShowAddCloth } from '../../../App/AppReducer';
import { getClothes } from '../../ClothReducer';

class ClothListPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchClothes());
  }

  handleDeleteCloth = cloth => {
    if (confirm('Do you want to delete this cloth item')) { // eslint-disable-line
      this.props.dispatch(deleteClothRequest(cloth));
    }
  };


  handleAddCloth = (name, bodypart, brand, size, color, fabric, picture) => {
    this.props.dispatch(toggleAddCloth());
    this.props.dispatch(addClothRequest({name, bodypart, brand, size, color, fabric, picture}));
  };

  render() {
    return (
      <div>
      <ClothCreateWidget addCloth={this.handleAddCloth} showAddCloth={this.props.showAddCloth} />
      <ClothList handleDeleteCloth={this.handleDeleteCloth} clothes={this.props.clothes} />
      </div>
    );

  }
}

// Actions required to provide data for this component to render in sever side.
ClothListPage.need = [() => { return fetchClothes(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    showAddCloth: getShowAddCloth(state),
    clothes: getClothes(state),
  };
}

ClothListPage.propTypes = {
  clothes: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      bodypart: PropTypes.string.isRequired,
      brand: PropTypes.string.isRequired,
      size: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      fabric: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired
  })).isRequired,
  showAddCloth: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

ClothListPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(ClothListPage);