
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AutoSavePage } from '../pages/AutoSavePage';

export const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AutoSavePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};