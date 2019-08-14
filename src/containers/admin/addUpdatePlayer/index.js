import React, { Component } from 'react';

import AdminLayout from '../../../HOC/AdminLayout';
import FormFields from '../../../components/ui/formFields';
import { prepareFormData, validate } from '../../../components/ui/miscellaneous';
import { data } from './formData';
import { firebaseDB, players, firebase } from '../../../firebase';
import FileUploader from '../../../components/ui/fileUploader';

class AddUpdatePlayer extends Component {
    state = data;

    componentDidMount() {
      (async () => {
        try {
          const playerId = this.props.match.params.id;
          if (!playerId) {
            this.setState({ formType: 'Add Player', isLoading: false });
          } else {
            const getPlayer = await firebaseDB.ref(`players/${playerId}`).once('value');
            const _player = getPlayer.val();
            const playerImageUrl = await firebase.storage().ref('players').child(_player.image).getDownloadURL();
            this._updateFields({
              _player, playerId, type: 'Update player', playerImageUrl,
            });
          }
        } catch (e) {
          console.log(`error in componentDidMount-AdminMatches ${e}`);
        }
      })();
    }

    _updateFields =(props) => {
      const {
        _player, playerId, type: formType, playerImageUrl: defaultImage,
      } = props;

      const updatedFormData = { ...this.state.formData };
      for (const key in updatedFormData) {
        if (Object.prototype.hasOwnProperty.call(updatedFormData, key)) {
          updatedFormData[key].value = _player[key];
          updatedFormData[key].valid = true;
        }
      }
      this.setState({
        playerId,
        defaultImage,
        formType,
        formData: updatedFormData,
        isLoading: false,
      });
    };

    updateForm = (element, content = '') => {
      const updatedFormData = { ...this.state.formData };
      const updatedElement = { ...updatedFormData[element.id] };

      if (content === '') {
        updatedElement.value = element.event.target.value;
      } else {
        updatedElement.value = content;
      }

      [updatedElement.valid, updatedElement.validationMessage] = validate(updatedElement);

      updatedFormData[element.id] = updatedElement;

      this.setState({
        formError: false,
        formData: updatedFormData,
      });
    };

    _onSubmit = async (event) => {
      event.preventDefault();
      const { data: _data, formIsValid } = prepareFormData(this.state.formData);
      if (formIsValid) {
        try {
          if (this.state.formType === 'Update player') {
            await firebaseDB.ref(`players/${this.state.playerId}`).update(_data);
            this._successForm('Update correctly');
          } else {
            await players.push(_data);
            this.props.history.push('/adminPlayers');
          }
        } catch (e) {
          console.log(e);
          this.setState({ formError: true });
        }
      }
    };

    _successForm = message => {
      this.setState({ formSuccess: message });

      setTimeout(() => {
        this.setState({ formSuccess: '' });
      }, 2000);
    };

    _showError = () => (
      this.state.formError && <div className="error_label">Something is wrong</div>
    );

    resetImage = () => {
      const newFormData = { ...this.state.formData };
      newFormData.image.value = '';
      newFormData.image.valid = false;

      this.setState({
        defaultImg: '',
        formData: newFormData,
      });
    };

    storeFileName = fileName => {
      this.updateForm({ id: 'image' }, fileName);
    };

    render() {
      return (
        <AdminLayout>
          {this.state.isLoading
            ? <div className="lds-circle" />
            : (
              <div className="editplayers_dialog_wrapper">
                <h2>{this.state.formType}</h2>
                <div>
                  <form onSubmit={(event) => this._onSubmit(event)}>
                    <FileUploader
                      dir="players"
                      tag="Player Image"
                      defalutImage={this.state.defaultImage}
                      defalutImageName={this.state.formData.image.value}
                      resetImage={() => this.resetImage()}
                      fileName={(fileName) => this.storeFileName(fileName)}
                    />
                    <FormFields
                      id="name"
                      formData={this.state.formData.name}
                      change={(element) => this.updateForm(element)}
                    />
                    <FormFields
                      id="lastname"
                      formData={this.state.formData.lastname}
                      change={(element) => this.updateForm(element)}
                    />
                    <FormFields
                      id="number"
                      formData={this.state.formData.number}
                      change={(element) => this.updateForm(element)}
                    />
                    <FormFields
                      id="position"
                      formData={this.state.formData.position}
                      change={(element) => this.updateForm(element)}
                    />
                    <div className="success_label">{this.state.formSuccess}</div>
                    {this._showError()}
                    <div className="admin_submit">
                      <button type="button" onClick={(event) => this._onSubmit(event)}>
                        {this.state.formType}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )
            }
        </AdminLayout>
      );
    }
}

export default AddUpdatePlayer;
