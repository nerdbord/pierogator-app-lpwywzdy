import styles from './App.module.css';

// components
import HeaderBackground from './components/UI/Header/HeaderBackground/HeaderBackground';
import NewPierog from './components/NewPierogConfig/NewPierog';
import { HeaderType } from './enums/enums';
import { useState } from 'react';

const App = () => {
   const [newPierogStep, setNewPierogStep] = useState(true);

   return (
      <div className={styles.mainWrapper}>
         <HeaderBackground
            type={newPierogStep ? HeaderType.machine : HeaderType.store}
         ></HeaderBackground>
         <div className={styles.appWrapper}>
            <NewPierog />
         </div>
      </div>
   );
};

export default App;
