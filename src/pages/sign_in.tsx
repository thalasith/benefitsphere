import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getProviders, signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";

interface Provider {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
}

type Providers = Record<string, Provider>;

export default function SignIn({ providers }: { providers: Providers }) {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      window.location.href = "/homepage";
    }
  });
  return (
    <>
      <Head>
        <title>Benefitsphere</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-primary ">
        <div className="flex h-dvh items-center justify-center bg-gradient-to-b from-tertiary to-danger p-6 text-white">
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
                Welcome to Benefitsphere
              </h2>
              {Object.values(providers).map((provider) => {
                return (
                  <button
                    className="mt-2 flex h-12 w-4/5 items-center justify-center rounded-md bg-primary font-extrabold text-white hover:bg-tertiary"
                    key={provider.id}
                    onClick={() => signIn(provider.id)}
                  >
                    {provider.name === "Google" && (
                      <Image
                        src="/Google.png"
                        alt="Google Image"
                        width={18}
                        height={13}
                      />
                    )}

                    {provider.name === "Okta" && (
                      <Image
                        src="/OktaAuraReverse.png"
                        alt="Google Image"
                        width={25}
                        height={20}
                      />
                    )}
                    <p className="pl-1">Sign in with {provider.name}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const providers = await getProviders();

  return {
    props: { providers },
  };
};
