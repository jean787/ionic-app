import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  IonToast,
  IonToolbar,
} from '@ionic/react';
import { chevronBackSharp } from 'ionicons/icons';
import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { User } from '../../models/user.model';
import { SignUp } from '../../services/AuthenticationService';

import './Register.css';
const Register: React.FC = () => {
  const history = useHistory();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<string>();
  const [duration, setDuration] = useState<number>();

  const refFirstName = useRef<HTMLIonInputElement>(null);
  const refLastName = useRef<HTMLIonInputElement>(null);
  const refEmail = useRef<HTMLIonInputElement>(null);
  const refPassword = useRef<HTMLIonInputElement>(null);

  const handleClickSignUp = async () => {
    const firstName = refFirstName.current?.value as string;
    const lastName = refLastName.current?.value as string;
    const email = refEmail.current?.value as string;
    const password = refPassword.current?.value as string;
    

    if (firstName && lastName && email && password) {

      const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

      if(firstName.length > 6 && lastName.length > 6 && password.length > 6 && emailRegex.test(email)){

        const userToRegister: User = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        };
  
        const resultSignUp = await SignUp(userToRegister);
        if (resultSignUp.userExists) {
          setMessage(resultSignUp.message);
          setDuration(3000);
        } else {
          if (resultSignUp.data) {
            setShowAlert(true);
          }
        } 
      }else{
        setMessage('No completo los campos correctamente');
        setDuration(900);
      }
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

  const validateCharactersMin = async (field: React.RefObject<HTMLIonInputElement>)=> {
    let fielvalid = field.current?.value as string;
    const fieldRegex = /^[a-zA-Z0-9]{7,20}$/;
    if(!fieldRegex.test(fielvalid)){
      setMessage('El campo debe ser mayor a 6 caracteres');
      setDuration(200);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonButton routerLink="/login" routerDirection="back">
              <IonIcon icon={chevronBackSharp} />
              Regresar
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <br />
        <figure>
          <img
            src="https://ionicframework.com/blog/wp-content/uploads/2019/02/ionic-vs-react-native.png"
            alt="logo-app"
          />
        </figure>
        <IonItem lines="none" className="ion-item-register">
          <IonInput 
            type="text" 
            placeholder="Nombres" 
            ref={refFirstName} 
            onKeyUp={() => validateCharactersMin(refFirstName)}/>
        </IonItem>
        <IonItem lines="none" className="ion-item-register">
          <IonInput 
            type="text" 
            placeholder="Apellidos" 
            ref={refLastName} 
            onKeyUp={() => validateCharactersMin(refLastName)} />
        </IonItem>
        <IonItem lines="none" className="ion-item-register">
          <IonInput
            type="email"
            placeholder="Correo Electronico"
            ref={refEmail}
            onKeyUp={() => validateEmail()}
          />
        </IonItem>
        <IonItem lines="none" className="ion-item-register">
          <IonInput
            type="password"
            placeholder="Contraseña"
            ref={refPassword}
            onKeyUp={() => validateCharactersMin(refPassword)}
          />
        </IonItem>
        <IonAlert
          isOpen={showAlert}
          header="Felicidades"
          message="La cuenta se registro correctamente."
          buttons={[
            {
              text: 'OK',
              handler: () => {
                history.push('/login');
              },
            },
          ]}
        />
        <IonToast
          isOpen={message !== undefined}
          onDidDismiss={() => {
            setMessage(undefined);
            setDuration(3000);
          }}
          message={message}
          duration={duration}
        />
      </IonContent>
      <IonFooter className="ion-padding">
        <IonButton
          size="large"
          expand="block"
          fill="solid"
          onClick={handleClickSignUp}
        >
          Registrar
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default Register;
