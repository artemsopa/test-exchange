import { Route, Routes } from 'react-router-dom';

import Home from '@/pages/Home';

const App: React.FC = () => (
  <Routes>
    <Route element={<Home />} path="/" />
  </Routes>
);

export default App;
