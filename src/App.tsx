import './App.module.css';
import Button from './components/UI/Button';
import { ButtonType } from './enums/enums';

const App = () => {
   return (
      <>
         <h1>Pierogator świąteczny</h1>
         <Button type={ButtonType.Primary}>Zapisz i przejdź do tworzenia przepisu</Button>
         <Button type={ButtonType.Secondary}>Generuj</Button>
      </>
   );
};

export default App;
