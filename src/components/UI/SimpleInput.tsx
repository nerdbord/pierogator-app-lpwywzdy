import styles from './Input.module.css';
import classNames from 'classnames';

interface SimpleInputProps {
    valueSettings: {
        value: string;
        setter: React.Dispatch<React.SetStateAction<string>>;
     };
     placeholder: string;
     maxLen?: number
     disabled?: boolean;
}

const SimpleInput = (props: SimpleInputProps) => {
   const localHandleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
            <textarea
               disabled={props.disabled}
               onChange={localHandleInput}
               className={simpleInputStyles}
               value={props.valueSettings.value}
               placeholder={props.placeholder}
               maxLength={props.maxLen || 50}
            />
         </div>
      </div>
   );
};

export default SimpleInput;
