 
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Title, Loader, Group, TextInput, Button, Tabs } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loadVacancies, setPage, setSearch, setSkills, setCity } from "../store/xSlice";
import { VacancyCard } from "../components/vacancy_card/VacancyCard";
import { PaginationBar } from "../components/pagination_bar/PaginationBar";
import { SkillsPills } from "../components/skills_pills/SkillsPills";
import classes from "./VacanciesPage.module.css";

interface VacanciesPageProps {
  city: "Москва" | "Санкт-Петербург";
}

export const VacanciesPage = ({ city }: VacanciesPageProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, loading, page, totalPages, search, skills } = useAppSelector(
    (state) => state.vacancies
  );
  const [localSearch, setLocalSearch] = useState(search);
  const [searchParams, setSearchParams] = useSearchParams();
 
  useEffect(() => {
    dispatch(setCity(city));
  }, [city, dispatch]);
 
  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    const urlSkills = searchParams.getAll("skills");
    const urlPage = Number(searchParams.get("page")) || 1;

    if (urlSearch !== search) dispatch(setSearch(urlSearch));
    if (JSON.stringify(urlSkills) !== JSON.stringify(skills))
      dispatch(setSkills(urlSkills));
    if (urlPage !== page) dispatch(setPage(urlPage));
  }, []);  

 
  useEffect(() => {
    const newParams = new URLSearchParams();
    if (search) newParams.set("search", search);
    skills.forEach((skill) => newParams.append("skills", skill));
    if (page > 1) newParams.set("page", String(page));
    setSearchParams(newParams, { replace: true });
  }, [search, skills, page]);

 
  useEffect(() => {
    dispatch(loadVacancies());
  }, [page, search, city, skills, dispatch]);

  const handleSearch = () => {
    dispatch(setSearch(localSearch));
    dispatch(setPage(1));
  };

 
  const handleTabChange = (value: string | null) => {
    if (value === "moscow") {
      navigate("/vacancies/moscow");
    } else if (value === "petersburg") {
      navigate("/vacancies/petersburg");
    }
  };

  const activeTab = city === "Москва" ? "moscow" : "petersburg";

  return (
    <div className={classes.container}>
      <Group className={classes.header}>
        <div>
          <Title order={2} className={classes.title}>
            Список вакансий
          </Title>
          <p className={classes.subtitle}>по профессии Frontend-разработчик</p>
        </div>

        <Group className={classes.search}>
          <TextInput
            placeholder="Должность или название компании"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className={classes.search__input}
          />
          <Button
            className={classes.search__button}
            color="primary.4"
            onClick={handleSearch}
          >
            Найти
          </Button>
        </Group>
      </Group>

  

      <Group className={classes.content} align="flex-start">
        <aside className={classes.sidebar}>
          <SkillsPills />
        </aside>
      
        <main className={classes.vacancies}>
        <Tabs color="primary" defaultValue="gallery" value={activeTab} onChange={handleTabChange} mb="md">
          <Tabs.List className={classes.tabsList}>
            <Tabs.Tab value="moscow">Москва</Tabs.Tab>
            <Tabs.Tab value="petersburg">Санкт-Петербург</Tabs.Tab>
          </Tabs.List>
        </Tabs>
          {loading ? (
            <Loader />
          ) : (
            <>
              {items.map((vacancy) => (
                <VacancyCard key={vacancy.id} vacancy={vacancy} />
              ))}
              {totalPages > 1 && (
                <PaginationBar
                  page={page}
                  total={totalPages}
                  onChange={(p) => dispatch(setPage(p))}
                />
              )}
            </>
          )}
        </main>
      </Group>
    </div>
  );
};