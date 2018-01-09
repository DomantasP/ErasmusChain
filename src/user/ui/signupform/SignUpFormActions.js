import AuthenticationContract from '../../../../build/contracts/Authentication.json'
import ErasmusContract from '../../../../build/contracts/Erasmus.json'
import { loginUser } from '../loginbutton/LoginButtonActions'
import store from '../../../store'

const contract = require('truffle-contract')

export function signUpUser(name) {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {
    return function(dispatch) {
      // Using truffle-contract we create the authentication object.
      const authentication = contract(AuthenticationContract)
      const erasmus = contract(ErasmusContract)
      authentication.setProvider(web3.currentProvider)
      erasmus.setProvider(web3.currentProvider)

      let authenticationInstance
      let erasmusInstance

      web3.eth.getCoinbase((error, coinbase) => {
        if (error) {
          console.error(error)
        }

        authentication.deployed().then(function(instance) {
          authenticationInstance = instance

          // Attempt to sign up user.
          authenticationInstance
            .signup(name, { from: coinbase })
            .catch(function(result) {
              console.error(result)
            })
        })

        erasmus
          .deployed()
          .then(function(instance) {
            erasmusInstance = instance
            return erasmusInstance
              .createUniversity(name, { from: coinbase })
              .then(function() {
                dispatch(loginUser())
              })
          })
          .catch(function(error) {
            console.error(error)
          })
      })
    }
  } else {
    console.error('Web3 is not initialized.')
  }
}
