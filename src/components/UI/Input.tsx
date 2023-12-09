import { useState } from 'react';
import LockIcon from '../icons/LockIcon';
import { LockIconType } from '../../enums/enums';
import styles from './Input.module.css';
import classNames from 'classnames';

interface InputProps {
   ingredientName: string;
   placeholder: string;
}

const Input = (props: InputProps) => {
   const [textareaValue, setTextareaValue] = useState<string>('');
   const [locked, setLocked] = useState(false);

   const handleLock = () => {
      setLocked((prev) => !prev);
   };

   const inputWrapperStyle = classNames(
      styles.inputWrapper,
      locked ? styles.lockedStyle : styles.unlockedStyle,
   );

   const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const target = event.target as HTMLTextAreaElement;
      setTextareaValue(target.value);
      target.style.height = '0px';
      target.style.height = target.scrollHeight + 'px';
   };

   const handleFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
      textareaValue === '' && setTextareaValue(props.placeholder);
   };

   return (
      <div className={styles.inputTopWrapper}>
         <h3 className={styles.titleStyle}>{props.ingredientName}</h3>
         <div className={inputWrapperStyle}>
            <div className={styles.iconWrapper} onClick={handleLock}>
               <LockIcon type={locked ? LockIconType.locked : LockIconType.unlocked} />
            </div>
            <textarea
               onChange={handleInput}
               onFocus={handleFocus}
               className={styles.inputStyle}
               disabled={locked}
               value={textareaValue}
               placeholder={props.placeholder}
            />
         </div>
      </div>
   );
};

export default Input;
