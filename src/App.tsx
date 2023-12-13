import { useState } from 'react';
import styles from './App.module.css';

// components
import HeaderBackground from './components/UI/Header/HeaderBackground/HeaderBackground';
import NewPierog from './components/NewPierogConfig/NewPierog';
import { HeaderType } from './enums/enums';
import PierogarniaContainer from './components/Pierogarnia/PierogarniaContainer';

const App = () => {
   const [isCreatingNewPierog, setCreatingNewPierog] = useState(true);

   return (
      <div className={styles.mainWrapper}>
         <HeaderBackground
            type={isCreatingNewPierog ? HeaderType.machine : HeaderType.store}
         ></HeaderBackground>
         <div className={styles.appWrapper}>
            {isCreatingNewPierog ? (
               <NewPierog newPierogToggleSet={setCreatingNewPierog} />
            ) : (
               <PierogarniaContainer newPierogToggleSet={setCreatingNewPierog} />
            )}
         </div>
      </div>
   );
};

export default App;
