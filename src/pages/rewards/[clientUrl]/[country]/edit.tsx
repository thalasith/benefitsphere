import Head from "next/head";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "~/components/Header";
import Container from "~/components/Container";
import { api } from "~/utils/api";
import GreenPeople from "~/assets/GreenPeople";
import GreenPiggyBank from "~/assets/GreenPiggyBank";
import GreenProfit from "~/assets/GreenProfit";
import GreenCalendar from "~/assets/GreenCalendar";
import GreenHeart from "~/assets/GreenHeart";
import PinkProfit from "~/assets/PinkProfit";
import PinkPiggyBank from "~/assets/PinkPiggyBank";
import PinkCalendar from "~/assets/PinkCalendar";
import { Footer } from "~/components/Footer";
import Link from "next/link";
import { Textarea } from "~/components/ui/textarea";
import { Input } from "~/components/ui/input";

const financial_protection = {
  clientId: 1,
  description:
    "Client B understands the importance of financial protection for our employees and their families. We offer a range of benefits to help provide financial security in the event of illness, injury, or death.",
  financial_protection: [
    {
      id: 1,
      name: "Life Insurance",
      description:
        "If you die, your beneficiary receives a lump-sum payment. The benefit is four times your basic annual salary.",
      referencedPlan: "Client A - Life Insurance Plan",
    },
    {
      id: 2,
      name: "AD&D Insurance",
      description:
        "If you die or are seriously injured in an accident, you or your beneficiary receives a lump-sum payment. The benefit is four times your basic annual salary.",
      referencedPlan: "Client A - AD&D Insurance Plan",
    },
    {
      id: 3,
      name: "Long Term Disability Insurance",
      description:
        "If you are unable to work due to a disability, you receive a monthly payment equal to 60% of your basic monthly salary.",
      referencedPlan: "Client A - Long Term Disability Insurance Plan",
    },
  ],
  financial_wellbeing: [
    {
      id: 1,
      name: "Pension Plan",
      description:
        "You can contribute to a pension plan to save for retirement. We match your contributions up to 5% of your basic annual salary.",
      referencedPlan: "Client A - Pension Plan",
    },
    {
      id: 2,
      name: "Employee Stock Purchase Plan",
      description:
        "You can purchase company stock at a discount through payroll deductions. You can contribute up to 10% of your basic annual salary.",
      referencedPlan: "Client A - Employee Stock Purchase Plan",
    },
  ],
};

const financial_wellbeing = [
  {
    id: 1,
    name: "Pension Plan",
    description:
      "You can contribute to a pension plan to save for retirement. We match your contributions up to 5% of your basic annual salary.",
    referencedPlan: "Client A - Pension Plan",
  },
  {
    id: 2,
    name: "Employee Stock Purchase Plan",
    description:
      "You can purchase company stock at a discount through payroll deductions. You can contribute up to 10% of your basic annual salary.",
    referencedPlan: "Client A - Employee Stock Purchase Plan",
  },
];

const work_life_balance = [
  {
    id: 1,
    name: "Vacation Days",
    description:
      "You receive 20 vacation days per year, which increases to 25 days after five years of service.",
    referencedPlan: "Client A - Vacation Days Plan",
  },
  {
    id: 2,
    name: "Sick Days",
    description:
      "You receive 10 sick days per year, which can be used for your own illness or to care for a sick family member.",
    referencedPlan: "Client A - Sick Days Plan",
  },
  {
    id: 3,
    name: "Bereavement Leave",
    description:
      "You receive three days of paid leave if a family member dies.",
    referencedPlan: "Client A - Bereavement Leave Plan",
  },
];

const health_wellness = [
  {
    id: 1,
    name: "Healthcare",
    description:
      "You receive comprehensive medical, dental, and vision coverage for you and your family.",
    referencedPlan: "Client A - Healthcare Plan",
  },
];

const other_benefits = [
  {
    id: 1,
    name: "Employee Assistance Program",
    description:
      "You have access to confidential counseling and support services to help you manage personal or work-related issues.",
    referencedPlan: "Client A - Employee Assistance Program Plan",
  },
];

export default function CountryProfileEdit() {
  const [countryDescription, setCountryDescription] = useState(
    "Client A recognizes the importance of total rewards and benefits in attracting, retaining, and engaging employees. We are committed to providing a comprehensive and competitive benefits package that offers flexibility and choice to meet the diverse needs of our employees and their families. Please select a category below to view the benefits available.",
  );
  const { data: sessionData, status } = useSession();
  const { clientUrl, country } = useRouter().query;
  const { data: clientData } = api.client.getClientNameByUrl.useQuery({
    url: clientUrl as string,
  });

  return (
    <>
      <Head>
        <title>Benefitsphere - Risk Benefit</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="text-primary">
        <Header />
        <Container>
          <h1 className="mb-2 mt-8 text-5xl font-bold">
            {clientData?.clientName} | {country} Benefits
          </h1>
          <Textarea
            className="mb-8 w-full"
            onChange={(e) => setCountryDescription(e.target.value)}
            value={countryDescription}
          />

          <div className="flex">
            <CustomButton
              Icon={GreenPiggyBank}
              text="Financial Protection"
              link="#financial-protection"
            />
            <CustomButton
              Icon={GreenProfit}
              text="Financial Well Being"
              link="#financial-wellbeing"
            />
            <CustomButton
              Icon={GreenCalendar}
              text="Work Life Balance"
              link="#work-life-balance"
            />
            <CustomButton
              Icon={GreenHeart}
              text="Health & Wellness"
              link="#health-wellness"
            />
            <CustomButton
              Icon={GreenPeople}
              text="Other Benefits"
              link="#other-benefits"
            />
          </div>
          <div className="mt-8">
            <div className="flex items-center" id="financial-protection">
              <PinkPiggyBank width={50} />
              <h2 className="text-4xl font-bold text-danger">
                <Input
                  value="Financial Protection"
                  className="w-full border-danger text-4xl font-bold text-danger"
                />
              </h2>
            </div>
            <p>
              {clientData?.clientName} understands the importance of financial
              protection for our employees and their families. We offer a range
              of benefits to help provide financial security in the event of
              illness, injury, or death.
            </p>
            <h3 className="mt-4 text-2xl font-bold text-secondary">
              Life Insurance
            </h3>
            <p>
              If you die, your beneficiary receives a lump-sum payment. The
              benefit is four times your basic annual salary.
            </p>
            <h3 className="mt-4 text-2xl font-bold text-secondary">
              AD&D Insurance
            </h3>
            <p>
              If you die or are seriously injured in an accident, you or your
              beneficiary receives a lump-sum payment. The benefit is four times
              your basic annual salary.
            </p>
            <h3 className="mt-4 text-2xl font-bold text-secondary">
              Long Term Disability Insurance
            </h3>
            <p>
              If you are unable to work due to a disability, you receive a
              monthly payment equal to 60% of your basic monthly salary.
            </p>
          </div>
          <div className="mt-8">
            <div className="flex items-center" id="financial-wellbeing">
              <PinkProfit width={50} />
              <h2 className="text-4xl font-bold text-danger">
                Financial Well Being
              </h2>
            </div>
            <p>
              {clientData?.clientName} is committed to helping employees achieve
              financial well-being. We offer a range of benefits to help you
              save for the future, manage your finances, and achieve your
              financial goals.
            </p>
            <h3 className="mt-4 text-2xl font-bold text-secondary">
              Pension Plan
            </h3>
            <p>
              You can contribute to a pension plan to save for retirement. We
              match your contributions up to 5% of your basic annual salary.
            </p>
            <h3 className="mt-4 text-2xl font-bold text-secondary">
              Employee Stock Purchase Plan
            </h3>
            <p>
              You can purchase company stock at a discount through payroll
              deductions. You can contribute up to 10% of your basic annual
              salary.
            </p>
          </div>
          <div className="mt-8">
            <div className="flex items-center" id="work-life-balance">
              <PinkCalendar width={50} />
              <h2 className="text-4xl font-bold text-danger">
                Work Life Balance
              </h2>
            </div>
            <p>
              {clientData?.clientName} recognizes the importance of work-life
              balance. We offer a range of benefits to help you manage your work
              and personal life, reduce stress, and improve your overall
              well-being.
            </p>
            <h3 className="mt-4 text-2xl font-bold text-secondary">
              Vacation Days
            </h3>
            <p>
              You receive 20 vacation days per year, which increases to 25 days
              after five years of service.
            </p>
            <h3 className="mt-4 text-2xl font-bold text-secondary">
              Sick Days
            </h3>
            <p>
              You receive 10 sick days per year, which can be used for your own
              illness or to care for a sick family member.
            </p>
            <h3 className="mt-4 text-2xl font-bold text-secondary">
              Bereavement Leave
            </h3>
            <p>You receive three days of paid leave if a family member dies.</p>
          </div>
          <div className="mt-8">
            <div className="flex items-center" id="health-wellness">
              <PinkCalendar width={50} />
              <h2 className="text-4xl font-bold text-danger">
                Health & Wellness
              </h2>
            </div>
            <p>
              {clientData?.clientName} is committed to helping employees achieve
              and maintain good health. We offer a range of benefits to help you
              stay healthy, prevent illness, and manage chronic conditions.
            </p>
            <h3 className="mt-4 text-2xl font-bold text-secondary">
              Healthcare
            </h3>
            <p>
              You receive comprehensive medical, dental, and vision coverage for
              you and your family.
            </p>
          </div>
          <div className="mt-8">
            <div className="flex items-center" id="other-benefits">
              <PinkCalendar width={50} />
              <h2 className="text-4xl font-bold text-danger">Other Benefits</h2>
            </div>
            <p>
              {clientData?.clientName} offers a range of other benefits to help
              you and your family achieve financial security, maintain good
              health, and achieve work-life balance.
            </p>
            <h3 className="mt-4 text-2xl font-bold text-secondary">
              Employee Assistance Program
            </h3>
            <p>
              You have access to confidential counseling and support services to
              help you manage personal or work-related issues.
            </p>
          </div>
        </Container>
        <Footer />
      </main>
    </>
  );
}

type CustomButtonProps = {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string;
  link: string;
};

const CustomButton: React.FC<CustomButtonProps> = ({ Icon, text, link }) => {
  return (
    <Link href={link}>
      <button className="mx-2 flex w-60 flex-col items-center justify-center rounded bg-slate-200 px-4 py-2 hover:bg-primary-lt hover:text-white">
        <Icon width={100} />
        <span className="text-center text-2xl">{text}</span>
      </button>
    </Link>
  );
};
