import { Button, Center } from "@mantine/core";
import Link from "next/link";
import { Card, Image, Text } from "@mantine/core";
import styles from "../styles/App.module.css";

const Home = ({ posts }) => {
  return (
    <section>
      <Center>
        <section className={styles.header}>
          <h1>Posts</h1>
          <Link href="/new" passHref>
            <Button component="a" size="lg" className={styles.button}>
              New Post
            </Button>
          </Link>
        </section>
      </Center>
      <section className={styles.cards}>
        {posts._items.map((i, k) => (
          <Card
            key={k}
            shadow="sm"
            p="xl"
            m="md"
            style={{
              width: 300,
            }}
            component="a"
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
          >
            <Card.Section>
              <Image src={i.url} alt={i.text} height={160} width={300} />
            </Card.Section>
            <Text
              weight={500}
              size="xl"
              mt="sm"
            >{`${i.emotion[0]} - ${i.text}`}</Text>
            <Text size="sm">{`Posted by: ${i.pkey.slice(0, 17)}...`}</Text>
          </Card>
        ))}
      </section>
    </section>
  );
};

export const getServerSideProps = async () => {
  const data = await fetch("http://192.168.100.175:8000/");
  const posts = await data.json();

  return {
    props: {
      posts,
    },
  };
};

export default Home;
