import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import {Grid, Button, Form, Header, Modal, Icon} from 'semantic-ui-react';

import { Field, reduxForm } from 'redux-form';

import { LabelInputField, CheckboxField } from 'react-semantic-redux-form';
import ClothAddForm from './ClothAddForm';


export class ClothCreateWidget extends Component {

	render() {

		return (
			<div>
				<Button onClick = {this.props.toggle}>Add new</Button>
				<Modal dimmer='inverted' open={this.props.showAddCloth}>

					<Header as='h2' icon>
						<Icon name='add to cart' />
						<FormattedMessage id="addNewCloth" defaultMessage='Add new clothing'/>
						<Header.Subheader>
							<FormattedMessage id="addNewCloth" defaultMessage='Fill in details about your piece of clothing'/>
						</Header.Subheader>
					</Header>

					<Modal.Content>
						<ClothAddForm onSubmit={this.props.addCloth}/>
					</Modal.Content>
				</Modal>
			</div>
		);
	}
}

ClothCreateWidget.propTypes = {
	addCloth: PropTypes.func.isRequired,
	showAddCloth: PropTypes.bool.isRequired,
	toggle: PropTypes.func.isRequired,
	intl: intlShape.isRequired,
};

export default injectIntl(ClothCreateWidget);
