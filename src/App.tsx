import { useState } from 'react';
import styles from './App.module.css';


import NewPierog from './components/NewPierogConfig/NewPierog';
import PierogarniaContainer from './components/Pierogarnia/PierogarniaContainer';

const App = () => {
   
   const [isCreatingNewPierog, setCreatingNewPierog] = useState(false);



   return (
      <div className={styles.mainWrapper}>
         <h1>Pierogator świąteczny</h1>
         {isCreatingNewPierog ? <NewPierog /> : <PierogarniaContainer newPierogToggleSet={setCreatingNewPierog} />}
      </div>
   );
};

export default App;
