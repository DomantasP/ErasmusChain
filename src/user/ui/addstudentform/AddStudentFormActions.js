import ErasmusContract from '../../../../build/contracts/Erasmus.json'
import store from '../../../store'

const contract = require('truffle-contract')

export function addStudent(firstName, lastName, id) {
  let web3 = store.getState().web3.web3Instance

  if (typeof web3 !== 'undefined') {
    return function(dispatch) {
      const erasmus = contract(ErasmusContract)
      erasmus.setProvider(web3.currentProvider)

      let erasmusInstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error)
        }

        erasmus.deployed().then(function(instance) {
          erasmusInstance = instance

          erasmusInstance
            .addStudent(firstName, lastName, id, { from: coinbase })
            .then(function(result) {
              // MOVE TO SUCCESS PAGE
              //return dispatch(loginUser())
            })
            .catch(function(result) {
              console.error(result)
            })
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.')
  }
}
