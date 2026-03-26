// App.tsx
import React from "react";
import { Container } from "@mantine/core";
import "@mantine/core/styles.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { VacanciesPage } from "./pages/VacanciesPage";      // создадим позже
import { VacancyDetailPage } from "./pages/VacancyDetailPage";
import { NotFoundPage } from "./pages/NotFoundPage";        // создадим позже

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Container mt="md">
        <Routes>
          <Route path="/" element={<Navigate to="/vacancies/moscow" replace />} />
          <Route path="/vacancies/moscow" element={<VacanciesPage city="Москва" />} />
          <Route path="/vacancies/petersburg" element={<VacanciesPage city="Санкт-Петербург" />} />
          <Route path="/vacancies/:id" element={<VacancyDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;