import { Suspense } from 'react';
import { Route, Routes, Redirect } from 'react-router-dom';
import Rockets from '../pages/Home/Home';
import Missions from '../pages/Missions/Missions';
import Profile from '../pages/Profile/Profile';

const AppRoutes = () => (
  <Suspense>
    <Routes>
      <Route path="/" element={<Rockets />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/missions" element={<Missions />} />
      <Redirect to="/" />
    </Routes>
  </Suspense>
);

export default AppRoutes;
