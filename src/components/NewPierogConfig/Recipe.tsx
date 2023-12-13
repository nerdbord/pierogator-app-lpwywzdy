import { useLayoutEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import styles from './NewPierog.module.css';
import inputStyles from './../UI/Input.module.css';
import accordionStyles from './../UI/Accordion.module.css';

import { ButtonType, IngredType } from '../../enums/enums';
import {
   generateAIRecipeIngredients,
   generateAIRecipePreparation,
   generateAIRecipeServing,
   postMyPierog,
} from '../../api/client';

import Loader from '../UI/Loader';
import Button from '../UI/Button';
import DumplingIcon from '../icons/DumplingIcon';
import Accordion from '../UI/Accordion';
import { PierogData } from '../../interfaces';

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
   newPierogSettings: PierogData;
   newPierogSetter: React.Dispatch<React.SetStateAction<PierogData>>;
   isGeneratingRecipe: boolean;
   setIsGeneratingRecipe: React.Dispatch<React.SetStateAction<boolean>>;
}

const Recipe = (props: RecipeProps) => {
   const [hasMounted, setHasMounted] = useState(false);

   const [recipeIngredDough, setRecipeIngredDough] = useState([]);
   const [recipeIngredFilling, setRecipeIngredFilling] = useState([]);
   const [recipePrepDough, setRecipePrepDough] = useState([]);
   const [recipePrepFilling, setRecipePrepFilling] = useState([]);
   const [recipePrepForming, setRecipePrepForming] = useState<string[]>([]);
   const [recipeServing, setRecipeServing] = useState('');
   // const [isGenerating, setIsGenerating] = useState(false);
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
      const doughIngredientsResponse = await generateAIRecipeIngredients(
         props.inputValues.values.dough,
         IngredType.ciasto,
         props.inputValues.values.additonalInfo,
      );
      const fillingIngredientsResponse = await generateAIRecipeIngredients(
         props.inputValues.values.filling,
         IngredType.nadzienie,
         props.inputValues.values.additonalInfo,
      );

      const parsedDoughIngreds = JSON.parse(doughIngredientsResponse.choices[0].message.content);
      const parsedFillingIngreds = JSON.parse(
         fillingIngredientsResponse.choices[0].message.content,
      );

      props.newPierogSetter((prevValue) => {
         return {
            ...prevValue,
            ingredients: {
               dough: parsedDoughIngreds,
               filling: parsedFillingIngreds,
            },
         };
      });
      setRecipeIngredDough(parsedDoughIngreds);
      setRecipeIngredFilling(parsedFillingIngreds);

      const doughPrepResponse = await generateAIRecipePreparation(
         props.inputValues.values.dough,
         IngredType.ciasto,
         props.inputValues.values.additonalInfo,
      );

      const parsedDoughPrep = doughPrepResponse.choices[0].message.content.split(/\n/);
      setRecipePrepDough(parsedDoughPrep);

      const fillingPrepResponse = await generateAIRecipePreparation(
         props.inputValues.values.filling,
         IngredType.nadzienie,
         props.inputValues.values.additonalInfo,
      );

      const parsedFillingPrep = fillingPrepResponse.choices[0].message.content.split(/\n/);
      setRecipePrepFilling(parsedFillingPrep);

      const formingPrepResponse = await generateAIRecipePreparation(
         recipePrepDough + ' ' + recipePrepFilling,
         IngredType.skladniki,
         props.inputValues.values.additonalInfo,
      );

      const parsedFormingPrep = formingPrepResponse.choices[0].message.content.split(/\n/);
      setRecipePrepForming(parsedFormingPrep);

      const servingResponse = await generateAIRecipeServing(
         recipePrepDough + ' ' + recipePrepFilling,
         props.inputValues.values.additonalInfo,
      );

      const parsedServingResponse = servingResponse.choices[0].message.content;
      setRecipeServing(parsedServingResponse);

      props.newPierogSetter((prevValue) => {
         return {
            ...prevValue,
            instructions: {
               dough_preparation: parsedDoughPrep,
               filling_preparation: parsedFillingPrep,
               forming_and_cooking_dumplings: parsedFormingPrep,
               serving: parsedServingResponse,
            },
         };
      });
   };

   const handleGenerate = async () => {
      props.setIsGeneratingRecipe(true);
      try {
         await generateRecipeIngredients();
         setGenerationState('success');
      } catch (error) {
         console.error('Error generating recipe:', error);
         setGenerationState('error');
      } finally {
         props.setIsGeneratingRecipe(false);
      }
   };

   const renderIngredientList = (ingredients: any[]) => {
      return ingredients.map((ingred: { name: string; quantity: string }, index) => (
         <li className={accordionStyles.listItem} key={ingred.name}>{`${index + 1}. ${
            ingred.name
         },  ${ingred.quantity}`}</li>
      ));
   };

   const renderPreparationList = (instructions: string[]) => {
      return instructions.map((instruction: string) => (
         <li className={accordionStyles.listItem} key={instruction}>
            {instruction}
         </li>
      ));
   };

   const localHandleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      props.inputValues.setters.additonalInfo(event.target.value);
   };

   const handleSavePierog = () => {
      postMyPierog(props.newPierogSettings);
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
               {props.isGeneratingRecipe && <Loader />}
               <Button
                  isDisabled={props.isGeneratingRecipe}
                  type={ButtonType.Secondary}
                  onClick={handleGenerate}
               >
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
                        {renderPreparationList(recipePrepDough)}
                     </ol>
                     <ol>
                        <p className={accordionStyles.subTitle}>Farsz</p>
                        {renderPreparationList(recipePrepFilling)}
                     </ol>
                     <ol>
                        <p className={accordionStyles.subTitle}>Formowanie i gotowanie pierogów:</p>
                        {renderPreparationList(recipePrepForming)}
                     </ol>
                  </Accordion>

                  {/* serving */}
                  <Accordion title="Podawanie">
                     <ol>{renderPreparationList([recipeServing])}</ol>
                  </Accordion>
               </>
            )}
            {generationState === 'error' && (
               <p>Oops, try again! (AI did not generate proper object - FIX THIS)</p>
            )}
         </section>
         {generationState === 'success' && (
            <Button type={ButtonType.Primary} onClick={handleSavePierog}>
               Udostępnij pieroga
            </Button>
         )}
      </div>
   );
};

export default Recipe;
