import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {Grid, Segment} from 'semantic-ui-react';

// Import Components

// Import Actions
// import { addClothRequest, fetchClothes, deleteClothRequest } from '../../ClothActions';
// import { toggleAddCloth } from '../../../App/AppActions';

// Import Selectors
// import { getShowAddCloth } from '../../../App/AppReducer';
// import { getClothes } from '../../ClothReducer';

class LandingPage extends Component {
  componentDidMount() {
    //this.props.dispatch(fetchClothes());
  }

  render() {
    return (
        <Grid columns={2} stackable>
        <Grid.Column>
          <Segment>Content</Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>Content</Segment>
        </Grid.Column>
        <Grid.Row columns={3}>
          <Grid.Column>
            <Segment>Content</Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>Content</Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>Content</Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Column width={10}>
          <Segment>Content</Segment>
        </Grid.Column>
        <Grid.Column width={6}>
          <Segment>Content</Segment>
        </Grid.Column>
      </Grid>
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
