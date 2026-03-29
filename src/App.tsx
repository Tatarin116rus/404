// App.tsx
import React from "react";
import "@mantine/core/styles.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { VacanciesPage } from "./pages/VacanciesPage";     
import { VacancyDetailPage } from "./pages/VacancyDetailPage";
import { AboutPage } from "./pages/AboutPage";
import { NotFoundPage } from "./pages/NotFoundPage";     
import { Layout } from "./Layout/Layout";     

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/vacancies/moscow" replace />} />
            <Route path="/vacancies/moscow" element={<VacanciesPage city="Москва" />} />
            <Route path="/vacancies/petersburg" element={<VacanciesPage city="Санкт-Петербург" />} />
            <Route path="/vacancies/:id" element={<VacancyDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;