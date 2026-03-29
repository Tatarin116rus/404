import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container, Loader, Text, Title, Paper, Button, Group, Badge } from '@mantine/core';
import { fetchVacancyById } from '../api/hhApi';
import type { Vacancy } from '../api/types';

export const VacancyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchVacancyById(id)
      .then(setVacancy)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <Text c="red">Ошибка: {error}</Text>;
  if (!vacancy) return <Text>Вакансия не найдена</Text>;

  const formatSalary = (salary: Vacancy['salary']) => {
    if (!salary) return 'Не указана';
    const { from, to, currency } = salary;
    if (from && to) return `${from} – ${to} ${currency || ''}`;
    if (from) return `от ${from} ${currency || ''}`;
    if (to) return `до ${to} ${currency || ''}`;
    return 'Не указана';
  };

  return (
    <Container size="lg" py="xl">
      <Paper shadow="xs" p="xl" radius="md">
        <Title order={2}>{vacancy.name}</Title>
        <Group mt="md">
          <Badge>{vacancy.experience?.name || 'Не указано'}</Badge>
          <Badge color={vacancy.schedule?.id === 'remote' ? 'green' : 'blue'}>
            {vacancy.schedule?.name || 'Не указано'}
          </Badge>
        </Group>
        <Text mt="md" fw={500}>Зарплата: {formatSalary(vacancy.salary)}</Text>
        <Text mt="md">Компания: {vacancy.employer.name}</Text>
        <Text>Город: {vacancy.area.name}</Text>
        {vacancy.snippet && (
          <div style={{ marginTop: '1rem' }}>
            {vacancy.snippet.requirement && (
              <div
                dangerouslySetInnerHTML={{ __html: vacancy.snippet.requirement }}
              />
            )}
            {vacancy.snippet.responsibility && (
              <div
                style={{ marginTop: '1rem' }}
                dangerouslySetInnerHTML={{ __html: vacancy.snippet.responsibility }}
              />
            )}
          </div>
        )}

        <Button
          component="a"
          href={vacancy.alternate_url}
          target="_blank"
          mt="xl"
          variant="filled"
          color="blue"
        >
          Откликнуться на hh.ru
        </Button>
      </Paper>
    </Container>
  );
};