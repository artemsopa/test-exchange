import { Route, Routes } from 'react-router-dom';

import Home from '@/pages/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import HowItWorks from './pages/HowItWorks';

const App: React.FC = () => (
  <Routes>
    <Route element={<Home />} path="/" />
    <Route element={<AboutUs />} path="/about-us" />
    <Route element={<ContactUs />} path="/contacts" />
    <Route element={<HowItWorks />} path="/how-it-works" />
  </Routes>
);

export default App;
