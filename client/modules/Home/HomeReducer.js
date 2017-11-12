//import { ADD_CLOTH, ADD_CLOTHES, DELETE_CLOTH } from './ClothActions';

// Initial State
const initialState = { data: [] };

const HomeReducer = (state = initialState, action) => {
  switch (action.type) {
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
export default HomeReducer;
