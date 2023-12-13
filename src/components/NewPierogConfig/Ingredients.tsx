import { useState } from 'react';
import styles from './NewPierog.module.css';
import { ButtonType, IngredType } from '../../enums/enums';
import { generateAIText } from '../../api/client';
import DumplingIcon from '../icons/DumplingIcon';
import Button from '../UI/Button';
import IngredientInput from '../UI/IngredientInput';
import Loader from '../UI/Loader';

interface IngredientsProps {
   inputValues: {
      values: {
         dough: string;
         filling: string;
         ingreds: string;
      };
      setters: {
         dough: React.Dispatch<React.SetStateAction<string>>;
         filling: React.Dispatch<React.SetStateAction<string>>;
         ingreds: React.Dispatch<React.SetStateAction<string>>;
      };
   };
   isGeneratingIngredients: boolean;
   setIsGeneratingIngredients: React.Dispatch<React.SetStateAction<boolean>>;
   isGeneratingImage: boolean;
}

const Ingredients = (props: IngredientsProps) => {
   const [doughLocked, setDoughLocked] = useState(false);
   const [fillingLocked, setFillingLocked] = useState(false);
   const [ingredsLocked, setIngredsLocked] = useState(false);

   const {
      values: { dough: doughValue, filling: fillingValue, ingreds: ingredsValue },
      setters: { dough: setDoughValue, filling: setFillingValue, ingreds: setIngredsValue },
   } = props.inputValues;

   const ingredTypes = Object.values(IngredType);

   const setValueHelper = (ingredient: IngredType, newValue: string) => {
      switch (ingredient) {
         case IngredType.ciasto:
            setDoughValue(newValue);
            break;
         case IngredType.nadzienie:
            setFillingValue(newValue);
            break;
         case IngredType.skladniki:
            setIngredsValue(newValue);
            break;
         default:
            break;
      }
   };

   const getBooleanHelper = (ingredient: IngredType) => {
      switch (ingredient) {
         case IngredType.ciasto:
            return doughLocked;
         case IngredType.nadzienie:
            return fillingLocked;
         case IngredType.skladniki:
            return ingredsLocked;
         default:
            return false;
      }
   };

   const handleGenerate = async () => {
      props.setIsGeneratingIngredients(true);

      const promises = ingredTypes.map(async (ingredient) => {
         if (getBooleanHelper(ingredient)) return;
         const apiResponse = await generateAIText(ingredient);
         const newValue = apiResponse.choices[0].message.content;
         setValueHelper(ingredient, newValue);
      });

      await Promise.all(promises);

      props.setIsGeneratingIngredients(false);
   };

   const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>, ingredient: IngredType) => {
      const newValue = event.target.value;
      setValueHelper(ingredient, newValue);
   };

   return (
      <>
         <div className={styles.formHeader}>
            <h2>
               <DumplingIcon /> Składniki
            </h2>
            <div className={styles.formHeaderButtonSection}>
               {props.isGeneratingIngredients && <Loader />}
               <Button
                  type={ButtonType.Secondary}
                  onClick={handleGenerate}
                  isDisabled={props.isGeneratingIngredients || props.isGeneratingImage}
               >
                  Generuj
               </Button>
            </div>
         </div>
         <section>
            <IngredientInput
               ingredientName={IngredType.ciasto}
               displayValue={doughValue}
               isLocked={doughLocked}
               setLocked={setDoughLocked}
               handleInput={handleInput}
            />
            <IngredientInput
               ingredientName={IngredType.nadzienie}
               displayValue={fillingValue}
               isLocked={fillingLocked}
               setLocked={setFillingLocked}
               handleInput={handleInput}
            />
            <IngredientInput
               ingredientName={IngredType.skladniki}
               displayValue={ingredsValue}
               isLocked={ingredsLocked}
               setLocked={setIngredsLocked}
               handleInput={handleInput}
            />
         </section>
      </>
   );
};

export default Ingredients;
