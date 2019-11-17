import {
  CHANGE_SERVICE_FIELD,
  FETCH_SERVICES_REQUEST,
  FETCH_SERVICES_FAILURE,
  FETCH_SERVICES_SUCCESS,
  EDIT_SERVICE_REQUEST,
  EDIT_SERVICE_FAILURE,
  EDIT_SERVICE_SUCCESS,
  SAVE_SERVICE_REQUEST,
  SAVE_SERVICE_FAILURE,
  SAVE_SERVICE_SUCCESS,
  REMOVE_SERVICE,
} from './actionTypes';

export const fetchServicesRequest =() => ({
  type: FETCH_SERVICES_REQUEST,
});

export const fetchServicesFailure = error => ({
  type: FETCH_SERVICES_FAILURE,
  payload: {
    error,
  },
});

export const fetchServicesSuccess = items => ({
  type: FETCH_SERVICES_SUCCESS,
  payload: {
    items,
  },
});

export const editServiceRequest =() => ({
  type: EDIT_SERVICE_REQUEST,
});

export const editServiceFailure = error => ({
  type: EDIT_SERVICE_FAILURE,
  payload: {
    error,
  },
});

export const editServiceSuccess = item => ({
  type: EDIT_SERVICE_SUCCESS,
  payload: {
    item,
  },
});

export const changeServiceField = (name, value) => ({
  type: CHANGE_SERVICE_FIELD,
  payload: {
    name,
    value,
  },
});

export const removeService = id => ({
  type: REMOVE_SERVICE,
  payload: {
    id,
  },
});

export const saveServiceRequest =() => ({
  type: SAVE_SERVICE_REQUEST,
});

export const saveServiceFailure = error => ({
  type: SAVE_SERVICE_FAILURE,
  payload: {
    error,
  },
});

export const saveServiceSuccess = () => ({
  type: SAVE_SERVICE_SUCCESS,
});

export const fetchServices = () => async (dispatch) => {
  dispatch(fetchServicesRequest());

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    dispatch(fetchServicesSuccess(data));
  } catch (error) {
    dispatch(fetchServicesFailure(error.message));
  }
};

export const editService = id => async (dispatch, getState) => {
  dispatch(editServiceRequest());

  console.log('olol')
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const item = await response.json();
    dispatch(editServiceSuccess(item));
  } catch (e) {
    dispatch(editServiceFailure(e.message));
  }

  dispatch(fetchServices());
};

export const deleteService = id => async (dispatch, getState) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    dispatch(removeService(id));
  } catch (e) {
    console.log('ошибка удаления');
  }
};

export const saveService = (item, history) => async (dispatch, getState) => {
  dispatch(saveServiceRequest());

  console.log('olol')
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${item.id}`, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify({...item}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    history.push('/services');
    dispatch(saveServiceSuccess());
  } catch (e) {
    dispatch(saveServiceFailure(e.message));
  }

  dispatch(fetchServices());
};