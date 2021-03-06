import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { UserIsAuthenticated, UserIsNotAuthenticated } from './util/wrappers.js'
import getWeb3 from './util/web3/getWeb3'

// Layouts
import App from './App'
import Home from './layouts/Home'
import Dashboard from './layouts/Dashboard'
import SignUp from './layouts/SignUp'
import Profile from './layouts/Profile'
import AddStudent from './layouts/AddStudent'
import MyStudentsContainer from './user/ui/mystudents/MyStudentsContainer'

// Redux Store
import store from './store'

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store)

// Initialize web3 and set in Redux.
getWeb3
  .then(results => {
    console.log('Web3 initialized!')
  })
  .catch(() => {
    console.log('Error in web3 initialization.')
  })

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="dashboard" component={UserIsAuthenticated(Dashboard)} />
        <Route path="addStudent" component={UserIsAuthenticated(AddStudent)} />
        <Route path="signup" component={UserIsNotAuthenticated(SignUp)} />
        <Route path="profile" component={UserIsAuthenticated(Profile)} />
        <Route
          path="myStudents"
          component={UserIsAuthenticated(MyStudentsContainer)}
          type="localStudents"
        />
        <Route
          path="erasmusStudents"
          component={UserIsAuthenticated(MyStudentsContainer)}
          type="erasmusStudents"
        />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
