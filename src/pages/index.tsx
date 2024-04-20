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
        <div className="from-tertiary to-danger flex h-screen max-h-full w-full items-center justify-between bg-gradient-to-b p-6 text-white">
          <h1 className="m-auto text-center text-6xl font-bold">
            Welcome to Benefitsphere
          </h1>
        </div>
      </main>
    </>
  );
}
