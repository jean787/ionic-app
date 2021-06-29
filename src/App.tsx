import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Home from './pages/Home/Home';
import Welcome from './pages/Welcome/Welcome';
import Maps from './pages/Maps/Maps';
import Profile from './pages/Profile/Profile';
import ApplicationContextProvider from './context/ApplicationContextProvider';
import Menu from './components/Menu/Menu';
import ProtectedRoute from './hoc/ProtectedRoute';

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <Menu />
        <ApplicationContextProvider>
          <IonRouterOutlet id="main-app">
            <ProtectedRoute path="/home" component={Home} />
            <Route exact path="/maps" component={Maps} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/welcome" component={Welcome} />
            <Route exact path="/">
              <Redirect to="/welcome" />
            </Route>
          </IonRouterOutlet>
        </ApplicationContextProvider>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
