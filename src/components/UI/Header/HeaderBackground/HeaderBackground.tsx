// styles
import styles from './HeaderBackground.module.css';
import SVGComponentMachine from '../SVGComponent/SVGComponentMachine';
import SVGComponentStore from '../SVGComponent/SVGComponentStore';
import React  from 'react';

interface HeaderBackgroundProps {
  background: string;
}

const HeaderBackground: React.FC<HeaderBackgroundProps> = ({ background }) => {
  return (
    <header className={`${styles.header} ${styles[background]}`}>
      {background === 'dumplingMachine' ? (
          <SVGComponentMachine />
        ) : (
          ''
        )}
      {background === 'dumplingStore' ? (
          <SVGComponentStore />
        ) : (
        ''
        )}
    </header>
  );
};

export default HeaderBackground;