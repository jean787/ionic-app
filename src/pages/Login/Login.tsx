import {
  IonButton,
  IonContent,
  IonFooter,
  IonInput,
  IonItem,
  IonPage,
  IonToast,
} from '@ionic/react';
import React, { useContext, useRef, useState } from 'react';
import { SignIn } from '../../services/AuthenticationService';
import { User } from '../../models/user.model';

import './Login.css';
import { Result } from '../../models/resultAuthenticated.model';
import { Storage } from '@capacitor/storage';
import ApplicationContext from '../../context/ApplicationContext';

const Login: React.FC = () => {
  const [message, setMessage] = useState<string>();
  const [duration, setDuration] = useState<number>();

  const applicationContext = useContext(ApplicationContext);
  const refEmail = useRef<HTMLIonInputElement>(null);
  const refPassword = useRef<HTMLIonInputElement>(null);

  const handleClickSignIn = async () => {
    const email = refEmail.current?.value as string;
    const password = refPassword.current?.value as string;

    const userSignIn: User = {
      email: email,
      password: password,
    };
    const resultSignIn: Result = await SignIn(userSignIn);
    if (resultSignIn.isAuthenticated) {
  
      let email = resultSignIn.data?.email;
      let user = `${resultSignIn.data?.firstName} ${resultSignIn.data?.lastName}`
      Storage.set({ key: 'IS_AUTHENTICATED', value: 'true' });
      Storage.set({ key: 'email', value: email ? email : ''});
      Storage.set({ key: 'user', value: user ? user : ''});
      applicationContext.refreshAuthenticated();
    } else {
      setMessage(resultSignIn.message);
      setDuration(3000);
    }
  };

  const validateEmail = async () => {
    let email = refEmail.current?.value as string;
    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if(!emailRegex.test(email)){
      setMessage('Correo no valido');
      setDuration(150);
    }
  };

  const validatePassword = async ()=> {
    let password = refPassword.current?.value as string;
    const passwordRegex = /^[a-zA-Z0-9]{7,20}$/;
    if(!passwordRegex.test(password)){
      setMessage('La clave debe ser mayor a 6 caracteres');
      setDuration(150);
    }
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <br />
        <br />
        <figure>
          <img
            src="https://ionicframework.com/blog/wp-content/uploads/2019/02/ionic-vs-react-native.png"
            alt="logo-app"
          />
        </figure>
        <br />
        <IonItem lines="none" className="ion-item-login">
          <IonInput
            type="email"
            placeholder="Correo Electronico"
            ref={refEmail}
            onKeyUp={() => validateEmail()}
          />
        </IonItem>
        <IonItem lines="none" className="ion-item-login">
          <IonInput
            type="password"
            placeholder="Contraseña"
            ref={refPassword}
            onKeyUp={() => validatePassword()}
          />
        </IonItem>
      </IonContent>
      <IonFooter className="ion-padding">
        <IonButton
          size="large"
          expand="block"
          type="button"
          fill="solid"
          onClick={handleClickSignIn}
        >
          Ingresar
        </IonButton>
        <IonButton
          size="large"
          expand="block"
          fill="outline"
          routerLink="/register"
          routerDirection="forward"
        >
          Registrar
        </IonButton>

        <IonToast
          isOpen={message !== undefined}
          onDidDismiss={() => {
            setMessage(undefined);
            setDuration(3000)
          }}
          message={message}
          duration={duration}
        />
      </IonFooter>
    </IonPage>
  );
};

export default Login;
