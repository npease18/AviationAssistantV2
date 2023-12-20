import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/Tab1Page';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>tar1090</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">tar1090</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="tar1090 iframe" />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
