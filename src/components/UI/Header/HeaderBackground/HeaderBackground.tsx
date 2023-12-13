import styles from './HeaderBackground.module.css';

import { HeaderType } from '../../../../enums/enums';

interface HeaderProps {
   type: HeaderType;
}

const HeaderBackground = (props: HeaderProps) => {
   return (
      <header
         className={props.type === HeaderType.machine ? styles.machine : styles.store}
      ></header>
   );
};

export default HeaderBackground;
