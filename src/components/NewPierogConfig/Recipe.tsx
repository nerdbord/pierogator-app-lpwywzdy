import { useLayoutEffect, useRef, useState } from 'react';
import styles from './NewPierog.module.css';
import inputStyles from './../UI/Input.module.css';
import { ButtonType, IngredType } from '../../enums/enums';
import Loader from '../UI/Loader';
import Button from '../UI/Button';
import DumplingIcon from '../icons/DumplingIcon';
import classNames from 'classnames';
import { generateAIRecipeIngredients } from '../../api/client';

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
   const [isGenerating, setIsGenerating] = useState(false);

   const [hasMounted, setHasMounted] = useState(false);
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

   const handleGenerate = async () => {
      console.log(props.inputValues.values);

      setIsGenerating(true);
      try {
         const doughResponse = await generateAIRecipeIngredients(
            props.inputValues.values.dough,
            IngredType.ciasto,
         );
         const fillingRespone = await generateAIRecipeIngredients(
            props.inputValues.values.filling,
            IngredType.nadzienie,
         );
         console.log(doughResponse.choices[0].message.content);
         console.log(fillingRespone.choices[0].message.content);
      } catch (error) {
         console.error('Error generating recipe:', error);
      } finally {
         setIsGenerating(false);
      }
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
      </div>
   );
};

export default Recipe;
