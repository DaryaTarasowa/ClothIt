import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import {Grid, Button, Form, Header, Modal, Icon} from 'semantic-ui-react';

// Import Style
//import styles from './ClothCreateWidget.css';

export class ClothCreateWidget extends Component {
	addCloth = () => {
		console.log(this.refs);
		const nameRef = this.refs.name;
		const bodypartRef = this.refs.bodypart;
		const brandRef = this.refs.brand;
		const sizeRef = this.refs.size;
		const colorRef = this.refs.color;
		const fabricRef = this.refs.fabric;
		const pictureRef = this.refs.picture;
		if (nameRef.value && bodypartRef.value && brandRef.value) {

			this.props.addCloth(nameRef.value, bodypartRef.value, brandRef.value, sizeRef.value, colorRef.value, fabricRef.value, pictureRef.value);
			nameRef.value = bodypartRef.value = brandRef.value = sizeRef.value = colorRef.value = fabricRef.value = pictureRef.value = '';
		}
	};

	render() {
		let cls = 'form';
		if (this.props.showAddCloth) cls+= ' appear';
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
			<Modal dimmer='inverted' trigger={<Button>Add new</Button>}>

				<Header as='h2' icon>
					<Icon name='add to cart' />
					<FormattedMessage id="addNewCloth" defaultMessage='Add new clothing'/>
					<Header.Subheader>
						<FormattedMessage id="addNewCloth" defaultMessage='Fill in details about your piece of clothing'/>
					</Header.Subheader>
				</Header>

				<Modal.Content>
					<Form>
						<Form.Group width='equal'>
							<Form.Input required
								label={this.props.intl.messages.clothName}
								placeholder={this.props.intl.messages.selectclothName}
								ref="name"/>
							<Form.Select required
								options={brandOptions}
								defaultValue={'nobrand'}
								label={this.props.intl.messages.brand}
								placeholder={this.props.intl.messages.selectbrand}
								ref="brand" />
							<Form.Select required
								options={bodypartOptions}
								defaultValue={'top'}
								label={this.props.intl.messages.bodypart}
								placeholder={this.props.intl.messages.selectbodypart}
								ref="bodypart" />
						</Form.Group>
						<Form.Group>
							<Form.Input //TODO different size systems
								label={this.props.intl.messages.size}
								placeholder={this.props.intl.messages.selectSize}
								ref="size" />
							<Form.Input //TODO colorpicker
								label={this.props.intl.messages.color}
								placeholder={this.props.intl.messages.selectColor}
								ref="color" />
							<Form.Select
								options={fabricOptions}
								label={this.props.intl.messages.fabric}
								placeholder={this.props.intl.messages.selectfabric}
								ref="fabric" />
						</Form.Group>
							<Form.Input width={3} label={this.props.intl.messages.picture} placeholder={this.props.intl.messages.uploadPicture} ref="picture" />
							<Form.TextArea width={5} label={this.props.intl.messages.description} placeholder={this.props.intl.messages.addDescription} ref="description" />
						<Button primary onClick={this.addCloth}><FormattedMessage id="submit" defaultMessage='Submit' /></Button>
					</Form>
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
