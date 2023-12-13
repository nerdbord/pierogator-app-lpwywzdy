import { ButtonType } from '../../enums/enums';
import { PierogData } from '../../interfaces';
import Accordion from '../UI/Accordion';
import Button from '../UI/Button';
import SimpleInput from '../UI/SimpleInput';
import DumplingIcon from '../icons/DumplingIcon';
import styles from './Pierogarania.module.css';
import accordionStyles from './../UI/Accordion.module.css';

interface PierogDetailsProps {
   displayedPierogiSettings: {
      displayedPierog: PierogData;
      setDisplayedPierog: React.Dispatch<React.SetStateAction<PierogData>>;
      setIsDisplayingPierog: React.Dispatch<React.SetStateAction<boolean>>;
   };
}

const PierogDetails = (props: PierogDetailsProps) => {
   const pierog = props.displayedPierogiSettings.displayedPierog;
   const handleBackClick = () => {
      props.displayedPierogiSettings.setIsDisplayingPierog(false);
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
   return (
      <>
         <div className={styles.formHeaderDisplay}>
            <h2>
               <DumplingIcon /> Pieróg
            </h2>
            <div className={styles.formHeaderButtonSection}>
               {
                  <Button onClick={handleBackClick} type={ButtonType.Secondary}>
                     Wróć
                  </Button>
               }
            </div>
         </div>
         <section className={styles.imageSection}>
            <img
               src={pierog.imageSrc}
               alt={'Wygenerowany obrazk pierogów.'}
               className={styles.imageStyleDisplay}
            />
         </section>
         <section className={styles.nameStyle}>
            <SimpleInput
               pierogSettings={pierog}
               pierogSetters={props.displayedPierogiSettings.setDisplayedPierog}
               placeholder="wpisz nazwę pieroga"
               disabled={true}
            />
         </section>
         <section style={{ marginTop: '24px', marginBottom: '32px' }}>
            <>
               <div className={styles.formHeaderDisplay}>
                  <h2>
                     <DumplingIcon /> Przepis
                  </h2>
               </div>
               {/* ingredients */}
               <Accordion title="Składniki">
                  <ol>
                     <p className={accordionStyles.subTitle}>Ciasto</p>
                     {renderIngredientList(pierog.ingredients.dough)}
                  </ol>
                  <ol>
                     <p className={accordionStyles.subTitle}>Farsz</p>
                     {renderIngredientList(pierog.ingredients.filling)}
                  </ol>
               </Accordion>

               {/* preparation */}
               <Accordion title="Przygotowanie">
                  <ol>
                     <p className={accordionStyles.subTitle}>Ciasto</p>
                     {renderPreparationList(pierog.instructions.dough_preparation)}
                  </ol>
                  <ol>
                     <p className={accordionStyles.subTitle}>Farsz</p>
                     {renderPreparationList(pierog.instructions.filling_preparation)}
                  </ol>
                  <ol>
                     <p className={accordionStyles.subTitle}>Formowanie i gotowanie pierogów:</p>
                     {renderPreparationList(pierog.instructions.forming_and_cooking_dumplings)}
                  </ol>
               </Accordion>

               {/* serving */}
               <Accordion title="Podawanie">
                  <ol>{renderPreparationList(pierog.instructions.serving)}</ol>
               </Accordion>
            </>
         </section>
      </>
   );
};

export default PierogDetails;
