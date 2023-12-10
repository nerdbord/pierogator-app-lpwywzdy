import { ButtonType, PierogObject } from '../../enums/enums';
import Button from '../UI/Button';
import styles from './Pierogarania.module.css';

interface PierogThumbnailProps {
   pierog: PierogObject;
   editable: boolean;
}

const PierogThumbnail = (props: PierogThumbnailProps) => {    
   return (
      <div className={styles.singleThumbWrapper}>
          <img
             src={props.pierog.imageSrc}
             alt={ 'Wygenerowany obrazk pierogów.'}
             className={styles.imageStyle}
          />
          <h3 className={styles.thumbnailName}>{props.pierog.name}</h3>
          {props.editable && (
            <div className={styles.thumbnailButtonWrapper}>
                <Button type={ButtonType.Secondary}>Otwórz</Button>
                <Button type={ButtonType.Secondary}>Usuń</Button>
            </div>
          )}
      </div>
   );
};

export default PierogThumbnail;
