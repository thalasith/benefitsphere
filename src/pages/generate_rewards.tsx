import Head from "next/head";
import { useState, useEffect } from "react";
import Container from "~/components/Container";
import { Footer } from "~/components/Footer";
import Header from "~/components/Header";
import { useSession } from "next-auth/react";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";
import { CustomSelect } from "~/components/CustomSelect";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

export default function GenerateRewards() {
  const { data: sessionData } = useSession();
  const [step, setStep] = useState(1);
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [chosenPlans, setChosenPlans] = useState<number[]>([]);

  const { data: countryData } =
    api.country.getCountryRelationsByClientId.useQuery({
      clientId: sessionData?.user.activeClient ?? 0,
    });
  const countries = countryData?.map((country) => country.country ?? "") ?? [];
  const generateTest = api.reward.createTest.useMutation();
  const { data: riskPlans, refetch: refetchRiskPlans } =
    api.riskPlan.getRiskPlanDetailsByCountry.useQuery(
      { country: country },
      { enabled: false }, // Disabled by default
    );
  console.log(chosenPlans);

  useEffect(() => {
    if (step === 2) {
      refetchRiskPlans();
    }
  }, [step, refetchRiskPlans]);

  const handleGenerateTest = async () => {
    try {
      console.log("Generating test...");
      const test = await generateTest.mutateAsync({
        question: "What is the best programming language?",
      });
      console.log(test);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBoxCheck = (id: number) => {
    if (chosenPlans.includes(id)) {
      setChosenPlans(chosenPlans.filter((planId) => planId !== id));
    } else {
      setChosenPlans([...chosenPlans, id]);
    }
  };

  return (
    <>
      <Head>
        <title>Benefitsphere - Generate Rewards Page</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="text-primary">
        <Header />
        <Container>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Generate Rewards Page</h1>
          </div>
          <p className="mt-4 text-lg">This page is used to generate rewards.</p>

          {step === 1 && (
            <div className="mt-8">
              <h2 className="mb-2 text-xl font-bold">
                Step 1: Choose a country
              </h2>
              <CustomSelect
                placeholder="Select Benefit"
                options={countries}
                value={country}
                setValue={setCountry}
              />
              <Button onClick={() => setStep(2)} className="mt-4 bg-primary">
                Next
              </Button>
            </div>
          )}
          {step === 2 && (
            <div className="mt-8">
              <h2 className="mb-2 text-xl font-bold">Step 2: Choose plans</h2>

              <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Id</TableHead>
                    <TableHead>Plan Name</TableHead>
                    <TableHead>Coverage Type</TableHead>
                    <TableHead className="text-center">Check</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {riskPlans?.map((riskPlan, idx) => (
                    <TableRow key={riskPlan.id}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>{riskPlan.planName}</TableCell>
                      <TableCell>{riskPlan.coverageType}</TableCell>
                      <TableCell>
                        <Checkbox
                          className="text-center"
                          onCheckedChange={
                            () => handleBoxCheck(riskPlan.id)
                            // handleBoxCheck(riskPlan.id)
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button onClick={() => setStep(3)} className="mt-4 bg-primary">
                Next
              </Button>
            </div>
          )}

          {/* <Button onClick={handleGenerateTest}>Generate Test</Button> */}
        </Container>
        <Footer />
      </main>
    </>
  );
}