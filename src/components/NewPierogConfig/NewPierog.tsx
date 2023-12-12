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
   const [additonalInfoValue, setAdditionalInfoValue] = useState('');

   const [newPierogData, setNewPierogData] = useState<PierogData>(initialPierogData);


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
                  newPierogData={newPierogData}
                  setNewPierogData={setNewPierogData}
                  editable={true}
               />

               {newPierogData.imageSrc && (
                  <Button
                     isDisabled={!newPierogData.name.trim()}
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
                  editable={false}
                  setEdit={setIngredientStep}
               />
               <Recipe
                  inputValues={stateProps}
                  newPierogSetter={setNewPierogData}
                  newPierogSettings={newPierogData}
               />
            </>
         );
      }
   };

   return (
      <>
         <div className={styles.form}>{stepChanger()}</div>
      </>
   );
};

export default NewPierog;
