import Pierogarnia from './Pierogarnia';
import styles from './Pierogarania.module.css';
import { useEffect, useState } from 'react';
import { getAllPierogi, getMyPierogi } from '../../api/client';
import UserPierogi from './UserPierogi';
import { PierogObject } from '../../enums/enums';

interface PierogarniaContainerProps {}

const PierogarniaContainer = (props: PierogarniaContainerProps) => {
   const [allPierogiDatabase, setAllPierogiDatabase] = useState<PierogObject[]>([]);
   const [myPierogiDatabase, setMyPierogiDatabase] = useState<PierogObject[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const allData = await getAllPierogi();
            setAllPierogiDatabase(allData.recipes);

            const myData = await getMyPierogi();
            setMyPierogiDatabase(myData.recipes);
            console.log(myData);

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
         <UserPierogi pierogiDatabase={myPierogiDatabase} />
         <Pierogarnia pierogiDatabase={allPierogiDatabase} />
      </>
   );
};

export default PierogarniaContainer;
