import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import {Grid, Button, Form, Header, Modal, Icon} from 'semantic-ui-react';

import { Field, reduxForm, change } from 'redux-form';
import { compose } from 'redux';

import {InputField, SelectField, TextAreaField } from 'react-semantic-redux-form';

import ReactDOM from 'react-dom';

const validate = values => {
	const errors = {}
	if (!values.bodypart) {
		errors.bodypart = 'Please select a bodypart'
	}

	if (!values.name) {
		errors.name = 'Please select a name'
	}

	if (!values.brand){
		errors.brand = 'Please select a brand (Or "no-brand")'
	}

	if (!values.picture){
		values.picture = null;
	}else{
		if (values.picture.filetype !== 'jpg'){
			errors.picture = 'abrvalg';
		}
	}
	return errors;
}

function doEvent( obj, event ) {
    /* Created by David@Refoua.me */
    var event = new Event( event, {target: obj, bubbles: true} );
    return obj ? obj.dispatchEvent(event) : false;
}


class ClothAddForm extends Component{

	handleFileSelect(evt){
		const MAX_FILESIZE = 5000000;
		let filePath = URL.createObjectURL(evt.target.files[0])
        let toCheck = evt.target.files[0].name.toLowerCase().trim();
        let filesize = evt.target.files[0].size;
        let file = evt.target.files[0];
        if (file === null || file === undefined)
            file = {
                type: '',
                size: 0
            };

        //check metadata like size, file ending, ...
        let isCorrect = true;
        const filetype = file.type;
        const size = file.size;
        isCorrect = ( filetype === 'image/jpeg' || filetype === 'image/png') && ( size < MAX_FILESIZE );

        if (isCorrect) {
            let reader = new FileReader();

            function errorHandler(evt) {
                switch(evt.target.error.code) {
                    case evt.target.error.NOT_FOUND_ERR:
                        console.error('File Not Found!');
                        break;
                    case evt.target.error.NOT_READABLE_ERR:
                        console.error('File is not readable');
                        break;
                    case evt.target.error.ABORT_ERR:
                        console.info('Cancel clicked');
                        break; // noop
                    default:
                        console.error('An error occurred reading this file.', evt.target.error);
                };
            }

            let that = this;

            // Closures to capture the file information/data
            reader.onloadend = (function(theFile) {
                return function(e) {
                    //Save it to store
                    const payload = {
						fileurl: filePath,
						filename: toCheck,
					    filesize: filesize - 22,// minus 22 for data:image/png;base64, which is the prefix
						filetype: toCheck.substr(toCheck.length - 3),
                        base64: e.target.result,
                    };
					that.props.dispatch(change('clothAdd', 'picture', payload));
					let object = ReactDOM.findDOMNode(that.refs.picture_input_div); //remove the error class from
					object.className = 'ui input';
					doEvent( object, 'input' );
                };
            })();
            reader.onerror = errorHandler;
            reader.onabort = function(e) {
                console.error('File read cancelled');
            };

            // Read in the file
            reader.readAsDataURL(file);

            //ReactDOM.findDOMNode(this.refs.submitbutton).focus();
		}else{
			let object = ReactDOM.findDOMNode(this.refs.picture_input);
			object.value = null;
			doEvent( object, 'input' );
			object = ReactDOM.findDOMNode(this.refs.picture_input_div);
			object.className = 'ui input error';
			doEvent( object, 'input' );
		}

        return false;
	}
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
		let colorOptions = [{key: 'red', text: 'Red', value: 'red'},
							{key: 'blue', text: 'Blue', value: 'blue'},
							{key: 'green', text: 'Green', value: 'green'},
							{key: 'white', text: 'White', value: 'white'},
							{key: 'black', text: 'Black', value: 'black'},
							{key: 'teal', text: 'Teal', value: 'teal'},
							{key: 'orange', text: 'Orange', value: 'orange'},
							{key: 'yellow', text: 'Yellow', value: 'yellow'},
							{key: 'purple', text: 'Purple', value: 'purple'},
							{key: 'grey', text: 'Grey', value: 'grey'},
							{key: 'pink', text: 'Pink', value: 'pink'},
							{key: 'navy', text: 'Navy', value: 'navy'},
							{key: 'brown', text: 'Brown', value: 'brown'},
							{key: 'beige', text: 'Beige', value: 'beige'},
							];
		let acceptedFormats = '.jpg, .jpeg, .gif, .png,  ';
		return (
			<Form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
				<Form.Group width='equal'>
					<Field name='name'
						component={InputField}
						required
						label={this.props.intl.messages.clothName}
						placeholder={this.props.intl.messages.selectclothName}
					/>
					<Field
						required
						component={SelectField}
						options={brandOptions}
						label={this.props.intl.messages.brand}
						placeholder={this.props.intl.messages.selectbrand}
						name="brand"
					/>
					<Field
						required
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
						component={SelectField}
						options={colorOptions}
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
					<div className = 'ui input' ref='picture_input_div'>
						<input
							ref='picture_input'
							type="file"
							onChange={this.handleFileSelect.bind(this)}
							id="import_file_chooser"
							accept={'.jpg, .png, .jpeg'}
						></input>
					</div>
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
  	handleSubmit: PropTypes.func.isRequired,
  	onSubmit: PropTypes.func.isRequired,
 	//addPicture: PropTypes.func.isRequired
};

export default injectIntl(compose(
	reduxForm({
  		form: 'clothAdd',	// a unique identifier for this form
  		//enableReinitialize: true,
		validate
	})
)(ClothAddForm));
