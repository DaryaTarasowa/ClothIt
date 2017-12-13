import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_CLOTH = 'ADD_CLOTH';
export const ADD_CLOTHES = 'ADD_CLOTHES';
export const DELETE_CLOTH = 'DELETE_CLOTH';

// Export Actions
export function addCloth(cloth) {
	
	return {
		type: ADD_CLOTH,
		cloth,
	};
}

export function addClothRequest(cloth) {

	return (dispatch) => {
		return callApi('server2','clothes','post', {
			cloth: {
				name: cloth.name,
				bodypart: cloth.bodypart,
				brand: cloth.brand,
				size: cloth.size,
				color: cloth.color,
				fabric: cloth.fabric,
				picture: cloth.picture,
			},
		}).then(res => {
			dispatch(addCloth(res.cloth));});
	};
}

export function addClothes(clothes) {
	return {
		type: ADD_CLOTHES,
		clothes,
	};
}

export function fetchClothes() {
	return (dispatch) => {
		return callApi('server2', 'clothes').then(res => {
			dispatch(addClothes(res.clothes));
		});
	};
}

export function fetchCloth(cuid) {
	return (dispatch) => {
		return callApi('server2', `clothes/${cuid}`).then(res => dispatch(addCloth(res.cloth)));
	};
}

export function deleteCloth(cuid) {
	return {
		type: DELETE_CLOTH,
		cuid,
	};
}

export function deleteClothRequest(cuid) {
	return (dispatch) => {
		return callApi('server2', `clothes/${cuid}`, 'delete').then(() => dispatch(deleteCloth(cuid)));
	};
}
