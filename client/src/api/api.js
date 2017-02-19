// @flow
import reduxCrud from 'redux-crud';
import axios from 'axios';
import uuid from 'react-native-uuid';

function asyncActionCreatorsFor(resourceName) {
  if (resourceName == null) {
    throw new Error('asyncActionCreatorsFor: Expected resourceName');
  }

  const baseActionCreators = reduxCrud.actionCreatorsFor(resourceName, {key: 'uuid'});

  return {
    fetch: function (baseUrl: string, password: string) {
      return function (dispatch) {
        dispatch(baseActionCreators.fetchStart());

        // Send the request
        const promise = axios({
          url: `${baseUrl}/${resourceName}`,
          method: 'GET',
          headers: {'Auth-Token': password}
        });

        promise.then(function (response) {
          dispatch(baseActionCreators.fetchSuccess(response.data.data));
        }, function (error) {
          dispatch(baseActionCreators.fetchError(error.response.data.error));
          alert('Fetch error.' + error.response.data.error);
        }).catch(function (err) {
          alert('Fetch error.' + err.toString());
        });

        return promise;
      };
    },

    create: function (baseUrl: string, password: string, resource) {
      return function (dispatch) {
        // Create a client id
        const cid = uuid.v4();
        resource = Object.assign({}, resource, {uuid: cid});

        dispatch(baseActionCreators.createStart(resource));

        // Send the request
        const promise = axios({
          url: `${baseUrl}/${resourceName}`,
          method: 'POST',
          headers: {'Auth-Token': password},
          data: resource
        });

        promise.then(function (response) {
          dispatch(baseActionCreators.createSuccess(response.data, cid));
        }, function (error) {
          dispatch(baseActionCreators.createError(error.response.data.error, resource));
          alert('Creation error');
        }).catch(function (err) {
          alert('Creation error.' + err.toString());
        });

        return promise;
      };
    },

    update: function (baseUrl: string, password: string, resource) {
      return function (dispatch) {
        dispatch(baseActionCreators.updateStart(resource));

        // Send the request
        const promise = axios({
          url: `${baseUrl}/${resourceName}/${resource.uuid}`,
          method: 'PATCH',
          headers: {'Auth-Token': password},
          data: resource
        });

        promise.then(function (response) {
          dispatch(baseActionCreators.updateSuccess(response.data));
        }, function (error) {
          dispatch(baseActionCreators.updateError(error.response.data.error, resource));
          alert('Update error');
        }).catch(function (err) {
          alert('Update error.' + err.toString());
        });

        return promise;
      };
    },

    delete: function (baseUrl: string, password: string, resource) {
      return function (dispatch) {
        dispatch(baseActionCreators.deleteStart(resource));

        // Send the request
        const promise = axios({
          url: `${baseUrl}/${resourceName}/${resource.uuid}`,
          method: 'DELETE',
          headers: {'Auth-Token': password}
        });

        promise.then(function (response) {
          dispatch(baseActionCreators.deleteSuccess(response.data));
        }, function (error) {
          dispatch(baseActionCreators.deleteError(error.response.data.error, resource));
          alert('Delete error');
        }).catch(function (err) {
          alert('Delete error.' + err.toString());
        });

        return promise;
      };
    }
  };
}

export default asyncActionCreatorsFor;
