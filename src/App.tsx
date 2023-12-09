import styles from'./App.module.css';
import Input from './UI/Input';

const App = () => {
   return (
      <div className={styles.mainWrapper}>
         <h1>Pierogator świąteczny</h1>
         <Input ingredientName="Ciasto" placeholder='test' />
      </div>
   );
};

export default App;
