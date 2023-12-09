// styles
import styles from './IngredientsForm.module.css';

// enums
import { ButtonType } from '../enums/enums';

// components
import Button from './UI/Button';
import Input from './UI/Input';
import DumplingIcon from './icons/DumplingIcon';
import Loader from './UI/Loader';

const IngredientsForm = () => {
   return (
      <form className={styles.form}>
         <div className={styles.formHeader}>
            <h2>
               <DumplingIcon /> Składniki
            </h2>
            <div className={styles.buttonSection}>
               <Loader />
               <Button type={ButtonType.Secondary}>Generuj</Button>
            </div>
         </div>

         <section>
            <Input ingredientName="Ciasto" placeholder="wpisz, wygeneruj lub zostaw puste"></Input>
            <Input
               ingredientName="Nadzienie"
               placeholder="wpisz, wygeneruj lub zostaw puste"
            ></Input>
            <Input
               ingredientName="Składniki"
               placeholder="wpisz, wygeneruj lub zostaw puste"
            ></Input>
         </section>
      </form>
   );
};

export default IngredientsForm;
