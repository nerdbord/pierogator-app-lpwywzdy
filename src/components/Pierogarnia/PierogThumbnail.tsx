import classNames from 'classnames';
import { deleteMyPierog } from '../../api/client';
import { ButtonType, PierogObject } from '../../enums/enums';
import { PierogData } from '../../interfaces';
import Button from '../UI/Button';
import styles from './Pierogarania.module.css';

interface PierogThumbnailProps {
   pierog: PierogObject;
   databaseSetter?: React.Dispatch<React.SetStateAction<PierogObject[]>>;
   allDatabaseSetter: React.Dispatch<React.SetStateAction<PierogObject[]>>;
   editable: boolean;
   displayedPierogiSettings: {
      displayedPierog: PierogData;
      setDisplayedPierog: React.Dispatch<React.SetStateAction<PierogData>>;
      setIsDisplayingPierog: React.Dispatch<React.SetStateAction<boolean>>;
   };
}

const PierogThumbnail = (props: PierogThumbnailProps) => {
   const setMyPierogiDatabase = props.databaseSetter;

   const onOpenPierog = () => {
      props.displayedPierogiSettings.setDisplayedPierog(props.pierog);
      props.displayedPierogiSettings.setIsDisplayingPierog(true);
   };

   const onDeletePierog = async () => {
      await deleteMyPierog(props.pierog._id);
      setMyPierogiDatabase &&
         setMyPierogiDatabase((prevDatabase) =>
            prevDatabase.filter((pierog) => pierog._id !== props.pierog._id),
         );

      props.allDatabaseSetter &&
         props.allDatabaseSetter((prevDatabase) =>
            prevDatabase.filter((pierog) => pierog._id !== props.pierog._id),
         );
   };

   return (
      <div
         className={classNames(
            styles.singleThumbWrapper,
            !props.editable ? styles.cursorPointer : '',
         )}
         onClick={!props.editable ? onOpenPierog : () => {}}
      >
         <img
            src={props.pierog.imageSrc}
            alt={'Wygenerowany obrazk pierogów.'}
            className={styles.imageStyle}
         />
         <h3 className={styles.thumbnailName}>{props.pierog.name}</h3>
         {props.editable && (
            <div className={styles.thumbnailButtonWrapper}>
               <Button type={ButtonType.Secondary} onClick={onOpenPierog}>
                  Otwórz
               </Button>
               <Button type={ButtonType.Secondary} onClick={onDeletePierog}>
                  Usuń
               </Button>
            </div>
         )}
      </div>
   );
};

export default PierogThumbnail;
