import React, { Component } from 'react';
import FirebaseFileUploader from 'react-firebase-file-uploader';
import CircularProgress from '@material-ui/core/CircularProgress';

import { firebase } from '../../firebase';

class FileUploader extends Component {
    state = {
      name: '',
      isUploading: false,
      fileUrl: '',
    };

    // eslint-disable-next-line no-unused-vars
    static getDerivedStateFromProps(props, state) {
      if (props.defalutImage) {
        // eslint-disable-next-line no-return-assign,no-param-reassign
        return state = {
          name: props.defalutImageName,
          fileUrl: props.defalutImage,
        };
      }
      return null;
    }

    _handleUploadStart = () => {
      this.setState({
        isUploading: true,
      });
    };

    _handleUploadError = () => {
      this.setState({
        isUploading: false,
      });
    };

    _handleUploadSuccess = async filename => {
      try {
        this.setState({
          name: filename,
          isUploading: false,
        });
        const imageUrl = await firebase.storage().ref(this.props.dir)
          .child(filename).getDownloadURL();
        this.setState({ fileUrl: imageUrl });
        this.props.fileName(filename);
      } catch (e) {
        console.log(`error in FileUploader:_handleUploadSuccess ${e}`);
      }
    };

    _showLoading = () => (
      this.state.isUploading && (
        <div
          className="progress"
          style={{ textAlign: 'center', margin: '30px 0' }}
        >
          <CircularProgress style={{ color: '#98c6e9' }} />
        </div>
      )
    );

    _uploadAgain = async () => {
      try {
        this.setState({ isUploading: true });
        await firebase.storage().ref(this.props.dir).child(this.state.name).delete();
        this.setState({
          name: '',
          isUploading: false,
          fileUrl: '',
        });
        this.setState({ isUploading: false });
        this.props.resetImage();
      } catch (e) {
        console.log(`error in FileUploader:_uploadAgain ${e}`);
      }
    };

    render() {
      return (
        <div>
          {!this.state.fileUrl
            ? (
              <div>
                <div className="label_inputs">{this.props.tag}</div>
                <FirebaseFileUploader
                  accept="image/*"
                  name="image"
                  randomizeFilename
                  storageRef={firebase.storage().ref(this.props.dir)}
                  onUploadStart={this._handleUploadStart}
                  onUploadError={this._handleUploadError}
                  onUploadSuccess={this._handleUploadSuccess}
                />
              </div>
            )
            : null
            }
          { this.state.fileUrl ? (
            <div className="image_upload_container">
              <img style={{ width: '100%' }} src={this.state.fileUrl} alt={this.state.name} />
              {/* eslint-disable-next-line max-len */}
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
              <div className="remove" onClick={() => this._uploadAgain()}>Remove</div>
            </div>
          )
            : null
            }
          {this._showLoading()}
        </div>
      );
    }
}

export default FileUploader;
