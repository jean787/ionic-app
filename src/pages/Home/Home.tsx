import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonRow,
  IonSkeletonText,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
} from '@ionic/react';
import { arrowForwardOutline, chevronBackSharp, chevronForwardOutline } from 'ionicons/icons';
import { useContext, useState } from 'react';
import ApplicationContext from '../../context/ApplicationContext';
import { Character } from '../../models/character.model';
import './Home.css';

const Home: React.FC = () => {

  const [next, setNext] = useState<string | undefined>();
  const [prev, setPrev] = useState<string | undefined | null>();
  const applicationContext = useContext(ApplicationContext);

  useIonViewDidEnter(() => {
    setTimeout(async () => {
      const result = await fetch('https://rickandmortyapi.com/api/character');
      const data = await result.json();
      const resultCharacters: Character[] = data.results;
      setNext(data.info.next);
      setPrev(data.info.prev);

      /**ACTUALIZANDO EL ESTADO */
      applicationContext.refreshCharacters(resultCharacters);
    }, 3000);
  });

  const changePage = (async (url : any) => {
    if(url != null && url != undefined){
      const result = await fetch(url ? url : '');
      const data = await result.json();
      const resultCharacters: Character[] = data.results;
      setNext(data.info.next);
      setPrev(data.info.prev);
      applicationContext.refreshCharacters(resultCharacters)
    }
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Ionic App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {applicationContext.characters.length === 0 ? (
          <IonGrid>
            <IonRow>
              <IonCol className="ion-text-center">
                <IonCard>
                  <IonSkeletonText
                    animated
                    style={{ width: '100%', height: '300px' }}
                  />
                  <IonCardHeader>
                    <IonCardSubtitle>
                      <IonSkeletonText animated style={{ width: '100%' }} />
                    </IonCardSubtitle>
                    <IonCardTitle>
                      <IonSkeletonText animated style={{ width: '100%' }} />
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonSkeletonText animated style={{ width: '100%' }} />
                  </IonCardContent>
                </IonCard>
                <IonCard>
                  <IonSkeletonText
                    animated
                    style={{ width: '100%', height: '300px' }}
                  />
                  <IonCardHeader>
                    <IonCardSubtitle>
                      <IonSkeletonText animated style={{ width: '100%' }} />
                    </IonCardSubtitle>
                    <IonCardTitle>
                      <IonSkeletonText animated style={{ width: '100%' }} />
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonSkeletonText animated style={{ width: '100%' }} />
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        ) : (
          <IonGrid>
            <IonRow>
              <IonCol size="1"></IonCol>
              <IonCol size="5">
                <IonButton onClick={() =>changePage(prev)}>
                  <IonIcon icon={chevronBackSharp} />
                  Anterior
                </IonButton>
              </IonCol>
              <IonCol size="5">
                <IonButton onClick={() =>changePage(next)}>
                  Siguiente
                  <IonIcon icon={chevronForwardOutline}/>
                </IonButton>
              </IonCol>
            </IonRow>
            
            {applicationContext.characters.map((item) => (
              <IonRow key={item.id}>
                <IonCol className="ion-text-center">
                  <IonCard>
                    <img src={item.image} alt="content-rym" />
                    <IonCardHeader>
                      <IonCardSubtitle>{item.species}</IonCardSubtitle>
                      <IonCardTitle>{item.name}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <p>{item.status}</p>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            ))}
          </IonGrid>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
