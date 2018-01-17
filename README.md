# ErasmusChain

##### A proof of concept decentralized application for erasmus students management.

####

##### Requirements:

* 👉 Node v6.0+
* 👉 Truffle v4.0.4+
* 👉 Solidity v0.4.11+ (It should automatically be installed by Truffle)
* 👉 Ganache v1.0.1+ (testrpc should also work, but you need to configure 'truffle.js' file. I recommend using Ganache)

##### Running the project on your machine.

* Simply download the repo:
  `git clone https://github.com/DomantasP/ErasmusChain.git`

* Then install and save node packages:
  `npm install`

* Start Ganache

* Open the project folder in a terminal and compile the contract using:
  `truffle compile`

* Then migrate it using:
  `truffle migrate`

* Now run the command:
  `npm start`

* The project should be running on `localhost:3000`

* Now you need to connect your wallet to custom rpc (Ganache) running on
  `http://localhost:7545`

* You can start using the web app 🙌

👁 In order to be able to login or signup, you need to be logged in to your in browser wallet.
Web3 should be automaticly injected by your browser. I recommend using MetaMask.

#### Goal

The whole purpose of this project is to show the capabilities and applications of real life use of smart contracts and blockchain.

#### Notes

This project isn't supposed to be real life production application. The project needs major refactoring and fixes. This is a university project I developed for 'Crypography' course in my erasmus semester in the University Of Thessaly.

I developed it using Ubuntu 17.10. Haven't tested it nor on Windows, nor on macOS. Hope it works on you machine. If you have any questions, you can reach me on twitter 🐦 [DomantasPe](https://twitter.com/DomantasPe)

This is built on top of Truffle box: react-auth

2018

#### Author

Domantas Pelaitis

#### License

MIT
