import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"; // <-- добавили
import { Title, Loader, Group, TextInput, Button } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loadVacancies, setPage, setSearch, setCity, setSkills } from "../store/xSlice";
import { VacancyCard } from "../components/vacancy_card/VacancyCard";
import { PaginationBar } from "../components/pagination_bar/PaginationBar";
import { SideBar } from "../components/sidebar/SideBar";
import classes from "./MainPage.module.css";

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const { items, loading, page, totalPages, search, city, skills } = useAppSelector(
    (state) => state.vacancies
  );
  const [localSearch, setLocalSearch] = useState(search);
  const [searchParams, setSearchParams] = useSearchParams(); // <-- добавили

  // 1. При монтировании: читаем параметры из URL и обновляем Redux
  useEffect(() => {
    const urlSearch = searchParams.get('search') || '';
    const urlCity = searchParams.get('city') || '';
    const urlSkills = searchParams.getAll('skills');
    const urlPage = Number(searchParams.get('page')) || 1;

    if (urlSearch !== search) dispatch(setSearch(urlSearch));
    if (urlCity !== city) dispatch(setCity(urlCity));
    if (JSON.stringify(urlSkills) !== JSON.stringify(skills)) dispatch(setSkills(urlSkills));
    if (urlPage !== page) dispatch(setPage(urlPage));
  }, []); // только при монтировании

  // 2. При изменении фильтров в Redux: обновляем URL
  useEffect(() => {
    const newParams = new URLSearchParams();
    if (search) newParams.set('search', search);
    if (city) newParams.set('city', city);
    skills.forEach(skill => newParams.append('skills', skill));
    if (page > 1) newParams.set('page', String(page));
    setSearchParams(newParams, { replace: true });
  }, [search, city, skills, page]);

  // 3. Загрузка вакансий при изменении фильтров или страницы
  useEffect(() => {
    dispatch(loadVacancies());
  }, [page, search, city, skills, dispatch]);

  const handleSearch = () => {
    dispatch(setSearch(localSearch));
    dispatch(setPage(1));
  };

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
            className={classes["search__input"]}
          />
          <Button
            className={classes["search__button"]}
            color="primary.4"
            onClick={handleSearch}
          >
            Найти
          </Button>
        </Group>
      </Group>

      <Group className={classes.content}>
        <SideBar />
        <main className={classes.vacancies}>
          {loading ? (
            <Loader />
          ) : (
            <>
              {items.map((vacancy) => (
                <VacancyCard key={vacancy.id} vacancy={vacancy} />
              ))}
              <PaginationBar
                page={page}
                total={totalPages}
                onChange={(p) => dispatch(setPage(p))}
              />
            </>
          )}
        </main>
      </Group>
    </div>
  );
};