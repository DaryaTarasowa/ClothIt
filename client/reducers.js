/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import clothes from './modules/Cloth/ClothReducer';
import intl from './modules/Intl/IntlReducer';
import { reducer as reduxFormReducer } from 'redux-form';

// Combine all reducers into one root reducer
export default combineReducers({
	app,
	clothes,
	intl,
	form: reduxFormReducer,
});
