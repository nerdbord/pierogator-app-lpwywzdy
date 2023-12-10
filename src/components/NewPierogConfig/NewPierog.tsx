import { useState } from 'react';
import styles from './NewPierog.module.css';

// components
import Ingredients from './Ingredients';
import PierogImage from './PierogImage';
import Recipe from './Recipe';

const NewPierog = () => {
   const [doughValue, setDoughValue] = useState('');
   const [fillingValue, setFillingValue] = useState('');
   const [ingredsValue, setIngredsValue] = useState('');

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

   return (
      <div className={styles.form}>
         <Ingredients inputValues={stateProps} />
         <PierogImage inputValues={stateProps.values}/>
         <Recipe inputValues={stateProps.values}/>
      </div>
   );
};

export default NewPierog;
