import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import {Menu, Segment, Header as UI_header, Image} from 'semantic-ui-react';

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

  //
  //     {
  //       context.router.isActive('/', true)
  //         ? <a className={styles['add-post-button']} href="#" onClick={props.toggleAddCloth}><FormattedMessage id="addCloth" /></a>
  //         : null
  //     }
  //
  //   </div>
  return (
      <div>
        <Menu pointing secondary>
          <Menu.Item name='home' active={activeItem === 'home'}  />
          <Menu.Item name='messages' active={activeItem === 'messages'}  />
          <Menu.Item name='friends' active={activeItem === 'friends'}  />
          <Menu.Menu position='right'>
            {languageNodes}
          </Menu.Menu>
        </Menu>
        <Segment>
            <UI_header as='h1'>
                <Link to="/"><FormattedMessage id="siteTitle" defaultMessage="ClothIt - rationalize your closet!"/></Link>
            </UI_header>
        </Segment>
        
    </div>
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
