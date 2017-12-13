import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import {Grid, Button, Form, Header, Modal, Icon} from 'semantic-ui-react';

import { Field, reduxForm } from 'redux-form';
import { compose } from 'redux';

import {InputField, SelectField, TextAreaField } from 'react-semantic-redux-form';

const validate = values => {
	const errors = {}
	if (!values.username) {
		errors.username = 'Username is Required'
	}

	if (!values.password) {
		errors.password = 'Password is Required'
	}
	return errors;
}



class ClothAddForm extends Component{
	render() {
		let brandOptions = [{key: 'hm', text: 'H&M', value: 'hm'},
							{key: 'obaibi', text: 'Obaibi', value: 'obaibi'},
							{key: 'mango', text: 'Mango', value: 'mango'},
							{key: 'nameit', text: 'NameIt', value: 'nameit'},
							{key: 'nobrand', text: 'No brand', value: 'nobrand'},
						];
		let bodypartOptions = [{key: 'head', text: 'Head', value: 'head'},
								{key: 'eyes', text: 'Eyes', value: 'eyes'},
								{key: 'neck', text: 'Neck', value: 'neck'},
								{key: 'shoulders', text: 'Shoulders', value: 'shoulders'},
								{key: 'top', text: 'Top', value: 'top'},
								{key: 'bottom', text: 'Bottom', value: 'bottom'},
								{key: 'legs', text: 'Legs', value: 'legs'},
								{key: 'feet', text: 'Feet', value: 'feet'},
								{key: 'hands', text: 'Hands', value: 'hands'},
							];
		let fabricOptions = [{key: 'cotton', text: 'Cotton', value: 'cotton'},
								{key: 'wool', text: 'Wool', value: 'wool'},
								{key: 'acryl', text: 'Acryl', value: 'acryl'},
								{key: 'textile', text: 'textile', value: 'textile'},
								{key: 'leather', text: 'Leather', value: 'leather'},
							];
		return (
			<Form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
				<Form.Group width='equal'>
					<Field name='name'
						component={InputField}
						required
						label={this.props.intl.messages.clothName}
						placeholder={this.props.intl.messages.selectclothName}
					/>
					<Field required
						component={SelectField}
						options={brandOptions}
						label={this.props.intl.messages.brand}
						placeholder={this.props.intl.messages.selectbrand}
						name="brand"
					/>
					<Field required
						component={SelectField}
						options={bodypartOptions}
						label={this.props.intl.messages.bodypart}
						placeholder={this.props.intl.messages.selectbodypart}
						name="bodypart"
					/>
				</Form.Group>
				<Form.Group>
					<Field //TODO different size systems
						component={InputField}
						label={this.props.intl.messages.size}
						placeholder={this.props.intl.messages.selectSize}
						name="size"
					/>
					<Field //TODO colorpicker
						component={InputField}
						label={this.props.intl.messages.color}
						placeholder={this.props.intl.messages.selectColor}
						name="color"
					/>
					<Field
						component={SelectField}
						options={fabricOptions}
						label={this.props.intl.messages.fabric}
						placeholder={this.props.intl.messages.selectfabric}
						name="fabric"
					/>
				</Form.Group>
				<Form.Group>
					<Field
						component={InputField} //TODO should be a proper file uploader
						width={3}
						label={this.props.intl.messages.picture}
						placeholder={this.props.intl.messages.uploadPicture}
						name="picture"
					/>
				</Form.Group>
				<Form.Group>
					<Field
						component={TextAreaField}
						width={5}
						label={this.props.intl.messages.description}
						placeholder={this.props.intl.messages.addDescription}
						name="description"
					/>
				</Form.Group>
				<Form.Field control={Button} primary
					type='submit'>
					Submit
				</Form.Field>
			</Form>
	  )}
}

ClothAddForm.propTypes = {
  handleSubmit: PropTypes.func,
  reset: PropTypes.func,
  onSubmit: PropTypes.func
};

export default injectIntl(compose(
	reduxForm({
  		form: 'cloathAdd',	// a unique identifier for this form
  		enableReinitialize: true
	})
)(ClothAddForm));
