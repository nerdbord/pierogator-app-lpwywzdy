import { useEffect, useState } from 'react';
import { ButtonType } from '../../enums/enums';
import Button from '../UI/Button';
import Loader from '../UI/Loader';
import DumplingIcon from '../icons/DumplingIcon';
import styles from './NewPierog.module.css';
import { generateAIImage } from '../../api/client';
import SimpleInput from '../UI/SimpleInput';
import { PierogData } from '../../interfaces';

interface PierogImageProps {
   inputValues: {
      dough: string;
      filling: string;
      ingreds: string;
   };
   newPierogData: PierogData;
   setNewPierogData: React.Dispatch<React.SetStateAction<PierogData>>;
   pierogSettings: {
      nameSettings: {
         value: string;
         setter: React.Dispatch<React.SetStateAction<string>>;
      };
      imageSettings: {
         value: string;
         setter: React.Dispatch<React.SetStateAction<string>>;
      };
   };
   editable: boolean;
   setEdit?: React.Dispatch<React.SetStateAction<boolean>>;
}

const PierogImage = (props: PierogImageProps) => {
   const [isGenerating, setIsGenerating] = useState(false);
   const generatedImage = props.pierogSettings.imageSettings.value;
   const setGeneratedImage = props.pierogSettings.imageSettings.setter;
   const [generatedDescription, setGeneratedDescription] = useState<string | null>(null);

   useEffect(() => {
      console.log(props.newPierogData);
   }, [props.newPierogData]);

   const handleGenerate = async () => {
      setIsGenerating(true);
      try {
         const response = await generateAIImage(props.inputValues);
         setGeneratedImage(response.data[0].url);
         setGeneratedDescription(response.data[0].revised_prompt);
         props.setNewPierogData((prevState) => {
            return { ...prevState, imageSrc: response.data[0].url };
         });
      } catch (error) {
         console.error('Error generating image:', error);
      } finally {
         setIsGenerating(false);
      }
   };

   const handleButtonClick = () => {
      if (props.editable) {
         handleGenerate();
      } else {
         props.setEdit && props.setEdit(true);
      }
   };

   return (
      <>
         <div className={styles.formHeader}>
            <h2>
               <DumplingIcon /> Pieróg
            </h2>
            <div className={styles.formHeaderButtonSection}>
               {isGenerating && <Loader />}
               {
                  <Button
                     type={ButtonType.Secondary}
                     onClick={handleButtonClick}
                     isDisabled={isGenerating}
                  >
                     {props.editable ? 'Generuj' : 'Zmień'}
                  </Button>
               }
            </div>
         </div>
         <section className={styles.imageSection}>
            {generatedImage && (
               <img
                  src={generatedImage}
                  alt={generatedDescription || 'Wygenerowany obrazk pierogów.'}
                  className={styles.imageStyle}
               />
            )}
         </section>
         <section className={styles.nameStyle}>
            {generatedImage && (
               <SimpleInput
                  valueSettings={props.pierogSettings.nameSettings}
                  placeholder="wpisz nazwę pieroga"
                  disabled={!props.editable}
               />
            )}
         </section>
      </>
   );
};

export default PierogImage;
