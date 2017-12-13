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

import { Grid, Divider, Image, Button } from 'semantic-ui-react';
//import styles from './ClothListPage.css';

class ClothListPage extends Component {
	componentDidMount() {
		this.props.dispatch(fetchClothes());
	};

	handleDeleteCloth = (cloth) => {
		if (confirm('Do you want to delete this cloth item')) { // eslint-disable-line
			this.props.dispatch(deleteClothRequest(cloth));
		}
	};

	toggleAddClothSection = () => {
		this.props.dispatch(toggleAddCloth());
	};


	handleAddCloth = (values) => {
		this.props.dispatch(toggleAddCloth());
		this.props.dispatch(addClothRequest(values));
	};

	render() {

		return (

			<div className='page-background'>
				<Grid centered className='static'>
					<Grid.Column width={12} className='static'>
						<ClothList handleDeleteCloth={this.handleDeleteCloth} clothes={this.props.clothes} />
						<ClothCreateWidget addCloth={this.handleAddCloth} toggle={this.toggleAddClothSection} showAddCloth={this.props.showAddCloth}/>
					</Grid.Column>
				</Grid>
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
	})).isRequired,
	showAddCloth: PropTypes.bool.isRequired,
	dispatch: PropTypes.func.isRequired,
};

ClothListPage.contextTypes = {
	router: React.PropTypes.object,
};

export default connect(mapStateToProps)(ClothListPage);
