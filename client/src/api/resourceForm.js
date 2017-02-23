// @flow
import {Component, PropTypes, createElement} from 'react';
import {api} from './api';
import {reduxForm} from 'redux-form';

/**
 * HOC to provide CRUD functionality to a form.
 * It handles requests and the reduxForm config.
 *
 * @param resourcePath
 * @param formToResource How to convert form data to a resource
 * @param resourceToForm How to convert a resource to form data
 * @returns {Function}
 */
export function resourceForm(resourcePath: string,
                             formToResource: Function = (v) => v,
                             resourceToForm: Function = (v) => v) {

  return function (WrappedComponent: ReactClass<{}>): ReactClass<{}> {

    // Make a redux-form from the WrappedComponent
    const WrappedReduxFormComponent = reduxForm({
      form: resourcePath,
      enableReinitialize: true
    })(WrappedComponent);

    // Create the WrapperComponent
    class ResourceForm extends Component {

      static propTypes = {
        updatedResource: PropTypes.shape({
          uuid: PropTypes.string.isRequired
        }),
        createResource: PropTypes.func,
        updateResource: PropTypes.func,
        deleteResource: PropTypes.func,
        postSubmit: PropTypes.func,
      };

      onSubmit = (data) => {
        const entity = formToResource(data, this.props);
        if (this.props.updatedResource && this.props.updatedResource.uuid) {
          entity.id = this.props.updatedResource.uuid;
          this.props.updateResource(resourcePath, entity);
        } else {
          this.props.createResource(resourcePath, entity);
        }
        this.props.postSubmit && this.props.postSubmit();
      };

      /**
       * Delete the updatedResource
       */
      deleteResource = () => {
        this.props.deleteResource(
          resourcePath,
          {
            uuid: this.props.updatedResource.uuid
          }
        );
        this.props.postSubmit && this.props.postSubmit();
      };

      getPassThroughProps = () => {
        const passThroughProps = {...this.props};
        delete passThroughProps.fetchAll;
        delete passThroughProps.createResource;
        delete passThroughProps.updateResource;
        delete passThroughProps.deleteResource;
        delete passThroughProps.postSubmit;
        return passThroughProps;
      };

      render() {
        // Compute props that will passthrough.
        const passThroughProps = this.getPassThroughProps();

        return createElement(WrappedReduxFormComponent, {
          onSubmit: this.onSubmit,
          deleteResource: this.deleteResource,
          initialValues: resourceToForm(this.props.updatedResource, passThroughProps),
          isCreate: (this.props.updatedResource == null),
          isUpdate: (this.props.updatedResource != null),
          ...passThroughProps
        });
      }
    }

    // Extract the name of the WrappedReduxFormComponent
    const wrappedComponentName = WrappedReduxFormComponent.displayName || WrappedReduxFormComponent.name || 'Component';
    // Name the WrapperComponent accordingly
    ResourceForm.displayName = `ResourceForm(${wrappedComponentName})`;

    return api()(ResourceForm);
  };
}
