import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import type { ChangeEvent } from "react";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import Router from "next/router";
import Image from "next/image";
import Header from "~/components/Header";
import { Footer } from "~/components/Footer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "~/components/ui/select";

const SelectClient: NextPage = () => {
  const { data: sessionData, update: updateSession, status } = useSession();
  const [userClient, setUserClient] = useState<string | null>(null);
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

      void Router.push("/").catch((err) => {
        console.log(err);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Select Client</title>
        <meta name="description" content="Quadar - Select Client" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="text-primary">
        <Header />
        <div className="flex h-dvh items-center justify-center bg-gradient-to-br from-tertiary to-secondary p-6 pb-72 text-white">
          <div className="flex w-1/2 justify-between rounded border border-gray-100 bg-white px-4 shadow-2xl">
            <div className="m-auto flex flex-col pr-4">
              <Image
                src="/RobotKeyboard.png"
                alt="Benefitsphere Logo"
                width={500}
                height={500}
              />
            </div>
            <div className="bg-alert-lt mx-auto flex h-1/4 w-4/5 flex-col items-center rounded p-2 py-4">
              <h2 className="pb-2 text-center text-2xl font-bold text-danger">
                Select a client
              </h2>

              <Select
                value={userClient ?? ""}
                onValueChange={(value) => setUserClient(value)}
              >
                <SelectTrigger className="w-72 text-primary">
                  <SelectValue placeholder="Select a client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select a client</SelectLabel>
                    {clients?.map((client) => (
                      <SelectItem
                        key={client.client.id}
                        value={client.client.id.toString()}
                        onClick={() =>
                          setUserClient(client.client.id.toString())
                        }
                      >
                        {client.client.clientName}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <button
                className="my-4 rounded bg-primary px-4 py-2 hover:bg-primary-lt"
                onClick={() => handleSelect()}
              >
                {" "}
                Select client
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default SelectClient;
