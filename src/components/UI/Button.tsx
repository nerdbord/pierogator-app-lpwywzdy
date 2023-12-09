// styles
import styles from './Button.module.css';

// enums
import { ButtonType } from '../../enums/enums';

interface ButtonProps {
   children: string;
   type: ButtonType;
   onClick?: () => void;
}

const Button = (props: ButtonProps) => {
   return (
      <button
         onClick={props.onClick}
         className={
            props.type === ButtonType.Primary ? styles.buttonPrimary : styles.buttonSecondary
         }
      >
         {props.children}
      </button>
   );
};

export default Button;
