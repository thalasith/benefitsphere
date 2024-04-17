import { useSession } from "next-auth/react";
import Head from "next/head";
import Container from "~/components/Container";
import Header from "~/components/Header";

export default function Home() {
  const { data: sessionData, status } = useSession();
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>Benefitsphere</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <Header />
        <Container>Hello world</Container>
      </main>
    </>
  );
}
