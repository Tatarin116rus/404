import { Card, Title, Text, Group } from "@mantine/core";
import classes from "./AboutPage.module.css";

export const AboutPage = () => {
  return (
    <Card className={classes.container}>
      <Group className={classes.wrapper}>
        <Title className={classes.title}>Айдар Хабибуллин</Title>
        <Text className={classes.text}>
          Привет! Я - Frontend-разработчик. Пишу приложения на React +
          TypeScript + Redux Toolkit. лучший разработчик 2026 - бесконечность о обо мне будут писать книгу а потом виртуальные книги а после вообще молитться 
        </Text>
      </Group>
    </Card>
  );
}; 