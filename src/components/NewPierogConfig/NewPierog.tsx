import { useState } from 'react';
import styles from './NewPierog.module.css';

// components
import Ingredients from './Ingredients';
import PierogImage from './PierogImage';
import Recipe from './Recipe';
import Button from '../UI/Button';
import { ButtonType } from '../../enums/enums';

const NewPierog = () => {
   const [doughValue, setDoughValue] = useState('');
   const [fillingValue, setFillingValue] = useState('');
   const [ingredsValue, setIngredsValue] = useState('');
   const [pierogName, setPierogName] = useState('');
   const [ingredientStep, setIngredientStep] = useState(true);

   const stateProps = {
      values: {
         dough: doughValue,
         filling: fillingValue,
         ingreds: ingredsValue,
      },
      setters: {
         dough: setDoughValue,
         filling: setFillingValue,
         ingreds: setIngredsValue,
      },
   };

   const nameProps = { value: pierogName, setter: setPierogName };

   const handleSave = () => {

   }

   const stepChanger = () => {
      if (ingredientStep) {
         return (
            <>
               <Ingredients inputValues={stateProps} />
               <PierogImage inputValues={stateProps.values} nameSettings={nameProps} />
               {pierogName && <Button type={ButtonType.Primary} onClick={handleSave}>Zapisz i przejdź do tworzenia przepisu</Button>}
            </>
         );
      } else {
        return (
            <>
            <PierogImage inputValues={stateProps.values} nameSettings={nameProps} />
            <Recipe inputValues={stateProps.values} nameSettings={nameProps}/>
            </>
        )
      }
   };

   return (
      <div className={styles.form}>
         {stepChanger()}
      </div>
   );
};

export default NewPierog;
