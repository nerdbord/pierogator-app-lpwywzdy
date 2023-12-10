import { useEffect, useState } from 'react';
import { getAllPierogi } from '../../api/client';
import { PierogObject } from '../../enums/enums';
import DumplingIcon from '../icons/DumplingIcon';
import PierogThumbnail from './PierogThumbnail';
import styles from './Pierogarania.module.css';

interface PierogarniaProps {}

const Pierogarnia = (props: PierogarniaProps) => {
   const [pierogiDatabase, setPierogiDatabase] = useState<PierogObject[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const data = await getAllPierogi();
            console.log(data.recipes);
            setPierogiDatabase(data.recipes);
            setLoading(false);
         } catch (error) {
            setError('Error fetching data.');
            setLoading(false);
         }         
      };

      fetchData();
   }, []);
   return (
      <>
         <div className={styles.formHeader}>
            <h2>
               <DumplingIcon /> Pierogarnia {}
            </h2>
         </div>
        <div className={styles.thumbnailWrapper}>
            {pierogiDatabase.map((pierog) => {
                return (<PierogThumbnail imgURL={pierog.imageSrc} pierogName={pierog.name}/>)
            })}
        </div>
      </>
   );
};

export default Pierogarnia;
