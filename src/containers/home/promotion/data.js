export const enrollState = {
  formError: false,
  formSuccess: '',
  formData: {
    email: {
      element: 'input',
      value: '',
      config: {
        name: 'emailInput',
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
  },
};
