import ErasmusContract from '../../../../build/contracts/Erasmus.json'
import store from '../../../store'

const contract = require('truffle-contract')

export function addUniversity(studentsID, address) {
  const web3 = store.getState().web3.web3Instance

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
            .setErasmusUniversity(studentsID, address, { from: coinbase })
            .then(function() {
              console.log(
                'University added, this message should be replaced with success notification'
              )
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
