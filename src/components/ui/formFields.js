import React from 'react';

const FormFields = ({ formData, id, change }) => {
  const _showError = () => (
    <div className="error_label">
      {formData.validation && !formData.valid ? formData.validationMessage : null}
    </div>
  );

  const _renderTemplate = () => {
    let formTemplate = null;
    if (formData.element === ('input')) {
      formTemplate = (
        <div>
          <input
            {...formData.config}
            value={formData.value}
            onChange={(event) => change({ event, id })}
          />
          { _showError() }
        </div>
      );
    } else {
      formTemplate = null;
    }
    return formTemplate;
  };

  return (
    <div>
      {_renderTemplate()}
    </div>
  );
};

export default FormFields;
