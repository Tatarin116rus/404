import React from "react";
import { Container } from "@mantine/core";
import "@mantine/core/styles.css";
import { Header } from "./components/Header/Header.tsx";
import { MainPage } from "./pages/mainPages.tsx";
import { Routes, Route } from "react-router-dom";
import { VacancyDetailPage } from "./pages/VacancyDetailPage"; 
/*изменил App.tsx, чтобы он рендерил роутер, а не всегда MainPage. */


const App: React.FC = () => {
  return (
    <>
      <Header />    
      <Container mt="md">
        <Routes>
          <Route path="/" element={<MainPage />} />
            <Route path="/vacancies/:id" element={<VacancyDetailPage />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
