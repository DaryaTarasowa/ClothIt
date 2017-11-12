import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './ClothCreateWidget.css';

export class ClothCreateWidget extends Component {
  addCloth = () => {
    const nameRef = this.refs.name;
    const bodypartRef = this.refs.bodypart;
    const brandRef = this.refs.brand;
    const sizeRef = this.refs.size;
    const colorRef = this.refs.color;
    const fabricRef = this.refs.fabric;
    const pictureRef = this.refs.picture;
    if (nameRef.value && bodypartRef.value && brandRef.value && sizeRef.value && colorRef.value && fabricRef.value && pictureRef.value) {
        
      this.props.addCloth(nameRef.value, bodypartRef.value, brandRef.value, sizeRef.value, colorRef.value, fabricRef.value, pictureRef.value);
      nameRef.value = bodypartRef.value = brandRef.value = sizeRef.value = colorRef.value = fabricRef.value = pictureRef.value = '';
    }
  };

  render() {
    const cls = `${styles.form} ${(this.props.showAddCloth ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewCloth" /></h2>
          <input placeholder={this.props.intl.messages.authorName} className={styles['form-field']} ref="name" />
          <input placeholder={this.props.intl.messages.postTitle} className={styles['form-field']} ref="brand" />
          <input placeholder={this.props.intl.messages.postTitle} className={styles['form-field']} ref="bodypart" />
          <input placeholder={this.props.intl.messages.postTitle} className={styles['form-field']} ref="size" />
          <input placeholder={this.props.intl.messages.postTitle} className={styles['form-field']} ref="color" />
          <input placeholder={this.props.intl.messages.postTitle} className={styles['form-field']} ref="fabric" />
          <input placeholder={this.props.intl.messages.postTitle} className={styles['form-field']} ref="picture" />
          <textarea placeholder={this.props.intl.messages.postContent} className={styles['form-field']} ref="description" />
          <a className={styles['post-submit-button']} href="#" onClick={this.addCloth}><FormattedMessage id="submit" /></a>
        </div>
      </div>
    );
  }
}

ClothCreateWidget.propTypes = {
  addCloth: PropTypes.func.isRequired,
  showAddCloth: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(ClothCreateWidget);
