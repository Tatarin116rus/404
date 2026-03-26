import { Container, Title, Text, Button, Card, Image  } from "@mantine/core";
import { Link } from "react-router-dom";
import myImage from './image.png';

export const NotFoundPage = () => {
  return (
    <Container size="md" py="xl">
      <Card>
        <Title order={1}>
          Упс! такой страницы нету.
            <Button  component={Link} to="/" color="primary.4">
           на главную
          </Button>
        </Title>
      
        <Text >
          давай перейдем к началу.
        </Text>
      <Image 
      radius="md"
      src={myImage}
      />
      </Card>
    </Container>
  );
};