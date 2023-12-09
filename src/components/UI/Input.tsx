import { useState } from 'react';
import LockIcon from '../../assets/LockIcon';
import { IngredType, LockIconType } from '../../enums/enums';
import styles from './Input.module.css';
import classNames from 'classnames';

interface InputProps {
   ingredientName: IngredType;
   displayValue: string;
   isLocked: boolean;
   setLocked: React.Dispatch<React.SetStateAction<boolean>>;
   handleInput: (event: React.ChangeEvent<HTMLTextAreaElement>, ingredientName: IngredType) => void;
}

const Input = (props: InputProps) => {
   const handleLock = () => {
      props.setLocked((prev) => !prev);
   };

   const inputWrapperStyle = classNames(
      styles.inputWrapper,
      props.isLocked ? styles.lockedStyle : styles.unlockedStyle,
   );

   const localHandleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      props.handleInput(event, props.ingredientName);
      const target = event.target as HTMLTextAreaElement;
      target.style.height = '0px';
      target.style.height = target.scrollHeight + 'px';
   };

   return (
      <div className={styles.inputTopWrapper}>
         <h3 className={styles.titleStyle}>{props.ingredientName}</h3>
         <div className={inputWrapperStyle}>
            <div className={styles.iconWrapper} onClick={handleLock}>
               <LockIcon type={props.isLocked ? LockIconType.locked : LockIconType.unlocked} />
            </div>
            <textarea
               onChange={localHandleInput}
               className={styles.inputStyle}
               disabled={props.isLocked}
               value={props.displayValue}
               placeholder={'wpisz, wygeneruj lub zostaw puste'}
            />
         </div>
      </div>
   );
};

export default Input;
