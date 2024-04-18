import { useSession } from "next-auth/react";
import Head from "next/head";
import Container from "~/components/Container";
import Header from "~/components/Header";
import { api } from "~/utils/api";

export default function Home() {
  const { data: sessionData, status } = useSession();
  const { data: riskPlans } = api.riskPlan.getRiskPlansByClientId.useQuery({
    clientId: sessionData?.user.activeClient ?? 0,
  });

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
      <main className="text-primary">
        <Header />
        <Container>
          <h1 className="text-center text-6xl font-bold">
            Welcome to Benefitsphere
          </h1>
          <h2 className="text-center text-4xl font-bold">Risk Plans</h2>
          <ul>
            {riskPlans?.map((riskPlan) => (
              <li key={riskPlan.id}>
                <p>{riskPlan.planName}</p>
              </li>
            ))}
          </ul>
        </Container>
      </main>
    </>
  );
}
