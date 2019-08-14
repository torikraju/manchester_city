export const data = {
  playerId: '',
  formType: '',
  formError: false,
  formSuccess: '',
  defaultImage: '',
  isLoading: true,
  formData: {
    name: {
      element: 'input',
      value: '',
      config: {
        label: 'First Name',
        name: 'nameInput',
        type: 'text',
      },
      validation: {
        required: true,
      },
      valid: false,
      validationMessage: '',
      showLabel: true,
    },
    lastname: {
      element: 'input',
      value: '',
      config: {
        label: 'Last Name',
        name: 'lastNameInput',
        type: 'text',
      },
      validation: {
        required: true,
      },
      valid: false,
      validationMessage: '',
      showLabel: true,
    },
    number: {
      element: 'input',
      value: '',
      config: {
        label: 'Number',
        name: 'numberInput',
        type: 'number',
      },
      validation: {
        required: true,
      },
      valid: false,
      validationMessage: '',
      showLabel: true,
    },
    position: {
      element: 'select',
      value: '',
      config: {
        label: 'Select Position',
        name: 'selectPosition',
        type: 'select',
        options: [
          { key: 'Keeper', value: 'Keeper' },
          { key: 'Defence', value: 'Defence' },
          { key: 'Midfield', value: 'Midfield' },
          { key: 'Striker', value: 'Striker' },
        ],
      },
      validation: {
        required: true,
      },
      valid: false,
      validationMessage: '',
      showLabel: true,
    },
    image: {
      element: 'image',
      value: '',
      validation: {
        required: true,
      },
      valid: false,
    },
  },
};
