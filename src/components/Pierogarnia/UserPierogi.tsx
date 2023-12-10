import { useState } from 'react';
import { ButtonType, PierogObject } from '../../enums/enums';
import Button from '../UI/Button';
import DumplingIcon from '../icons/DumplingIcon';
import PierogThumbnail from './PierogThumbnail';
import styles from './Pierogarania.module.css';

interface UserPierogiProps {
   pierogiDatabase: {
      myPierogiDatabase: PierogObject[];
      setMyPierogiDatabase: React.Dispatch<React.SetStateAction<PierogObject[]>>;
   };
   newPierogToggleSet: React.Dispatch<React.SetStateAction<boolean>>;
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
            <Button
               type={ButtonType.Secondary}
               onClick={() => {
                  props.newPierogToggleSet(true);
               }}
            >
               Nowy pieróg
            </Button>
         </div>
         <div className={styles.thumbnailWrapper}>
            {pierogiDatabase &&
               pierogiDatabase.map((pierog, i) => {
                  return <PierogThumbnail pierog={pierog} editable={true} key={i} databaseSetter={pierogiDatabaseSetter} />;
               })}
         </div>
      </>
   );
};

export default UserPierogi;
