// styles
import styles from './Button.module.css';

// enums
import { ButtonType } from '../../enums/enums';

interface ButtonProps {
   children: string;
   type: ButtonType;
}

const Button = (props: ButtonProps) => {
   return (
      <button
         className={
            props.type === ButtonType.Primary ? styles.buttonPrimary : styles.buttonSecondary
         }
      >
         {props.children}
      </button>
   );
};

export default Button;
