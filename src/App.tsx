import { useState } from 'react';
import styles from './App.module.css';
import { ButtonType, IngredType } from './enums/enums';
import { generateAIText } from './api/client';

// components
import Button from './components/UI/Button';
import Input from './components/UI/Input';
import DumplingIcon from './components/icons/DumplingIcon';
import Loader from './components/UI/Loader';

const App = () => {
   const [doughValue, setDoughValue] = useState('');
   const [doughLocked, setDoughLocked] = useState(false);
   const [fillingValue, setFillingValue] = useState('');
   const [fillingLocked, setFillingLocked] = useState(false);
   const [ingredsValue, setIngredsValue] = useState('');
   const [ingredsLocked, setIngredsLocked] = useState(false);

   // loader states
   const [isGenerating, setIsGenerating] = useState('');

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
      setIsGenerating('ingredients');

      ingredTypes.forEach(async (ingredient) => {
         if (getBooleanHelper(ingredient)) return;
         const apiResponse = await generateAIText(ingredient);
         const newValue = apiResponse.choices[0].message.content;
         setValueHelper(ingredient, newValue);
         setIsGenerating('');
      });
   };

   const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>, ingredient: IngredType) => {
      const newValue = event.target.value;
      setValueHelper(ingredient, newValue);
   };

   return (
      <div className={styles.mainWrapper}>
         <h1>Pierogator świąteczny</h1>
         <div className={styles.form}>
            <div className={styles.formHeader}>
               <h2>
                  <DumplingIcon /> Składniki
               </h2>
               <div className={styles.formHeaderButtonSection}>
                  {isGenerating === 'ingredients' ? <Loader /> : ''}
                  <Button type={ButtonType.Secondary} onClick={handleGenerate}>
                     Generuj
                  </Button>
               </div>
            </div>
            <section>
               <Input
                  ingredientName={IngredType.ciasto}
                  displayValue={doughValue}
                  isLocked={doughLocked}
                  setLocked={setDoughLocked}
                  handleInput={handleInput}
               />
               <Input
                  ingredientName={IngredType.nadzienie}
                  displayValue={fillingValue}
                  isLocked={fillingLocked}
                  setLocked={setFillingLocked}
                  handleInput={handleInput}
               />
               <Input
                  ingredientName={IngredType.skladniki}
                  displayValue={ingredsValue}
                  isLocked={ingredsLocked}
                  setLocked={setIngredsLocked}
                  handleInput={handleInput}
               />
            </section>
         </div>
      </div>
   );
};

export default App;
