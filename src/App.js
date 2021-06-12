import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Extract from './pages/Extract/Extract';
import ChangePass from './pages/ChangePass/ChangePass';
import KeystoreFromPrivate from './pages/KeystoreFromPrivate/KeystoreFromPrivate';
import IterationCount from './pages/IterationCount/IterationCount';
import Mnemonic from './pages/Mnemonic/Mnemonic';
import PageNotFound from './pages/PageNotFound/PageNotFound';


function App() {
    return (
        <div className="container">
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/extract-private-key" component={Extract} />
                <Route path="/change-keystore-pass" component={ChangePass} />
                <Route path="/keystore-from-private" component={KeystoreFromPrivate} />
                <Route path="/accounts-from-mnemonic" component={Mnemonic} />
                <Route path="/change-iteration-count" component={IterationCount} />
                <Route path="*" component={PageNotFound} />
            </Switch>
        </div>
    );
}

export default App;
