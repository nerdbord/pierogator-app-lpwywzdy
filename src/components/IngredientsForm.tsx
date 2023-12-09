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
            <Input></Input>
            <Input></Input>
            <Input></Input>
         </section>
      </form>
   );
};

export default IngredientsForm;
