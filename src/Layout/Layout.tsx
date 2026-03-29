import { Outlet } from 'react-router-dom';
import { Container } from '@mantine/core';
import { Header } from '../components/Header/Header';

export const Layout = () => {
  return (
    <>
      <Header />
      <Container mt="md">
        <Outlet />
      </Container>
    </>
  );
};

/*Сделал просто Layout понимаю можно было сюда засунуть header или же более навороченно но думаю тебе так легче проверить*/