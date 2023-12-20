import { ButtonType, PierogObject } from '../../enums/enums';
import Button from '../UI/Button';
import DumplingIcon from '../icons/DumplingIcon';
import PierogThumbnail from './PierogThumbnail';
import styles from './Pierogarania.module.css';
import { PierogData } from '../../interfaces';
import { Link } from 'react-router-dom';

interface UserPierogiProps {
   pierogiDatabase: {
      myPierogiDatabase: PierogObject[];
      setMyPierogiDatabase: React.Dispatch<React.SetStateAction<PierogObject[]>>;
   };
   displayedPierogiSettings: {
      displayedPierog: PierogData;
      setDisplayedPierog: React.Dispatch<React.SetStateAction<PierogData>>;
      setIsDisplayingPierog: React.Dispatch<React.SetStateAction<boolean>>;
   };
   allDatabaseSetter: React.Dispatch<React.SetStateAction<PierogObject[]>>;
}

const UserPierogi = (props: UserPierogiProps) => {
   const pierogiDatabase = props.pierogiDatabase.myPierogiDatabase;
   const pierogiDatabaseSetter = props.pierogiDatabase.setMyPierogiDatabase;

   return (
      <>
         <div className={styles.formHeader}>
            <h2>
               <DumplingIcon /> Moje pierogi
            </h2>
            <Link to="/create-pierog">
               <Button type={ButtonType.Secondary}>Nowy pieróg</Button>
            </Link>
         </div>
         <div className={styles.thumbnailWrapper}>
            {pierogiDatabase &&
               pierogiDatabase.map((pierog, i) => {
                  return (
                     <PierogThumbnail
                        pierog={pierog}
                        editable={true}
                        key={i}
                        databaseSetter={pierogiDatabaseSetter}
                        displayedPierogiSettings={props.displayedPierogiSettings}
                        allDatabaseSetter={props.allDatabaseSetter}
                     />
                  );
               })}
         </div>
      </>
   );
};

export default UserPierogi;
