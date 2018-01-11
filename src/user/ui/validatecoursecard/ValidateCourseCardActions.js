import ErasmusContract from '../../../../build/contracts/Erasmus.json'
import store from '../../../store'

import { fetchCourses } from '../addcoursescard/AddCoursesCardActions'

const contract = require('truffle-contract')

export function validateCourse(studentsID, id, mark, isDone) {
  console.log(studentsID)
  const web3 = store.getState().web3.web3Instance
  return function(dispatch) {
    const erasmus = contract(ErasmusContract)
    erasmus.setProvider(web3.currentProvider)
    web3.eth.getCoinbase((error, coinbase) => {
      if (error) {
        console.error(error)
      }

      erasmus.deployed().then(function(instance) {
        instance
          .validateCourse(studentsID, id, mark, isDone, { from: coinbase })
          .then(function() {
            console.log('Course edited succesfully')
            fetchCourses(studentsID)
          })
          .catch(function(result) {
            console.error(result)
          })
      })
    })
  }
}
