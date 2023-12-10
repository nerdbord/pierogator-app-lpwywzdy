import { useLayoutEffect, useRef, useState } from 'react';
import LockIcon from '../icons/LockIcon';
import { IngredType, LockIconType } from '../../enums/enums';
import styles from './Input.module.css';
import classNames from 'classnames';

interface SimpleInputProps {
    valueSettings: {
        value: string;
        setter: React.Dispatch<React.SetStateAction<string>>;
     };
     placeholder: string;
}

const SimpleInput = (props: SimpleInputProps) => {
   const localHandleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.valueSettings.setter(event.target.value)
   };


   const simpleInputStyles = classNames(
    styles.inputStyle,
    styles.simpleInputStyle
   )

   const simpleWrapperStyles = classNames(
    styles.inputWrapper,
    styles.simpleWrapper,
   )


   return (
      <div className={styles.inputTopWrapper}>
         <h3 className={styles.titleStyle}>Nazwa</h3>
         <div className={simpleWrapperStyles}>
            <input
               type='text'
               onChange={localHandleInput}
               className={simpleInputStyles}
               value={props.valueSettings.value}
               placeholder={props.placeholder}
               maxLength={30}
            />
         </div>
      </div>
   );
};

export default SimpleInput;
