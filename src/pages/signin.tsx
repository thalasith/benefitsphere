import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import { AppProps } from "next/app";
import Head from "next/head";
import { Footer } from "~/components/Footer";
import Header from "~/components/Header";

interface Provider {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
}

interface Providers {
  [key: string]: Provider;
}

export default function SignIn({ providers }: { providers: Providers }) {
  console.log(providers);
  return (
    <>
      <Head>
        <title>Benefitsphere</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-primary ">
        <Header />
        <div className="flex h-dvh items-center justify-between bg-gradient-to-b from-tertiary to-danger p-6 text-white">
          <h1 className="m-auto text-center text-6xl font-bold">Login</h1>
          {Object.values(providers).map((provider) => {
            return (
              <button
                key={String(provider.id)}
                onClick={() => signIn(String(provider.id))}
              >
                {" "}
                Sign in with {String(provider.name)}
              </button>
            );
          })}
        </div>
        <Footer />
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
