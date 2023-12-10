import styles from './App.module.css';
import HeaderBackground from './components/UI/Header/HeaderBackground/HeaderBackground';
import Button from './components/UI/Button';
import Input from './UI/Input';
import { ButtonType } from './enums/enums';

const App = () => {
   return (
      <>
         <HeaderBackground background={'dumplingMachine'}></HeaderBackground>
         <HeaderBackground background={'dumplingStore'}></HeaderBackground>
         <h1>Pierogator świąteczny</h1>
         <Button type={ButtonType.Primary}>Zapisz i przejdź do tworzenia przepisu</Button>
         <Button type={ButtonType.Secondary}>Generuj</Button>
         <Input ingredientName="Ciasto" placeholder="test" />
      </>
   );
};

export default App;
