import styles from './App.module.css';

// components

import NewPierog from './components/NewPierogConfig/NewPierog';

const App = () => {
   return (
      <div className={styles.mainWrapper}>
         <h1>Pierogator świąteczny</h1>
         <NewPierog />
      </div>
   );
};

export default App;
