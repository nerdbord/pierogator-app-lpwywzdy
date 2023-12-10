import { useLayoutEffect, useRef, useState } from 'react';
import LockIcon from '../icons/LockIcon';
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

const SimpleInput = (props: InputProps) => {
   const [hasMounted, setHasMounted] = useState(false);
   const inputRef = useRef<HTMLTextAreaElement>(null);

   useLayoutEffect(() => {
      if (hasMounted && inputRef.current) {
         inputRef.current.style.height = 'auto'; // Reset the height to auto
         inputRef.current.style.height = inputRef.current.scrollHeight + 'px'; // Set the height based on the content
      } else {
         // Mark the component as mounted after the first render
         setHasMounted(true);
      }
   }, [props.displayValue, hasMounted]);

   const handleLock = () => {
      props.setLocked((prev) => !prev);
   };

   const inputWrapperStyle = classNames(
      styles.inputWrapper,
      props.isLocked ? styles.lockedStyle : styles.unlockedStyle,
   );

   const localHandleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      props.handleInput(event, props.ingredientName);
   };

   return (
      <div className={styles.inputTopWrapper}>
         <h3 className={styles.titleStyle}>{props.ingredientName}</h3>
         <div className={inputWrapperStyle}>
            <div className={styles.iconWrapper} onClick={handleLock}>
               <LockIcon type={props.isLocked ? LockIconType.locked : LockIconType.unlocked} />
            </div>
            <textarea
               rows={1}
               ref={inputRef}
               onChange={localHandleInput}
               className={styles.inputStyle}
               disabled={props.isLocked}
               value={props.displayValue}
               placeholder={'wpisz, wygeneruj lub zostaw puste'}
               maxLength={30}
            />
         </div>
      </div>
   );
};

export default SimpleInput;
