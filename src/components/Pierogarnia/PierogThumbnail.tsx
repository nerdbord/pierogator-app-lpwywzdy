import styles from './Pierogarania.module.css';

interface PierogThumbnailProps {
   imgURL: string;
   pierogName: string;
}

const PierogThumbnail = (props: PierogThumbnailProps) => {
    console.log(props.imgURL);
    
   return (
      <div className={styles.singleThumbWrapper}>
          <img
             src={props.imgURL}
             alt={ 'Wygenerowany obrazk pierogów.'}
             className={styles.imageStyle}
          />
          <h3 className={styles.thumbnailName}>{props.pierogName}</h3>
      </div>
   );
};

export default PierogThumbnail;
