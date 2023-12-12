import { useLayoutEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import styles from './NewPierog.module.css';
import inputStyles from './../UI/Input.module.css';
import accordionStyles from './../UI/Accordion.module.css';

import { ButtonType, IngredType } from '../../enums/enums';
import { generateAIRecipeIngredients } from '../../api/client';

import Loader from '../UI/Loader';
import Button from '../UI/Button';
import DumplingIcon from '../icons/DumplingIcon';
import Accordion from '../UI/Accordion';

interface RecipeProps {
   inputValues: {
      values: {
         dough: string;
         filling: string;
         ingreds: string;
         additonalInfo: string;
      };
      setters: {
         dough: React.Dispatch<React.SetStateAction<string>>;
         filling: React.Dispatch<React.SetStateAction<string>>;
         ingreds: React.Dispatch<React.SetStateAction<string>>;
         additonalInfo: React.Dispatch<React.SetStateAction<string>>;
      };
   };
   nameSettings: {
      value: string;
      setter: React.Dispatch<React.SetStateAction<string>>;
   };
}

const Recipe = (props: RecipeProps) => {
   const [hasMounted, setHasMounted] = useState(false);

   const [recipeIngredDough, setRecipeIngredDough] = useState([]);
   const [recipeIngredFilling, setRecipeIngredFilling] = useState([]);
   const [isGenerating, setIsGenerating] = useState(false);
   const [generationState, setGenerationState] = useState('');

   const inputRef = useRef<HTMLTextAreaElement>(null);

   useLayoutEffect(() => {
      if (hasMounted && inputRef.current) {
         inputRef.current.style.height = 'auto'; // Reset the height to auto
         inputRef.current.style.height = inputRef.current.scrollHeight + 'px'; // Set the height based on the content
      } else {
         // Mark the component as mounted after the first render
         setHasMounted(true);
      }
   }, [props.inputValues.values.additonalInfo, hasMounted]);

   const generateRecipeIngredients = async () => {
      const doughResponse = await generateAIRecipeIngredients(
         props.inputValues.values.dough,
         IngredType.ciasto,
      );
      const fillingResponse = await generateAIRecipeIngredients(
         props.inputValues.values.filling,
         IngredType.nadzienie,
      );

      console.log(doughResponse.choices[0].message.content);
      console.log(fillingResponse.choices[0].message.content);

      setRecipeIngredDough(JSON.parse(doughResponse.choices[0].message.content));
      setRecipeIngredFilling(JSON.parse(fillingResponse.choices[0].message.content));
   };

   const handleGenerate = async () => {
      setIsGenerating(true);
      try {
         await generateRecipeIngredients();
         setGenerationState('success');
      } catch (error) {
         console.error('Error generating recipe:', error);
         setGenerationState('error');
      } finally {
         setIsGenerating(false);
      }
   };

   const renderIngredientList = (ingredients: any[]) => {
      return ingredients.map((ingred: { name: string; quantity: string }, index) => (
         <li className={accordionStyles.listItem} key={ingred.name}>{`${index + 1}. ${
            ingred.quantity
         },  ${ingred.name}`}</li>
      ));
   };

   const renderPreparationList = (instructions: string[]) => {
      return instructions.map((instruction: string, index) => (
         <li className={accordionStyles.listItem} key={instruction}>{`${
            index + 1
         }. ${instruction}`}</li>
      ));
   };

   const localHandleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      props.inputValues.setters.additonalInfo(event.target.value);
   };

   const simpleInputStyles = classNames(inputStyles.inputStyle, inputStyles.simpleInputStyle);

   const simpleWrapperStyles = classNames(inputStyles.inputWrapper, inputStyles.simpleWrapper);

   return (
      <div className={styles.form}>
         <div className={styles.formHeader}>
            <h2>
               <DumplingIcon /> Przepis
            </h2>
            <div className={styles.formHeaderButtonSection}>
               {isGenerating && <Loader />}
               <Button type={ButtonType.Secondary} onClick={handleGenerate}>
                  Generuj
               </Button>
            </div>
         </div>
         <section>
            <div className={inputStyles.inputTopWrapper}>
               <h3 className={inputStyles.titleStyle}>Uwagi do przepisu</h3>
               <div className={simpleWrapperStyles}>
                  <textarea
                     ref={inputRef}
                     onChange={localHandleInput}
                     className={simpleInputStyles}
                     value={props.inputValues.values.additonalInfo}
                     placeholder={'chrupiące pierogi bez pieczenia, bez użycia miksera'}
                  />
               </div>
            </div>
         </section>

         <section style={{ marginTop: '24px', marginBottom: '32px' }}>
            {/* accordion */}
            {generationState === 'success' && (
               <>
                  {/* ingredients */}
                  <Accordion title="Składniki">
                     <ol>
                        <p className={accordionStyles.subTitle}>Ciasto</p>
                        {renderIngredientList(recipeIngredDough)}
                     </ol>
                     <ol>
                        <p className={accordionStyles.subTitle}>Farsz</p>
                        {renderIngredientList(recipeIngredFilling)}
                     </ol>
                  </Accordion>

                  {/* preparation */}
                  <Accordion title="Przygotowanie">
                     <ol>
                        <p className={accordionStyles.subTitle}>Ciasto</p>
                        {renderPreparationList(['Mix flour and water', 'Knead the dough'])}
                     </ol>
                     <ol>
                        <p className={accordionStyles.subTitle}>Farsz</p>
                        {renderPreparationList(['Cook potatoes', 'Chop onions'])}
                     </ol>
                     <ol>
                        <p className={accordionStyles.subTitle}>Formowanie i gotowanie pierogów:</p>
                        {renderPreparationList([
                           'Roll the dough',
                           'Add filling and shape dumplings',
                        ])}
                     </ol>
                     <ol>
                        <p className={accordionStyles.subTitle}>Formowanie i gotowanie pierogów:</p>
                        {renderPreparationList([
                           'Roll the dough',
                           'Add filling and shape dumplings',
                        ])}
                     </ol>
                  </Accordion>

                  {/* serving */}
                  <Accordion title="Podawanie">
                     <ol>{renderPreparationList(['Boil dumplings', 'Serve hot'])}</ol>
                  </Accordion>
               </>
            )}
            {generationState === 'error' && (
               <p>Oops, try again! (AI did not generate proper object - FIX THIS)</p>
            )}
         </section>
         {generationState === 'success' && (
            <Button type={ButtonType.Primary}>Udostępnij pieroga</Button>
         )}
      </div>
   );
};

export default Recipe;
