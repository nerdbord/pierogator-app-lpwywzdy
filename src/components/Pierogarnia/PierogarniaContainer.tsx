import Pierogarnia from './Pierogarnia';
import { useEffect, useState } from 'react';
import { getAllPierogi, getMyPierogi } from '../../api/client';
import UserPierogi from './UserPierogi';
import { PierogObject } from '../../enums/enums';
import { PierogData } from '../../interfaces';
import PierogDetails from './PierogDetails';

const initialPierogData: PierogData = {
   name: '',
   imageSrc: '',
   ingredients: {
      dough: [],
      filling: [],
   },
   instructions: {
      dough_preparation: [],
      filling_preparation: [],
      forming_and_cooking_dumplings: [],
      serving: [],
   },
};

const PierogarniaContainer = () => {
   const [allPierogiDatabase, setAllPierogiDatabase] = useState<PierogObject[]>([]);
   const [myPierogiDatabase, setMyPierogiDatabase] = useState<PierogObject[]>([]);
   const [isDisplayingPierog, setIsDisplayingPierog] = useState(false);
   const [displayedPierog, setDisplayedPierog] = useState<PierogData>(initialPierogData);

   const myPierogiSettings = { myPierogiDatabase, setMyPierogiDatabase };
   const displayedPierogSettings = { displayedPierog, setDisplayedPierog, setIsDisplayingPierog };

   useEffect(() => {
      const fetchData = async () => {
         try {
            const allData = await getAllPierogi();
            setAllPierogiDatabase(allData.recipes);
            console.log(allData.recipes[0]);

            const myData = await getMyPierogi();
            setMyPierogiDatabase(myData);
         } catch (error) {
            console.error(error);
         }
      };

      fetchData();
   }, []);

   if (isDisplayingPierog) {
      return <PierogDetails displayedPierogiSettings={displayedPierogSettings} />;
   } else {
      return (
         <>
            <UserPierogi
               pierogiDatabase={myPierogiSettings}
               displayedPierogiSettings={displayedPierogSettings}
               allDatabaseSetter={setAllPierogiDatabase}
            />
            <Pierogarnia
               pierogiDatabase={allPierogiDatabase}
               displayedPierogiSettings={displayedPierogSettings}
               allDatabaseSetter={setAllPierogiDatabase}
            />
         </>
      );
   }
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
