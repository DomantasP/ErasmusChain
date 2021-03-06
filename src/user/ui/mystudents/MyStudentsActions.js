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

      web3.eth.getCoinbase((error, coinbase) => {
        if (error) {
          console.error(error)
        }

        erasmus.deployed().then(function(instance) {
          if (type === 'localStudents') {
            instance
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
            instance
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
  let usedIds = []
  const studentsArray = array[0].map((studId, i) => {
    return {
      id: studId.toString(10),
      firstName: web3.toAscii(array[1][i]),
      lastName: web3.toAscii(array[2][i])
    }
  })

  return studentsArray.filter(stud => {
    if (usedIds.indexOf(stud.id) < 0) {
      usedIds.push(stud.id.toString(10))
      return stud
    } else {
      return false
    }
  })
}
