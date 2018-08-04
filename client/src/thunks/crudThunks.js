import cuid from 'cuid';
import {path} from 'ramda';
import {createCrudThunks} from 'redux-crud-provider';
import {clearToken} from '../reducers/authentication';

export const crudConfig = {
  backendSelector: state => state.backend,
  headersSelector: state => ({Authorization: state.token}),
  onError: (resource, operation, error, dispatch) => {
    if (path(['response', 'status'], error) === 401) {
      dispatch(clearToken());
    }
    alert(`Error: ${operation} - ${error}`);
  },
  cuid: () => cuid(),

  fetchAllDataToRecords: responseData => responseData.data
};

export const crudThunks = createCrudThunks(crudConfig);
