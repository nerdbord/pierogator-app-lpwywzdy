import { ButtonType } from '../../enums/enums';
import { PierogData } from '../../interfaces';
import Button from '../UI/Button';
import SimpleInput from '../UI/SimpleInput';
import DumplingIcon from '../icons/DumplingIcon';
import styles from './Pierogarania.module.css';

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
        props.displayedPierogiSettings.setIsDisplayingPierog(false)
    }
   return (
      <>
         <div className={styles.formHeaderDisplay}>
            <h2>
               <DumplingIcon /> Pieróg
            </h2>
            <div className={styles.formHeaderButtonSection}>
               {<Button onClick={handleBackClick} type={ButtonType.Secondary}>Wróć</Button>}
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
      </>
   );
};

export default PierogDetails;
