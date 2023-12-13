import { PierogData } from '../../interfaces';
import styles from './Input.module.css';
import classNames from 'classnames';

interface SimpleInputProps {
   pierogSettings: PierogData;
   pierogSetters: React.Dispatch<React.SetStateAction<PierogData>>;
   placeholder: string;
   disabled?: boolean;
}

const SimpleInput = (props: SimpleInputProps) => {
   const localHandleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      props.pierogSetters((prevState) => {
         return { ...prevState, name: event.target.value };
      });
   };

   const simpleInputStyles = classNames(styles.inputStyle, styles.simpleInputStyle);

   const simpleWrapperStyles = classNames(styles.inputWrapper, styles.simpleWrapper);

   return (
      <div className={styles.inputTopWrapper}>
         <h3 className={styles.titleStyle}>Nazwa</h3>
         <div className={simpleWrapperStyles}>
            <input
               type="text"
               disabled={props.disabled}
               onChange={localHandleInput}
               className={simpleInputStyles}
               value={props.pierogSettings.name}
               placeholder={props.placeholder}
               maxLength={props.maxLen || 50}
            />
         </div>
      </div>
   );
};

export default SimpleInput;
