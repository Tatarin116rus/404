 
export interface Schedule {
  id: string;
  name: string;
}
 
export interface Salary {
  from?: number;
  to?: number;
  currency?: string;
}

export interface Vacancy {
  id: string;
  name: string;
  area: { name: string };
  employer: { name: string };
  salary: { from?: number; to?: number; currency?: string } | null;
  experience: { name: string };
  schedule: { id: string; name: string } | null; // было work_format
  alternate_url: string;
   /*добавили для VacancyDetailPage*/snippet?: {
    requirement?: string;
    responsibility?: string;
  };
}
export interface VacancyResponse {
  items: Vacancy[];
  found: number;
 
}