import { useState } from 'react';
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
   const [isGeneratingRecipe, setIsGeneratingRecipe] = useState(false);
   const [isGeneratingImage, setIsGeneratingImage] = useState(false);
   const [isGeneratingIngredients, setIsGeneratingIngredients] = useState(false);

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

   const stepChanger = () => {
      if (ingredientStep) {
         return (
            <>
               <Ingredients
                  inputValues={stateProps}
                  isGeneratingIngredients={isGeneratingIngredients}
                  setIsGeneratingIngredients={setIsGeneratingIngredients}
                  isGeneratingImage={isGeneratingImage}
               />
               <PierogImage
                  inputValues={stateProps.values}
                  newPierogData={newPierogData}
                  setNewPierogData={setNewPierogData}
                  editable={true}
                  isGeneratingRecipe={isGeneratingRecipe}
                  isGeneratingIngredients={isGeneratingIngredients}
                  isGeneratingImage={isGeneratingImage}
                  setIsGeneratingImage={setIsGeneratingImage}
               />

               {newPierogData.imageSrc && (
                  <Button
                     isDisabled={
                        !newPierogData.name.trim() || isGeneratingImage || isGeneratingIngredients
                     }
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
                  inputValues={stateProps.values}
                  newPierogData={newPierogData}
                  setNewPierogData={setNewPierogData}
                  editable={false}
                  setEdit={setIngredientStep}
                  isGeneratingRecipe={isGeneratingRecipe}
                  isGeneratingIngredients={isGeneratingIngredients}
                  isGeneratingImage={isGeneratingImage}
                  setIsGeneratingImage={setIsGeneratingImage}
               />
               <Recipe
                  inputValues={stateProps}
                  newPierogSetter={setNewPierogData}
                  newPierogSettings={newPierogData}
                  isGeneratingRecipe={isGeneratingRecipe}
                  setIsGeneratingRecipe={setIsGeneratingRecipe}
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
