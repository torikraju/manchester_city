import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';

import { enrollState } from './data';
import FormFields from '../../../components/ui/formFields';
import { validate, prepareFormData } from '../../../components/ui/miscellaneous';
import { promotions } from '../../../firebase';

class Enroll extends Component {
    state = enrollState;

    _resetForm = (type) => {
      const updatedFormData = { ...this.state.formData };

      for (const key in updatedFormData) {
        if (Object.prototype.hasOwnProperty.call(updatedFormData, key)) {
          updatedFormData[key].value = '';
          updatedFormData[key].valid = false;
          updatedFormData[key].validationMessage = '';
        }
      }

      this.setState({
        formError: false,
        formData: updatedFormData,
        formSuccess: type ? 'Congratulations' : 'Already on the database',
      });
      this._clearSuccessMessage();
    };

    _clearSuccessMessage = () => {
      setTimeout(() => {
        this.setState({
          formSuccess: '',
        });
      }, 2000);
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
          const isPresent = await promotions.orderByChild('email').equalTo(data.email).once('value');
          if (!isPresent.exists()) {
            promotions.push(data);
            this._resetForm(true);
          } else this._resetForm(false);
        } catch (e) {
          console.log(e);
        }
      } else this.setState({ formError: true });
    };


    render() {
      return (
        <Fade>
          <div className="enroll_wrapper">
            <form onSubmit={(event => this._onSubmit(event))}>
              <div className="enroll_title">Enter Your Email</div>
              <div className="enroll_input">
                <FormFields
                  id="email"
                  formData={this.state.formData.email}
                  change={(element) => this.updateForm(element)}
                />
                { (this.state.formError)
                  && <div className="error_label">Something is wrong, try again.</div>
                }
                <div className="success_label">{this.state.formSuccess}</div>
                <button type="button" onClick={(event) => this._onSubmit(event)}>Enroll</button>
                <div className="enroll_discl">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
              </div>
            </form>
          </div>
        </Fade>
      );
    }
}

export default Enroll;
