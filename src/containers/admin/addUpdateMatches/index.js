import React, { Component } from 'react';

import AdminLayout from '../../../HOC/AdminLayout';
import FormFields from '../../../components/ui/formFields';
import {
  fbDataConvert, prepareFormData, validate,
} from '../../../components/ui/miscellaneous';
import { data } from './formData';
import {
  firebaseDB, teams, matches,
} from '../../../firebase';

class AddUpdateMatches extends Component {
    state = data;

    componentDidMount() {
      (async () => {
        try {
          const matchId = this.props.match.params.id;
          if (!matchId) {
            this._getTeams(false, 'Add Match', matchId);
          } else {
            const getMatch = await firebaseDB.ref(`matches/${matchId}`).once('value');
            this._getTeams(getMatch.val(), 'Update Match', matchId);
          }
        } catch (e) {
          console.log(`error in componentDidMount-AdminMatches ${e}`);
        }
      })();
    }

    _getTeams= async (match, type, matchId) => {
      try {
        const getTeams = await teams.once('value');
        const allTeams = fbDataConvert(getTeams);
        const teamOptions = this._getTeamOptions(getTeams);
        this._updateFields({
          match, teamOptions, type, matchId, allTeams,
        });
      } catch (e) {
        console.log(`error in _getTeams ${e}`);
      }
    };

    _updateFields = (props) => {
      const {
        match, teamOptions, type, matchId, allTeams,
      } = props;
      const updatedFormData = { ...this.state.formData };

      for (const key in updatedFormData) {
        if (Object.prototype.hasOwnProperty.call(updatedFormData, key)) {
          if (match) {
            updatedFormData[key].value = match[key];
            updatedFormData[key].valid = true;
          }
          if (key === 'local' || key === 'away') {
            updatedFormData[key].config.options = teamOptions;
          }
        }
      }
      this.setState({
        matchId,
        formType: type,
        formData: updatedFormData,
        teams: allTeams,
      });
    };

    _getTeamOptions = snapshot => {
      const teamOptions = [];
      snapshot.forEach(childSnapshot => {
        teamOptions.push({
          key: childSnapshot.val().shortName,
          value: childSnapshot.val().shortName,
        });
      });
      return teamOptions;
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

    _onSubmit = async (event) => {
      event.preventDefault();
      const { data: _data, formIsValid } = prepareFormData(this.state.formData);
      this.state.teams.forEach((team) => {
        if (team.shortName === _data.local) _data.localThmb = team.thmb;
        if (team.shortName === _data.away) _data.awayThmb = team.thmb;
      });
      if (formIsValid) {
        try {
          if (this.state.formType === 'Update Match') {
            await firebaseDB.ref(`matches/${this.state.matchId}`).update(_data);
            this._successForm('Updated Correctly');
          } else {
            await matches.push(_data);
            this.props.history.push('/adminMatches');
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

    render() {
      return (
        <AdminLayout>
          <div>
            <div className="editmatch_dialog_wrapper">
              <h2>{this.state.formType}</h2>
              <div>
                <form onSubmit={(event) => this._onSubmit(event)}>
                  <FormFields
                    id="date"
                    formData={this.state.formData.date}
                    change={(element) => this.updateForm(element)}
                  />
                  <div className="select_team_layout">
                    <div className="label_inputs">Local</div>
                    <div className="wrapper">
                      <div className="left">
                        <FormFields
                          id="local"
                          formData={this.state.formData.local}
                          change={(element) => this.updateForm(element)}
                        />
                      </div>
                      <div>
                        <FormFields
                          id="resultLocal"
                          formData={this.state.formData.resultLocal}
                          change={(element) => this.updateForm(element)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="select_team_layout">
                    <div className="label_inputs">Away</div>
                    <div className="wrapper">
                      <div className="left">
                        <FormFields
                          id="away"
                          formData={this.state.formData.away}
                          change={(element) => this.updateForm(element)}
                        />
                      </div>
                      <div>
                        <FormFields
                          id="resultAway"
                          formData={this.state.formData.resultAway}
                          change={(element) => this.updateForm(element)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="split_fields">
                    <FormFields
                      id="referee"
                      formData={this.state.formData.referee}
                      change={(element) => this.updateForm(element)}
                    />
                    <FormFields
                      id="stadium"
                      formData={this.state.formData.stadium}
                      change={(element) => this.updateForm(element)}
                    />
                  </div>
                  <div className="split_fields last">
                    <FormFields
                      id="result"
                      formData={this.state.formData.result}
                      change={(element) => this.updateForm(element)}
                    />

                    <FormFields
                      id="final"
                      formData={this.state.formData.final}
                      change={(element) => this.updateForm(element)}
                    />
                  </div>
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
          </div>
        </AdminLayout>
      );
    }
}

export default AddUpdateMatches;
