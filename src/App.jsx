import Navigation from './components/Navigation/Navigation';
import css from './App.module.css';
import { Suspense } from 'react';
import AppRouter from './components/AppRouter/AppRouter';

const App = () => {
  return (
    <div className={css.container}>
      <Navigation />
      <Suspense fallback={<div>Loading page...</div>}>
        <AppRouter />
      </Suspense>
    </div>
  );
};

export default App;
