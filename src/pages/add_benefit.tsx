import Head from "next/head";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Header from "~/components/Header";
import { Switch } from "@headlessui/react";
import { api } from "~/utils/api";
import Router from "next/router";
import Container from "~/components/Container";

export default function AddBenefit() {
  const { data: sessionData } = useSession();
  const [selectedBenefit, setSelectedBenefit] = useState("");
  const [benefitName, setBenefitName] = useState("");
  const [mandated, setMandated] = useState(false);
  const activeClient = sessionData?.user.activeClient ?? 0;

  const addRiskPlan = api.riskPlan.create.useMutation();

  const handleAddBenefit = () => {
    if (!benefitName || benefitName === "") {
      return;
    }

    if (selectedBenefit === "Risk") {
      console.log("Adding Risk Plan");
      addRiskPlan.mutate({
        clientId: activeClient,
        planName: benefitName,
        mandated,
      });
      Router.push("/").catch((err) => console.log(err));
    }
  };

  return (
    <>
      <Head>
        <title>Add a Client</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <Container>
          <h1 className="text-3xl font-bold">Add Benefit</h1>
          <div className="my-2 flex border border-gray-500 p-2">
            <div className="my-2 w-1/3">
              <label
                htmlFor="client"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Benefit
              </label>
              <select
                id="client"
                name="client"
                autoComplete="client-name"
                onChange={(e) => setSelectedBenefit(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option value="">Select Benefit</option>
                <option value="Risk">Risk Benefit</option>
              </select>
            </div>
            <div className="my-2 w-1/3">
              <label
                htmlFor="user"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Benefit Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter Benefit Name"
                onChange={(e) => setBenefitName(e.target.value)}
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              />
            </div>
            <div className="my-2 w-1/3 pt-4">
              <label
                htmlFor="client"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Is benefit mandated?
              </label>
              <Switch
                checked={mandated}
                onChange={setMandated}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ${mandated ? "bg-indigo-600" : "bg-gray-200"}`}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${mandated ? "translate-x-5" : "translate-x-0"}`}
                />
              </Switch>
            </div>
            <button className="mt-2" onClick={() => handleAddBenefit()}>
              Submit
            </button>
          </div>
        </Container>
      </main>
    </>
  );
}
