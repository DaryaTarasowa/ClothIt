import { ADD_CLOTH, ADD_CLOTHES, DELETE_CLOTH, SAVE_PICTURE_FILE } from './ClothActions';

// Initial State
const initialState = { data: [] };

const ClothReducer = (state = initialState, action) => {
	switch (action.type) {
	case ADD_CLOTH :
		return {
			data: [action.cloth, ...state.data],
		};

	case ADD_CLOTHES :
		return {
			data: action.clothes,
		};

	case DELETE_CLOTH :
		return {
			data: state.data.filter(cloth => cloth.cuid !== action.cuid),
		};
	// case SAVE_PICTURE_FILE :
	// 	return {
	// 		data: [action.payload, ...state.data],
	// 	};

	default:
		return state;
	}
};

/* Selectors */

// Get all clothes
export const getClothes = state => {
	return state.clothes.data;
};

// Get post by cuid
export const getCloth = (state, cuid) => state.clothes.data.filter(cloth => cloth.cuid === cuid)[0];

// Export Reducer
export default ClothReducer;
