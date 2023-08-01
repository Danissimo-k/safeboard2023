import { FC, Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { RootRouter } from './routes/RootRouter';
import { store } from './store';
import { LoadingPage } from './features/common/LoadingPage/LoadingPage';

/** App component. */
export const App: FC = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Suspense fallback={<LoadingPage />}>
          <RootRouter />
        </Suspense>
      </div>
    </BrowserRouter>
  </Provider>
);
