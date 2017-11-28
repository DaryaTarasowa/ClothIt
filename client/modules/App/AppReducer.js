// Import Actions
import { TOGGLE_ADD_CLOTH } from './AppActions';

// Initial State
const initialState = {
	showAddCloth: true,
};

const AppReducer = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_ADD_CLOTH:
			return {
				showAddCloth: !state.showAddCloth,
			};

		default:
			return state;
	}
};

/* Selectors */

// Get showAddPost

export const getShowAddCloth = state => state.app.showAddCloth;

// Export Reducer
export default AppReducer;
