import ErasmusContract from '../../../../build/contracts/Erasmus.json'
import store from '../../../store'

const contract = require('truffle-contract')

export const SET_COURSES = 'SET_COURSES'

function setCourses(studentsID, courses) {
  return {
    type: SET_COURSES,
    payload: courses,
    id: studentsID
  }
}

export function removeCourse(studentsID, id) {
  const web3 = store.getState().web3.web3Instance
  return function(dispatch) {
    const erasmus = contract(ErasmusContract)
    erasmus.setProvider(web3.currentProvider)
    web3.eth.getCoinbase((error, coinbase) => {
      if (error) {
        console.error(error)
      }

      erasmus.deployed().then(function(instance) {
        console.log(coinbase)
        instance
          .removeCourse(studentsID, id, { from: coinbase })
          .then(function() {
            console.log('Course removed succesfully')
            fetchCourses(studentsID)
          })
          .catch(function(result) {
            console.error(result)
          })
      })
    })
  }
}

export function setCourse(studentsID, id, title, credits) {
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
          .setCourse(studentsID, id, title, credits, { from: coinbase })
          .then(function() {
            console.log('Course added succesfully')
            fetchCourses(studentsID)
          })
          .catch(function(result) {
            console.error(result)
          })
      })
    })
  }
}

export function fetchCourses(studentsID) {
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
          .getCoursesArray(studentsID, { from: coinbase })
          .then(function(array) {
            const coursesArray = array[0].map((val, i) => {
              return {
                id: web3.toUtf8(array[0][i]),
                title: web3.toUtf8(array[1][i]),
                credits: array[2][i].toString(10),
                mark: array[3][i].toString(10),
                isDone: array[4][i]
              }
            })

            dispatch(setCourses(studentsID, coursesArray))
          })
          .catch(function(result) {
            console.error(result)
          })
      })
    })
  }
}
