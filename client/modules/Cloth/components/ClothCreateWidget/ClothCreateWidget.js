import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import {Grid, Button, Form, Header, Modal, Icon} from 'semantic-ui-react';

import { Field, reduxForm } from 'redux-form';

import { LabelInputField, CheckboxField } from 'react-semantic-redux-form';
import ClothAddForm from './ClothAddForm';


export class ClothCreateWidget extends Component {

	onSubmit = (values) => {
		this.props.addCloth(values);
	};

	// addCloth = () => {
	// 	console.log(this);
	// 	// const nameRef = this.refs.name;
	// 	// const bodypartRef = this.refs.bodypart;
	// 	// const brandRef = this.refs.brand;
	// 	// const sizeRef = this.refs.size;
	// 	// const colorRef = this.refs.color;
	// 	// const fabricRef = this.refs.fabric;
	// 	// const pictureRef = this.refs.picture;
	// 	// if (nameRef.value && bodypartRef.value && brandRef.value) {
	// 	// 	this.props.addCloth(nameRef.value, bodypartRef.value, brandRef.value, sizeRef.value, colorRef.value, fabricRef.value, pictureRef.value);
	// 	// 	nameRef.value = bodypartRef.value = brandRef.value = sizeRef.value = colorRef.value = fabricRef.value = pictureRef.value = '';
	// 	// }
	// };

	render() {
		let cls = 'form';
		if (this.props.showAddCloth) cls+= ' appear';

		return (
			<Modal dimmer='inverted' trigger={<Button>Add new</Button>}>

				<Header as='h2' icon>
					<Icon name='add to cart' />
					<FormattedMessage id="addNewCloth" defaultMessage='Add new clothing'/>
					<Header.Subheader>
						<FormattedMessage id="addNewCloth" defaultMessage='Fill in details about your piece of clothing'/>
					</Header.Subheader>
				</Header>

				<Modal.Content>
					<ClothAddForm onSubmit={this.onSubmit}/>
				</Modal.Content>
			</Modal>
		);
	}
}

ClothCreateWidget.propTypes = {
	addCloth: PropTypes.func.isRequired,
	showAddCloth: PropTypes.bool.isRequired,
	intl: intlShape.isRequired,
};

export default injectIntl(ClothCreateWidget);
