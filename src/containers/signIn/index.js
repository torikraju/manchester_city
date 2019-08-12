import React, { Component } from 'react';

import FormFields from '../../components/ui/formFields';
import { validate, prepareFormData } from '../../components/ui/miscellaneous';

class signIn extends Component {
    state = {
      formError: false,
      formSuccess: '',
      formData: {
        email: {
          element: 'input',
          value: '',
          config: {
            name: 'email',
            type: 'email',
            placeholder: 'Enter your email',
          },
          validation: {
            required: true,
            email: true,
          },
          valid: false,
          validationMessage: '',
        },
        password: {
          element: 'input',
          value: '',
          config: {
            name: 'password',
            type: 'password',
            placeholder: 'Enter your password',
          },
          validation: {
            required: true,
          },
          valid: false,
          validationMessage: '',
        },
      },
    };

    updateForm = element => {
      const updatedFormData = { ...this.state.formData };
      const updatedElement = { ...updatedFormData[element.id] };

      updatedElement.value = element.event.target.value;
      [updatedElement.valid, updatedElement.validationMessage] = validate(updatedElement);

      updatedFormData[element.id] = updatedElement;

      this.setState({
        formError: false,
        formData: updatedFormData,
      });
    };

    _onSubmit = async event => {
      event.preventDefault();
      const { data, formIsValid } = prepareFormData(this.state.formData);
      if (formIsValid) {
        try {

        } catch (e) {
          console.log(e);
        }
      }
    };


    render() {
      return (
        <div className="container">
          <div className="signin_wrapper" style={{ margin: '100px' }}>
            <form onSubmit={(event) => this._onSubmit(event)}>
              <h2>Please Login</h2>
              <FormFields
                id="email"
                formData={this.state.formData.email}
                change={(element) => this.updateForm(element)}
              />

              <FormFields
                id="password"
                formData={this.state.formData.password}
                change={(element) => this.updateForm(element)}
              />
              { this.state.formError && <div className="error_label">Something is wrong, try again.</div>}
              <button type="button" onClick={(event) => this._onSubmit(event)}>Log in</button>
            </form>
          </div>
        </div>
      );
    }
}

export default signIn;
