import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import {Menu, Segment, Container, Image, Grid} from 'semantic-ui-react';

// Import Style
import styles from './Header.css';

// Import images
//import logo from './client/images/landing_logo.jpg';

export function Header(props, context) {
  let activeLang = props.intl.locale;
  let activeItem = 'Home';
  const languageNodes = props.intl.enabledLanguages.map(
    (lang) => {
        return <Menu.Item
                name={lang}
                key={lang}
                onClick={() => props.switchLanguage(lang)}
                active={activeLang === lang}
                />
            }
  );




  return (
      <Grid stackable padded='vertically' centered verticalAlign='bottom' className={styles['sticky']}>
         <Grid.Column width={16}>
             <Link to='/'>
               <Image src={require('images/main_logo.png')} centered size='medium'/>
             </Link>
         </Grid.Column>
         <Grid.Row only='tablet computer' className={styles['horizontal-padding']}>
              <Grid.Column width={12} >
                <Menu borderless pointing secondary>
                    <Menu.Item name='Home' active={context.router.isActive('/', true)} as='a' href='/' />
                    <Menu.Item name='My Closet' active={context.router.isActive('/closet', true)} as='a' href='/closet'/>
                    <Menu.Menu position='right'>
                        {languageNodes}
                    </Menu.Menu>
                </Menu>
              </Grid.Column>
          </Grid.Row>
      </Grid>
  );
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {
  toggleAddCloth: PropTypes.func.isRequired,
  switchLanguage: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default Header;
