import styles from './App.module.css';
import HeaderBackground from './components/Header/HeaderBackground/HeaderBackground';
// components

import NewPierog from './components/NewPierogConfig/NewPierog';

const App = () => {
   return (
      <div className={styles.mainWrapper}>
         <HeaderBackground background={'dumplingMachine'}></HeaderBackground>
         {/* <HeaderBackground background={'dumplingStore'}></HeaderBackground> */}
         {/* <h1>Pierogator świąteczny</h1> */}
         <NewPierog />
      </div>
   );
};

export default App;
