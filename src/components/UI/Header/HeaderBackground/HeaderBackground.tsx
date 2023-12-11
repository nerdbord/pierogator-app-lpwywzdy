import styles from './HeaderBackground.module.css';
import SVGCompMachine from '../SVGComponent/SVGCompMachine';
import SVGCompStore from '../SVGComponent/SVGCompStore';
import { HeaderType } from '../../../../enums/enums';

interface HeaderProps {
   type: HeaderType;
}

const HeaderBackground = (props: HeaderProps) => {
   return (
      <header className={`${styles.header}`}>
         {props.type === HeaderType.machine ? <SVGCompMachine /> : <SVGCompStore />}
      </header>
   );
};

export default HeaderBackground;
