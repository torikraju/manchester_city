import React from 'react';

const FormFields = ({ formData, id, change }) => {
  const _showError = () => (
    <div className="error_label">
      {formData.validation && !formData.valid ? formData.validationMessage : null}
    </div>
  );

  const _showFormLabel = () => (
    formData.showLabel && (
      <div className="label_inputs">
        {formData.config.label}
      </div>
    )
  );

  const _renderTemplate = () => {
    let formTemplate = null;
    if (formData.element === ('input')) {
      formTemplate = (
        <div>
          {_showFormLabel()}
          <input
            {...formData.config}
            value={formData.value}
            onChange={(event) => change({ event, id })}
          />
          { _showError() }
        </div>
      );
    } else if (formData.element === ('select')) {
      formTemplate = (
        <div>
          {_showFormLabel()}
          <select value={formData.value} onChange={(event) => change({ event, id })}>
            <option value="">Select One</option>
            {formData.config.options.map((el) => (
              <option key={el.key} value={el.key}>
                {el.value}
              </option>
            ))}
          </select>
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
