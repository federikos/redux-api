import {
  CHANGE_SERVICE_FIELD,
  EDIT_SERVICE_REQUEST,
  EDIT_SERVICE_FAILURE,
  EDIT_SERVICE_SUCCESS,
  SAVE_SERVICE_REQUEST,
  SAVE_SERVICE_FAILURE,
  SAVE_SERVICE_SUCCESS,
} from '../actions/actionTypes'

const initialState = {
  item: { name: '', price: '', content: ''},
  loading: false,
  error: null,
};

export default function serviceEditReducer(state = initialState, action) {
  switch (action.type) {
    case EDIT_SERVICE_REQUEST:
    case SAVE_SERVICE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case EDIT_SERVICE_FAILURE:
    case SAVE_SERVICE_FAILURE:
      const {error} = action.payload;
      return {
        ...state,
        loading: false,
        error,
      };
    case EDIT_SERVICE_SUCCESS:
      return {...initialState, ...action.payload};
    case SAVE_SERVICE_SUCCESS:
      return {...initialState};
    case CHANGE_SERVICE_FIELD:
      const { name, value } = action.payload;
      const { item } = state;
      return {
        ...state,
        item: {
          ...item,
          [name]: value,
        }
      };
    default:
      return state;
  }
}
