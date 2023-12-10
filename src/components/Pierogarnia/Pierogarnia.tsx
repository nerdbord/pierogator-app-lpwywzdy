
import { PierogObject } from '../../enums/enums';
import DumplingIcon from '../icons/DumplingIcon';
import PierogThumbnail from './PierogThumbnail';
import styles from './Pierogarania.module.css';

interface PierogarniaProps {
    pierogiDatabase: PierogObject[];
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
            {props.pierogiDatabase && props.pierogiDatabase.map((pierog, i) => {
                return (<PierogThumbnail pierog={pierog} editable={false} key={i}/>)
            })}
        </div>
      </>
   );
};

export default Pierogarnia;
