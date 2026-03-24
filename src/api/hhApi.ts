import type { VacancyResponse, Vacancy} from "./types";

const BASE_URL = "https://api.hh.ru/vacancies";

const CITY_CODES: Record<string, number | undefined> = {
  Москва: 1,
  "Санкт-Петербург": 2,
};

const DEFAULT_PARAMS = {
  industry: "7",
  professionalRole: "96",
  perPage: 10,
};

function buildQueryParams(params: {
  search: string;
  city: string;
  skills: string[];
  page: number;
}): URLSearchParams {
  const { search, city, skills, page } = params;

  const query = new URLSearchParams({
    text: search,
    per_page: String(DEFAULT_PARAMS.perPage),
    page: String(page - 1), // API ожидает страницы с 0
    industry: DEFAULT_PARAMS.industry,
    professional_role: DEFAULT_PARAMS.professionalRole,
  });

  const area = CITY_CODES[city];
  if (area !== undefined) {
    query.append("area", String(area));
  }

  if (skills.length > 0) {
    skills.forEach(skill => query.append("skill_set", skill));
  }
  return query;
}

export async function fetchVacancies(params: {
  page: number;
  skills: string[];
  search: string;
  city: string;
}): Promise<VacancyResponse> {
  try {
    const query = buildQueryParams(params);
    const url = `${BASE_URL}?${query.toString()}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Не удалось загрузить вакансии: ${error.message}`);
    }
    throw new Error("Неизвестная ошибка при загрузке вакансий");
  }
}

export async function fetchVacancyById(id: string): Promise<Vacancy> {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error('Ошибка загрузки вакансии');
  const data = await res.json();
  return data;
}