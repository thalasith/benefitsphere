import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import type { ChangeEvent } from "react";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import Router from "next/router";
import Container from "~/components/Container";
import Header from "~/components/Header";

const SelectClient: NextPage = () => {
  const [userClient, setUserClient] = useState<string | null>(null);
  const { data: sessionData, update: updateSession, status } = useSession();
  const { data: clients } = api.client.getClientsByUserId.useQuery({
    userId: sessionData?.user.id ?? "",
  });

  const { mutate: updateUserActiveClient } =
    api.user.updateUserActiveClient.useMutation();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    void Router.push("/signin").catch((err) => {
      console.log(err);
    });
  }

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setUserClient(e.target.value);
  };

  const handleSelect = async () => {
    if (!userClient) return;

    try {
      await updateSession({
        ...sessionData,
        activeClient: parseInt(userClient),
      });

      updateUserActiveClient({
        userId: sessionData?.user.id ?? "",
        activeClient: parseInt(userClient),
      });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(sessionData);

  return (
    <>
      <Head>
        <title>Select Client</title>
        <meta name="description" content="Quadar - Select Client" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <Container>
          <div className="flex flex-col justify-center rounded-lg border-2 p-2">
            <p className="py-2 text-sm">Please select a client</p>
            <select
              id="countries"
              className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              defaultValue={""}
              onChange={(e) => handleChange(e)}
            >
              <option value="">Choose a client</option>
              {clients?.map((client) => (
                <option key={client.client.id} value={client.client.id}>
                  {client.client.clientName}
                </option>
              ))}
            </select>
            <button
              className="my-4 rounded p-1 py-2 "
              onClick={() => handleSelect()}
            >
              {" "}
              Select client
            </button>
          </div>
        </Container>
      </main>
    </>
  );
};

export default SelectClient;
