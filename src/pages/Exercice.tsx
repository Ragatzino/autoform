import React, { useState, useEffect } from "react";
import data from "../data/challenges.json";
import { RouteComponentProps } from "react-router-dom";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";

interface ExercicePageProps
  extends RouteComponentProps<{
    category: string;
    idChallenge: string;
    exerciceId: string;
  }> {}

const Exercice: React.FC<ExercicePageProps> = ({ match }) => {
  const [valide, setValide] = useState();
  const [exercice, setExercice] = useState();

  useEffect(() => {
    const exercice = data.challenges
    .filter(e=>e.id === match.params.category)
    .map(e=> e.tests.filter(e => e.id === match.params.idChallenge)
    .map(e => e.exercices.filter(e => e.id === match.params.exerciceId)));
    if (exercice.length === 1) {
      setExercice(exercice);
    }
  }, [match]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Exercice</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {exercice ? <div> {exercice.description}</div> : <>Loading ...</>}
      </IonContent>
    </IonPage>
  );
};

export default Exercice;
