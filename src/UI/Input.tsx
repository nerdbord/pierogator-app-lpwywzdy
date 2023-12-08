import { useState } from "react";
import LockIcon from "../assets/LockIcon";
import { LockIconType } from "../enums/enums";
import styles from "./Input.module.css";

interface InputProps {
  ingredientName: string;
}

const Input = (props: InputProps) => {
  const [locked, setLocked] = useState(false);

  const handleLock = () => {
    setLocked((prev) => !prev);
  };

  return (
    <div className={styles.inputTopWrapper}>
      <h3 className={styles.titleStyle}>{props.ingredientName}</h3>
      <div className={styles.inputWrapper}>
        <div className={styles.iconWrapper} onClick={handleLock}>
          <LockIcon
            type={locked ? LockIconType.locked : LockIconType.unlocked}
          />
        </div>
        <input className={styles.inputStyle} type="text" />
      </div>
    </div>
  );
};

export default Input;
