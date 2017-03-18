// @flow
import {Component, PropTypes, createElement} from 'react';
import {connect} from 'react-redux';
import reduxCrud from 'redux-crud';
import axios from 'axios';
import uuid from 'react-native-uuid';
import {clearToken} from '../reducers/authentication';

/**
 * HOC to provide CRUD functionality to a component.
 * It handles requests to the backend
 */
export function api() {

  return function (WrappedComponent: ReactClass<{}>): ReactClass<{}> {

    class Api extends Component {

      static propTypes = {
        baseUrl: PropTypes.string,
        token: PropTypes.string,
        dispatch: PropTypes.func.isRequired
      };

      isAuthenticated = () => !!this.props.token;

      fetchAll = (resourceName: string) => {
        const baseActionCreators = this.initBaseActionCreators(resourceName);
        this.props.dispatch(baseActionCreators.fetchStart());

        const promise = axios({
          url: `${this.props.baseUrl}/${resourceName}`,
          method: 'get',
          headers: {'Authorization': this.props.token}
        });

        promise.then(response => {
          this.props.dispatch(baseActionCreators.fetchSuccess(response.data.data));
        }, error => {
          this.props.dispatch(baseActionCreators.fetchError(error.response.data.error));
          this.clearTokenOnAuthError(error.response.status);
          alert('Fetch error.' + error.response.data.error);
        }).catch(err => {
          alert('Fetch catch error.' + err.toString());
        });

        return promise;
      };

      createResource = (resourceName: string, resource) => {
        // Create a client id
        const cid = uuid.v4();
        resource = Object.assign({}, resource, {uuid: cid});

        const baseActionCreators = this.initBaseActionCreators(resourceName);
        this.props.dispatch(baseActionCreators.createStart(resource));

        const promise = axios({
          url: `${this.props.baseUrl}/${resourceName}`,
          method: 'post',
          headers: {'Authorization': this.props.token},
          data: resource
        });

        promise.then(response => {
          this.props.dispatch(baseActionCreators.createSuccess(response.data, cid));
        }, error => {
          this.props.dispatch(baseActionCreators.createError(error.response.data.error, resource));
          this.clearTokenOnAuthError(error.response.status);
          alert('Create error.' + error.response.data.error);
        }).catch(err => {
          alert('Create catch error.' + err.toString());
        });

        return promise;
      };

      updateResource = (resourceName: string, resource) => {
        const baseActionCreators = this.initBaseActionCreators(resourceName);
        this.props.dispatch(baseActionCreators.updateStart(resource));

        const promise = axios({
          url: `${this.props.baseUrl}/${resourceName}/${resource.uuid}`,
          method: 'patch',
          headers: {'Authorization': this.props.token},
          data: resource
        });

        promise.then(response => {
          this.props.dispatch(baseActionCreators.updateSuccess(response.data));
        }, error => {
          this.props.dispatch(baseActionCreators.updateError(error.response.data.error, resource));
          this.clearTokenOnAuthError(error.response.status);
          alert('Update error.' + error.response.data.error);
        }).catch(err => {
          alert('Update catch error.' + err.toString());
        });

        return promise;
      };

      deleteResource = (resourceName: string, resource) => {
        const baseActionCreators = this.initBaseActionCreators(resourceName);
        this.props.dispatch(baseActionCreators.deleteStart(resource));

        const promise = axios({
          url: `${this.props.baseUrl}/${resourceName}/${resource.uuid}`,
          method: 'delete',
          headers: {'Authorization': this.props.token}
        });

        promise.then(response => {
          this.props.dispatch(baseActionCreators.deleteSuccess(response.data));
        }, error => {
          this.props.dispatch(baseActionCreators.deleteError(error.response.data.error));
          this.clearTokenOnAuthError(error.response.status);
          alert('Delete error.' + error.response.data.error);
        }).catch(err => {
          alert('Delete catch error.' + err.toString());
        });

        return promise;
      };

      // Makes sure props are ok and returns the base action creators
      initBaseActionCreators(resourceName: string) {
        if (resourceName == null) {
          throw new Error('Api: Expected resourceName');
        }

        if (!this.isAuthenticated()) {
          throw new Error('Api: Not authenticated');
        }

        return reduxCrud.actionCreatorsFor(resourceName, {key: 'uuid'});
      }

      // Private method to clear the token if the backend says it is not valid.
      clearTokenOnAuthError(status: number) {
        if (status === 401) {
          this.props.dispatch(clearToken());
        }
      }

      render() {
        return createElement(WrappedComponent, {
          fetchAll: this.fetchAll,
          createResource: this.createResource,
          updateResource: this.updateResource,
          deleteResource: this.deleteResource,
          isAuthenticated: this.isAuthenticated,
          ...this.props
        });
      }
    }

    // Extract the name of the WrappedReduxFormComponent
    const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    // Name the WrapperComponent accordingly
    Api.displayName = `Api(${wrappedComponentName})`;

    const mapStateToProps = (state) => ({
      baseUrl: state.backend,
      token: state.token
    });

    return connect(mapStateToProps)(Api);

  };

}
