import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import styles from './App.module.css';

// components
import HeaderBackground from './components/UI/Header/HeaderBackground/HeaderBackground';
import NewPierog from './components/NewPierogConfig/NewPierog';
import { HeaderType } from './enums/enums';
import PierogarniaContainer from './components/Pierogarnia/PierogarniaContainer';

const router = createBrowserRouter([
   {
      path: '/',
      element: <PierogarniaContainer />,
   },
   {
      path: '/create-pierog',
      element: <NewPierog />,
   },
]);

const App = () => {
   return (
      <div className={styles.mainWrapper}>
         <HeaderBackground type={HeaderType.machine}></HeaderBackground>
         <div className={styles.appWrapper}>
            <RouterProvider router={router} />
         </div>
      </div>
   );
};

export default App;
