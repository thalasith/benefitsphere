import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import PublicHeader from "~/components/PublicHeader";
import WideContainer from "~/components/WideContainer";
import { api } from "~/utils/api";
import NarrowContainer from "~/components/NarrowContainer";
import Link from "next/link";

export default function Rewards() {
  const { clientUrl } = useRouter().query || "";
  const { data: clientData } = api.client.getClientNameByUrl.useQuery({
    url: clientUrl as string,
  });
  const clientId = clientData?.id ?? 0;
  const { data: clientCountries } =
    api.country.getCountryRelationsByClientId.useQuery({
      clientId: clientId,
    });

  return (
    <>
      <Head>
        <title>Benefitsphere - Risk Benefit</title>
        <meta name="description" content="Generated b y create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="text-primary">
        <PublicHeader />
        <WideContainer>
          <div className="mb-4 flex justify-end">
            <Link href={`/rewards/${clientUrl?.toString()}/edit`}>
              <button className="rounded-md bg-primary px-4 py-2 text-white transition-colors hover:bg-tertiary">
                Edit Mode
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
            <div className="px-4 ">
              <h1 className="text-3xl font-bold">{clientData?.rewardsTitle}</h1>
              <p className="pt-2 text-lg">
                {clientData?.rewardsWelcomeMessage}
              </p>
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
