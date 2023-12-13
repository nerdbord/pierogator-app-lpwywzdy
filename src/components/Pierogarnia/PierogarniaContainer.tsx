import Pierogarnia from './Pierogarnia';
import styles from './Pierogarania.module.css';
import { useEffect, useState } from 'react';
import { getAllPierogi, getMyPierogi } from '../../api/client';
import UserPierogi from './UserPierogi';
import { PierogObject } from '../../enums/enums';

interface PierogarniaContainerProps {
   newPierogToggleSet: React.Dispatch<React.SetStateAction<boolean>>;
}

const PierogarniaContainer = (props: PierogarniaContainerProps) => {
   const [allPierogiDatabase, setAllPierogiDatabase] = useState<PierogObject[]>([]);
   const [myPierogiDatabase, setMyPierogiDatabase] = useState<PierogObject[]>([]);
   const [pierogarniaRefresher, refreshPierogarnia] = useState(false);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   const myPierogiSettings = { myPierogiDatabase, setMyPierogiDatabase };
   useEffect(() => {
      const fetchData = async () => {
         try {
            const allData = await getAllPierogi();
            setAllPierogiDatabase(allData.recipes);
            console.log(allData.recipes[0]);

            const myData = await getMyPierogi();
            setMyPierogiDatabase(myData);

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
         <UserPierogi
            pierogiDatabase={myPierogiSettings}
            newPierogToggleSet={props.newPierogToggleSet}
         />
         <Pierogarnia
            pierogiDatabase={allPierogiDatabase}
            newPierogToggleSet={props.newPierogToggleSet}
         />
      </>
   );
};

export default PierogarniaContainer;

/**
 * {
    "ingredients": {
        "dough": [
            {
                "name": "Flour",
                "quantity": "2 cups"
            },
            {
                "name": "Water",
                "quantity": "1 cup"
            }
        ],
        "filling": [
            {
                "name": "Potatoes",
                "quantity": "3 cups"
            },
            {
                "name": "Onion",
                "quantity": "1 cup"
            }
        ]
    },
    "instructions": {
        "dough_preparation": [
            "Mix flour and water",
            "Knead the dough"
        ],
        "filling_preparation": [
            "Cook potatoes",
            "Chop onions"
        ],
        "forming_and_cooking_dumplings": [
            "Roll the dough",
            "Add filling and shape dumplings"
        ],
        "serving": [
            "Boil dumplings",
            "Serve hot"
        ]
    },
    "_id": "65726678a1beedef6f6b57b1",
    "name": "Pieróg Michał",
    "imageSrc": "https://xurxupibc5lblwyy.public.blob.vercel-storage.com/dumpling_Pier%C3%B3g%20Micha%C5%82_1701996150639-REIzLQzO2Fa55kl5jPh2IT3qVp9Yjr",
    "author": "65724e1b7971c4e049d849f6",
    "__v": 0
}
 */
