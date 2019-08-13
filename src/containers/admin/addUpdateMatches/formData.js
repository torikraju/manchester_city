export const data = {
  matchId: '',
  formType: '',
  formError: false,
  formSuccess: '',
  teams: [],
  formData: {
    date: {
      element: 'input',
      value: '',
      config: {
        label: 'Event date',
        name: 'dateInput',
        type: 'date',
      },
      validation: {
        required: true,
      },
      valid: false,
      validationMessage: '',
      showLabel: true,
    },
    local: {
      element: 'select',
      value: '',
      config: {
        label: 'Select a local team',
        name: 'selectLocal',
        type: 'select',
        options: [],
      },
      validation: {
        required: true,
      },
      valid: false,
      validationMessage: '',
      showLabel: false,
    },
    resultLocal: {
      element: 'input',
      value: '',
      config: {
        label: 'Result local',
        name: 'resultLocalInput',
        type: 'text',
      },
      validation: {
        required: true,
      },
      valid: false,
      validationMessage: '',
      showLabel: false,
    },
    away: {
      element: 'select',
      value: '',
      config: {
        label: 'Select a Away team',
        name: 'selectAway',
        type: 'select',
        options: [],
      },
      validation: {
        required: true,
      },
      valid: false,
      validationMessage: '',
      showLabel: false,
    },
    resultAway: {
      element: 'input',
      value: '',
      config: {
        label: 'Result local',
        name: 'resultAwayInput',
        type: 'text',
      },
      validation: {
        required: true,
      },
      valid: false,
      validationMessage: '',
      showLabel: false,
    },
    referee: {
      element: 'input',
      value: '',
      config: {
        label: 'Referee',
        name: 'refereeInput',
        type: 'text',
      },
      validation: {
        required: true,
      },
      valid: false,
      validationMessage: '',
      showLabel: true,
    },
    stadium: {
      element: 'input',
      value: '',
      config: {
        label: 'Stadium',
        name: 'stadiumInput',
        type: 'text',
      },
      validation: {
        required: true,
      },
      valid: false,
      validationMessage: '',
      showLabel: true,
    },
    result: {
      element: 'select',
      value: '',
      config: {
        label: 'Team result',
        name: 'selectResult',
        type: 'select',
        options: [
          { key: 'W', value: 'W' },
          { key: 'L', value: 'L' },
          { key: 'D', value: 'D' },
          { key: 'n/a', value: 'n/a' },
        ],
      },
      validation: {
        required: true,
      },
      valid: false,
      validationMessage: '',
      showLabel: true,
    },
    final: {
      element: 'select',
      value: '',
      config: {
        label: 'Game played ?',
        name: 'selectPlayed',
        type: 'select',
        options: [
          { key: 'Yes', value: 'Yes' },
          { key: 'No', value: 'No' },
        ],
      },
      validation: {
        required: true,
      },
      valid: false,
      validationMessage: '',
      showLabel: true,
    },
  },
};
