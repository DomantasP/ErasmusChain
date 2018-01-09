import ErasmusContract from '../../../../build/contracts/Erasmus.json'
import store from '../../../store'
import {
  toggleSuccessNotification,
  toggleErrorNotification
} from '../../userActions'

const contract = require('truffle-contract')

export const ADD_STUDENT = 'ADD_STUDENT'
function addStudentToStore(student) {
  return {
    type: ADD_STUDENT,
    payload: student
  }
}

export function addStudent(firstName, lastName, id) {
  let web3 = store.getState().web3.web3Instance

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

          erasmusInstance
            .addStudent(firstName, lastName, id, { from: coinbase })
            .then(function(result) {
              dispatch(toggleSuccessNotification())
              dispatch(addStudentToStore())
            })
            .catch(function(result) {
              dispatch(toggleErrorNotification())
              console.error(result)
            })
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.')
  }
}
