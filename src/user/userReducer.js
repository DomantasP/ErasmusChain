const initialState = {
  data: null,
  successMessageIsActive: false,
  errorMessageIsActive: false,
  students: [],
  localStudents: [],
  erasmuStudents: [],
  studentsListType: 'localStudents'
}

const userReducer = (state = initialState, action) => {
  if (action.type === 'USER_LOGGED_IN' || action.type === 'USER_UPDATED') {
    return Object.assign({}, state, {
      data: action.payload
    })
  }

  if (action.type === 'USER_LOGGED_OUT') {
    return Object.assign({}, state, {
      data: null
    })
  }

  if (action.type === 'SUCCESS_MESSAGE_TOGGLE') {
    return Object.assign({}, state, {
      successMessageIsActive: !state.successMessageIsActive
    })
  }

  if (action.type === 'ERROR_MESSAGE_TOGGLE') {
    return Object.assign({}, state, {
      errorMessageIsActive: !state.errorMessageIsActive
    })
  }

  if (action.type === 'SET_STUDENTS') {
    return Object.assign({}, state, {
      students: action.payload
    })
  }

  if (action.type === 'SET_LOCAL_STUDENTS') {
    return Object.assign({}, state, {
      localStudents: action.payload
    })
  }

  if (action.type === 'SET_ERASMUS_STUDENTS') {
    return Object.assign({}, state, {
      erasmuStudents: action.payload
    })
  }

  if (action.type === 'ADD_STUDENTS') {
    return Object.assign({}, state, {
      students: [...state.students, action.payload]
    })
  }

  return state
}

export default userReducer
