import React from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './include/bootstrap';
import './App.css';
import { Route, Switch, BrowserRouter} from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from '../src/redux/store';
import { persistor } from '../src/redux/store';
import ReimburseComp from './components/reimburse-comp';
import UserComp from './components/user-comp';
import StatusComp from './components/status-comp';
import AuthorComp from './components/author-comp';
import PostReimburseComp from './components/post-reimburse-comp';
import HomeComp from './components/home-comp';
import GetUserComp from './components/get-user-comp';
import AllUsersComp from './components/all-users-comp';
import UpdateReimbursement from './components/update-reimburse-comp';
import { PersistGate } from 'redux-persist/integration/react';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
      <div id="main">
        <BrowserRouter>
          <Switch>
            <Route path="/home" component={HomeComp} />
            <Route path="/reimbursements" component={ReimburseComp} />          
            <Route path="/status" component={StatusComp} />          
            <Route path="/author" component={AuthorComp} />          
            <Route path="/new-reimbursement" component={PostReimburseComp} />
            <Route path="/users" component={UserComp} />
            <Route path="/profile" component={GetUserComp} />
            <Route path="/all-users" component={AllUsersComp} />
            <Route path="/update" component={UpdateReimbursement} />
            <Route component={HomeComp} />
          </Switch>
        </BrowserRouter>        
      </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
