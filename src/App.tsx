import styles from './App.module.css';
import HeaderBackground from './components/UI/Header/HeaderBackground/HeaderBackground';
import Button from './components/UI/Button';
import Input from './UI/Input';
import { ButtonType, HeaderType } from './enums/enums';

const App = () => {
   return (
      <>
         <HeaderBackground type={HeaderType.machine}></HeaderBackground>
         <h1>Pierogator świąteczny</h1>
         <Button type={ButtonType.Primary}>Zapisz i przejdź do tworzenia przepisu</Button>
         <Button type={ButtonType.Secondary}>Generuj</Button>
         <Input ingredientName="Ciasto" placeholder="test" />
      </>
   );
};

export default App;
