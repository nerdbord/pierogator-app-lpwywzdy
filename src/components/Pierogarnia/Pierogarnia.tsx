import { PierogObject } from '../../enums/enums';
import { PierogData } from '../../interfaces';
import DumplingIcon from '../icons/DumplingIcon';
import PierogThumbnail from './PierogThumbnail';
import styles from './Pierogarania.module.css';

interface PierogarniaProps {
   pierogiDatabase: PierogObject[];
   newPierogToggleSet: React.Dispatch<React.SetStateAction<boolean>>;
   displayedPierogiSettings: {
      displayedPierog: PierogData;
      setDisplayedPierog: React.Dispatch<React.SetStateAction<PierogData>>;
      setIsDisplayingPierog: React.Dispatch<React.SetStateAction<boolean>>;
   };
   allDatabaseSetter: React.Dispatch<React.SetStateAction<PierogObject[]>>;
}

const Pierogarnia = (props: PierogarniaProps) => {
   return (
      <>
         <div className={styles.formHeader}>
            <h2>
               <DumplingIcon /> Pierogarnia {}
            </h2>
         </div>
         <div className={styles.thumbnailWrapper}>
            {props.pierogiDatabase &&
               props.pierogiDatabase.map((pierog, i) => {
                  return (
                     <PierogThumbnail
                        pierog={pierog}
                        editable={false}
                        key={i}
                        displayedPierogiSettings={props.displayedPierogiSettings}
                        allDatabaseSetter={props.allDatabaseSetter}
                     />
                  );
               })}
         </div>
      </>
   );
};

export default Pierogarnia;
