 export interface Vacancy {
  id: string;
  name: string;
  area: { name: string };
  employer: { name: string };
  salary: { from?: number; to?: number; currency?: string } | null;
  experience: { name: string };
  schedule: { id: string; name: string } | null; 
  alternate_url: string;
}