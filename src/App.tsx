import styles from './App.module.css';

// components
import HeaderBackground from './components/UI/Header/HeaderBackground/HeaderBackground';
import NewPierog from './components/NewPierogConfig/NewPierog';
import { HeaderType } from './enums/enums';

   const App = () => {

      return (
         <div className={styles.mainWrapper}>
            <HeaderBackground type={HeaderType.machine}></HeaderBackground>
            <NewPierog />
         </div>
      );
   };

   export default App;
