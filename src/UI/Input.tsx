import { useState } from 'react';
import LockIcon from '../assets/LockIcon';
import { LockIconType } from '../enums/enums';
import styles from './Input.module.css';
import classNames from 'classnames';

interface InputProps {
   ingredientName: string;
}

const Input = (props: InputProps) => {
   const [textareaValue, setTextareaValue] = useState<string>('');
   //initial textarea height is 40px as per figma file
   const [textareaHeight, setTextareaHeight] = useState<number>(40);
   const [locked, setLocked] = useState(false);

   const handleLock = () => {
      setLocked((prev) => !prev);
   };

   const inputWrapperStyle = classNames(
      styles.inputWrapper,
      locked ? styles.lockedStyle : styles.unlockedStyle,
   );

   const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(event.target.value);
    setTextareaHeight(event.target.scrollHeight > textareaHeight ? event.target.scrollHeight : textareaHeight)
   };

   return (
      <div className={styles.inputTopWrapper}>
         <h3 className={styles.titleStyle}>{props.ingredientName}</h3>
         <div className={inputWrapperStyle}>
            <div className={styles.iconWrapper} onClick={handleLock}>
               <LockIcon type={locked ? LockIconType.locked : LockIconType.unlocked} />
            </div>
            <textarea
               rows={1}
               onChange={handleInput}
               className={styles.inputStyle}
               disabled={locked}
               value={textareaValue}
            />
         </div>
      </div>
   );
};

export default Input;
