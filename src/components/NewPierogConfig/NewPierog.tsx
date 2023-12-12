import { useEffect, useState } from 'react';
import styles from './NewPierog.module.css';

// components
import Ingredients from './Ingredients';
import PierogImage from './PierogImage';
import Recipe from './Recipe';
import Button from '../UI/Button';
import { ButtonType } from '../../enums/enums';
import { PierogData } from '../../interfaces';

const initialPierogData: PierogData = {
   name: '',
   imageSrc: '',
   ingredients: {
      dough: [],
      filling: [],
   },
   instructions: {
      dough_preparation: [],
      filling_preparation: [],
      forming_and_cooking_dumplings: [],
      serving: [],
   },
};

const NewPierog = () => {
   const [doughValue, setDoughValue] = useState('');
   const [fillingValue, setFillingValue] = useState('');
   const [ingredsValue, setIngredsValue] = useState('');
   const [pierogName, setPierogName] = useState('');
   const [imageData, setImageData] = useState('');

   const [newPierogData, setNewPierogData] = useState<PierogData>(initialPierogData);

   const [additonalInfoValue, setAdditionalInfoValue] = useState('');

   const [ingredientStep, setIngredientStep] = useState(true);

   const stateProps = {
      values: {
         dough: doughValue,
         filling: fillingValue,
         ingreds: ingredsValue,
         additonalInfo: additonalInfoValue,
      },
      setters: {
         dough: setDoughValue,
         filling: setFillingValue,
         ingreds: setIngredsValue,
         additonalInfo: setAdditionalInfoValue,
      },
   };

   const nameAndImage = {
      nameSettings: { value: pierogName, setter: setPierogName },
      imageSettings: { value: imageData, setter: setImageData },
   };

   const handleSave = () => {
      setIngredientStep(false);
   };

   useEffect(() => {
      console.log(newPierogData);
   }, [newPierogData]);

   const stepChanger = () => {
      if (ingredientStep) {
         return (
            <>
               <Ingredients inputValues={stateProps} />
               <PierogImage
                  inputValues={stateProps.values}
                  pierogSettings={nameAndImage}
                  newPierogData={newPierogData}
                  setNewPierogData={setNewPierogData}
                  editable={true}
               />

               {imageData && (
                  <Button
                     isDisabled={!pierogName.trim()}
                     type={ButtonType.Primary}
                     onClick={handleSave}
                  >
                     Zapisz i przejdź do tworzenia przepisu
                  </Button>
               )}
            </>
         );
      } else {
         return (
            <>
               <PierogImage
                  newPierogData={newPierogData}
                  setNewPierogData={setNewPierogData}
                  inputValues={stateProps.values}
                  pierogSettings={nameAndImage}
                  editable={false}
                  setEdit={setIngredientStep}
               />
               <Recipe inputValues={stateProps} nameSettings={nameAndImage.nameSettings} />
            </>
         );
      }
   };

   return (
      <>
         <div className={styles.form}>{stepChanger()}</div>
         {/* this is just for testing */}
         {/* <Recipe inputValues={stateProps} nameSettings={nameAndImage.nameSettings} /> */}
      </>
   );
};

export default NewPierog;
