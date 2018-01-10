import ErasmusContract from '../../../../build/contracts/Erasmus.json'
import store from '../../../store'

const contract = require('truffle-contract')
let web3 = {}

export const SET_STUDENTS = 'SET_STUDENTS'
export const SET_LOCAL_STUDENTS = 'SET_LOCAL_STUDENTS'
export const SET_ERASMUS_STUDENTS = 'SET_ERASMUS_STUDENTS'

function setLocalStudents(students) {
  return {
    type: SET_LOCAL_STUDENTS,
    payload: students
  }
}

function setErasmusStudents(students) {
  return {
    type: SET_ERASMUS_STUDENTS,
    payload: students
  }
}

function setStudents(students) {
  return {
    type: SET_STUDENTS,
    payload: students
  }
}

export function fetchStudents(type) {
  web3 = store.getState().web3.web3Instance

  if (typeof web3 !== 'undefined') {
    return function(dispatch) {
      const erasmus = contract(ErasmusContract)
      erasmus.setProvider(web3.currentProvider)

      let erasmusInstance

      web3.eth.getCoinbase((error, coinbase) => {
        if (error) {
          console.error(error)
        }

        erasmus.deployed().then(function(instance) {
          erasmusInstance = instance

          if (type === 'localStudents') {
            erasmusInstance
              .getLocalStudentsArray({ from: coinbase })
              .then(function(array) {
                const students = makeStudentsArray(array)
                dispatch(setLocalStudents(students))
                dispatch(setStudents(students))
              })
              .catch(function(result) {
                console.error(result)
              })
          }

          if (type === 'erasmusStudents') {
            erasmusInstance
              .getErasmusStudentsArray({ from: coinbase })
              .then(function(array) {
                const students = makeStudentsArray(array)
                dispatch(setErasmusStudents(students))
                dispatch(setStudents(students))
              })
              .catch(function(result) {
                console.error(result)
              })
          }
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.')
  }
}

function makeStudentsArray(array) {
  return array[0].map((studId, i) => {
    return {
      id: studId.toString(10),
      firstName: web3.toAscii(array[1][i]),
      lastName: web3.toAscii(array[2][i])
    }
  })
}
