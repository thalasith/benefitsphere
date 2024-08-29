import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import PublicHeader from "~/components/PublicHeader";
import WideContainer from "~/components/WideContainer";
import { api } from "~/utils/api";
import NarrowContainer from "~/components/NarrowContainer";
import Link from "next/link";

export default function EditRewards() {
  const { clientUrl } = useRouter().query || "";
  const { data: clientData } = api.client.getClientNameByUrl.useQuery({
    url: clientUrl as string,
  });
  const clientId = clientData?.id ?? 0;
  const { data: clientCountries } =
    api.country.getCountryRelationsByClientId.useQuery({
      clientId: clientId,
    });
  const message =
    "We recognize the importance of total rewards and benefits in attracting, retaining, and engaging employees. We are committed to providing a comprehensive and competitive benefits package that offers flexibility and choice to meet the diverse needs of our employees and their families.  Please select a country below to view the benefits available.";

  return (
    <>
      <Head>
        <title>Benefitsphere - Risk Benefit</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="text-primary">
        <PublicHeader />
        <WideContainer>
          <div className="mb-4 flex justify-end">
            <Link href={`/rewards/${clientUrl?.toString()}`}>
              <button className="hover:bg-primary-dark rounded-md bg-primary px-4 py-2 text-white transition-colors">
                Read Mode
              </button>
            </Link>
          </div>
          <div className="flex w-full">
            <Image
              src="/worktogether.jpg"
              alt="Rewards"
              width={500}
              height={250}
            />

            <div className="w-full px-4">
              <div className="mb-4">
                <input
                  type="text"
                  id="welcomeMessage"
                  name="welcomeMessage"
                  className="mt-1 block w-full rounded-md border-gray-300 text-3xl font-bold shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Enter welcome message"
                  defaultValue="Welcome!"
                />
              </div>

              <div className="mb-4">
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Enter description"
                  defaultValue={message}
                ></textarea>
              </div>
            </div>
          </div>
        </WideContainer>
        <NarrowContainer>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {clientCountries?.map((country) => {
              const clientIdString = Array.isArray(clientId)
                ? clientId.join("")
                : clientId ?? "";
              const countryString = Array.isArray(country.country)
                ? country.country.join("")
                : country.country ?? "";

              return (
                <Link
                  key={country.id}
                  className="flex justify-between rounded-md bg-white text-left shadow-md transition duration-300 ease-in-out hover:shadow-lg"
                  href={`/rewards/${clientUrl?.toString() ?? ""}/${countryString.toString() ?? ""}`}
                >
                  <h2 className="p-4 text-xl font-bold">{country.country}</h2>
                  <Image
                    src={`https://flagsapi.com/${country.code}/flat/64.png`}
                    className="mr-4 mt-1"
                    alt={country.country ?? "Country Flag"}
                    width={50}
                    height={50}
                  />
                </Link>
              );
            })}
          </div>
        </NarrowContainer>
      </main>
    </>
  );
}
