import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Header from "~/components/Header";
import Container from "~/components/Container";
import { api } from "~/utils/api";

const tableClass = "text-left pl-2 py-2";
const tableClassBold = "text-left pl-2 py-2 font-bold";
const designDetailsClass =
  "divide-x divide-white odd:bg-slate-100 even:bg-tertiary-lt";
const financialDetailsClass =
  "divide-x divide-white odd:bg-slate-100 even:bg-danger-lt";
const adminDetailsClass =
  "divide-x divide-white odd:bg-slate-100 even:bg-info-lt";

export default function Dashboard() {
  const [editMode, setEditMode] = useState(false);
  const { data: sessionData, status } = useSession();
  const { id } = useRouter().query;
  const idString = typeof id === "string" ? id : "";

  console.log(editMode);

  const { data: riskPlanDetails } =
    api.riskPlan.getRiskPlanDetailsById.useQuery({
      riskPlanId: Number(idString),
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
        {editMode ? (
          <EditMode setEditMode={setEditMode} />
        ) : (
          <ViewMode setEditMode={setEditMode} />
        )}
      </main>
    </>
  );
}

interface EditModeProps {
  setEditMode: (value: boolean) => void;
}

const coverageTypes = [
  "Life",
  "Accidental Death and Dismemberment",
  "Total and Permanent Disability",
];

const eligibility = [
  "All Employees",
  "Sales",
  "Manufacturing",
  "Hourly",
  "Salaried",
  "Professional",
  "Management",
  "Executives",
];

const employeeContributionOptions = ["None", "Fully employee paid", "Other"];

const employerContributionOptions = ["None", "Fully Employer paid", "Other"];

const insurers = ["Canada Life", "Sun Life", "Manulife", "Great West Life"];

const EditMode: React.FC<EditModeProps> = ({ setEditMode }) => {
  return (
    <Container>
      <div>
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold">Life Plan Details Editing</h1>
          <button
            className="bg-primary hover:bg-tertiary rounded-lg px-4 py-1 text-lg font-bold text-white"
            onClick={() => setEditMode(false)}
          >
            Edit
          </button>
        </div>
        <div className="ml-4">
          <div>
            <h2 className="my-4 block text-xl font-semibold ">
              Design Details
            </h2>
            <table className="min-w-full divide-x divide-y divide-white ">
              <thead>
                <tr className="bg-primary divide-x divide-white text-white">
                  <th className="w-1/4 py-2 pl-2 text-left">Category</th>
                  <th className="w-3/4 py-2 pl-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="divide-x divide-white bg-slate-100">
                  <td className={tableClassBold}>Coverage Type</td>
                  <td className={tableClass}>
                    <select className="w-1/5 rounded border border-slate-500">
                      {coverageTypes.map((item, idx) => (
                        <option key={idx}>{item}</option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr className={designDetailsClass}>
                  <td className={tableClassBold}>Eligibility</td>
                  <td className={tableClass}>
                    <select className="w-1/5 rounded border border-slate-500">
                      {eligibility.map((item, idx) => (
                        <option key={idx}>{item}</option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr className={designDetailsClass}>
                  <td className={tableClassBold}>Benefit Form</td>
                  <td className={tableClass}>
                    <select className="w-1/5 rounded border border-slate-500">
                      <option>Fixed Amount</option>
                      <option>Salary Multiple</option>
                    </select>
                  </td>
                </tr>
                <tr className={designDetailsClass}>
                  <td className={tableClassBold}>Benefit Description</td>
                  <td className={tableClass}>
                    <input
                      type="number"
                      className="w-12 rounded border border-slate-500 px-1 py-0.5"
                    />
                    <select className="ml-4 w-1/5 rounded border border-slate-500 py-0.5">
                      <option>Annual Base Salary</option>
                      <option>Monthly Base Salary</option>
                    </select>{" "}
                  </td>
                </tr>
                <tr className={designDetailsClass}>
                  <td className={tableClassBold}>Non-evidence Limit</td>
                  <td className={tableClass}>
                    CAD{" "}
                    <input
                      type="number"
                      className="rounded border border-slate-500 px-1 py-0.5"
                    />
                  </td>
                </tr>
                <tr className={designDetailsClass}>
                  <td className={tableClassBold}>Benefit Maximum</td>
                  <td className={tableClass}>
                    CAD{" "}
                    <input
                      type="number"
                      className="rounded border border-slate-500 px-1 py-0.5"
                    />
                  </td>
                </tr>
                <tr className={designDetailsClass}>
                  <td className={tableClassBold}>Employee Contribution</td>
                  <td className={tableClass}>
                    <select className="w-1/5 rounded border border-slate-500">
                      {employeeContributionOptions.map((item, idx) => (
                        <option key={idx}>{item}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      className="mx-4 w-3/5 rounded border border-slate-500 pl-2"
                    />
                  </td>
                </tr>
                <tr className={designDetailsClass}>
                  <td className={tableClassBold}>Employer Contribution</td>
                  <td className={tableClass}>
                    <select className="w-1/5 rounded border border-slate-500">
                      {employerContributionOptions.map((item, idx) => (
                        <option key={idx}>{item}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h2 className="text-danger my-4 block text-xl font-semibold ">
              Financial Details
            </h2>
            <table className="min-w-full divide-x divide-y divide-white ">
              <thead>
                <tr className="bg-danger divide-x divide-white text-white">
                  <th className="w-1/4 py-2 pl-2 text-left">Category</th>
                  <th className="w-3/4 py-2 pl-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className={financialDetailsClass}>
                  <td className={tableClassBold}>Insurer</td>
                  <td className={tableClass}>Canada Life</td>
                </tr>
                <tr className={financialDetailsClass}>
                  <td className={tableClassBold}>Policy Number</td>
                  <td className={tableClass}>123456</td>
                </tr>
                <tr className={financialDetailsClass}>
                  <td className={tableClassBold}>Renewal Frequency</td>
                  <td className={tableClass}>Annual</td>
                </tr>
                <tr className={financialDetailsClass}>
                  <td className={tableClassBold}>Next Renewal Date</td>
                  <td className={tableClass}>Jan 1, 2025</td>
                </tr>
                <tr className={financialDetailsClass}>
                  <td className={tableClassBold}>Intermediaries</td>
                  <td className={tableClass}>Broker</td>
                </tr>
                <tr className={financialDetailsClass}>
                  <td className={tableClassBold}>Intermediary</td>
                  <td className={tableClass}>Mercer Marsh Benefits</td>
                </tr>
                <tr className={financialDetailsClass}>
                  <td className={tableClassBold}>Remuneration Method</td>
                  <td className={tableClass}>Commissions</td>
                </tr>
                <tr className={financialDetailsClass}>
                  <td className={tableClassBold}>Remuneration Amount</td>
                  <td className={tableClass}>10% of premiums</td>
                </tr>
                <tr className={financialDetailsClass}>
                  <td className={tableClassBold}>Total Sum Insured</td>
                  <td className={tableClass}>5,000,000</td>
                </tr>
                <tr className={financialDetailsClass}>
                  <td className={tableClassBold}>Total Premiums</td>
                  <td className={tableClass}>CAD 20,0000</td>
                </tr>
                <tr className={financialDetailsClass}>
                  <td className={tableClassBold}>Headcount</td>
                  <td className={tableClass}>400</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h2 className="text-info my-4 block text-xl font-semibold ">
              Administration Details
            </h2>
            <table className="min-w-full divide-x divide-y divide-white ">
              <thead>
                <tr className="bg-info divide-x divide-white text-white">
                  <th className="w-1/4 py-2 pl-2 text-left">Category</th>
                  <th className="w-3/4 py-2 pl-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className={adminDetailsClass}>
                  <td className={tableClassBold}>Invoicing</td>
                  <td className={tableClass}>Quarterly</td>
                </tr>
                <tr className={adminDetailsClass}>
                  <td className={tableClassBold}>Cancellation Period</td>
                  <td className={tableClass}>3 months</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Container>
  );
};

interface ViewModeProps {
  setEditMode: (value: boolean) => void;
}

const ViewMode: React.FC<ViewModeProps> = ({ setEditMode }) => {
  return (
    <Container>
      <div>
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold">Life Plan Details</h1>
          <button
            className="bg-primary hover:bg-tertiary rounded-lg px-4 py-1 text-lg font-bold text-white"
            onClick={() => setEditMode(true)}
          >
            Edit
          </button>
        </div>
        <div className="ml-4">
          <div>
            <h2 className="my-4 block text-xl font-semibold ">
              Design Details
            </h2>
            <table className="min-w-full divide-x divide-y divide-white ">
              <thead>
                <tr className="bg-primary divide-x divide-white text-white">
                  <th className="w-1/4 py-2 pl-2 text-left">Category</th>
                  <th className="w-3/4 py-2 pl-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="divide-x divide-white bg-slate-100">
                  <td className={tableClassBold}>Coverage Type</td>
                  <td className={tableClass}>Life</td>
                </tr>
                <tr className="bg-tertiary-lt divide-x divide-white">
                  <td className={tableClassBold}>Eligibility</td>
                  <td className={tableClass}>All Employees</td>
                </tr>
                <tr className="divide-x divide-white bg-slate-100">
                  <td className={tableClassBold}>Benefit Description</td>
                  <td className={tableClass}>3 x annual salary</td>
                </tr>
                <tr className="bg-tertiary-lt divide-x divide-white">
                  <td className={tableClassBold}>Non-evidence Limit</td>
                  <td className={tableClass}>CAD 200,000</td>
                </tr>
                <tr className="divide-x divide-white bg-slate-100">
                  <td className={tableClassBold}>Benefit Maximum</td>
                  <td className={tableClass}>CAD 500,000</td>
                </tr>
                <tr className="bg-tertiary-lt divide-x divide-white">
                  <td className={tableClassBold}>Employee Contribution</td>
                  <td className={tableClass}>No contribution required.</td>
                </tr>
                <tr className="divide-x divide-white bg-slate-100">
                  <td className={tableClassBold}>Employer Contribution</td>
                  <td className={tableClass}>100% Employee paid.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h2 className="text-danger my-4 block text-xl font-semibold ">
              Financial Details
            </h2>
            <table className="min-w-full divide-x divide-y divide-white ">
              <thead>
                <tr className="bg-danger divide-x divide-white text-white">
                  <th className="w-1/4 py-2 pl-2 text-left">Category</th>
                  <th className="w-3/4 py-2 pl-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="divide-x divide-white bg-slate-100">
                  <td className={tableClassBold}>Insurer</td>
                  <td className={tableClass}>Canada Life</td>
                </tr>
                <tr className="bg-danger-lt divide-x divide-white">
                  <td className={tableClassBold}>Policy Number</td>
                  <td className={tableClass}>123456</td>
                </tr>
                <tr className="divide-x divide-white bg-slate-100">
                  <td className={tableClassBold}>Renewal Frequency</td>
                  <td className={tableClass}>Annual</td>
                </tr>
                <tr className="bg-danger-lt divide-x divide-white">
                  <td className={tableClassBold}>Next Renewal Date</td>
                  <td className={tableClass}>Jan 1, 2025</td>
                </tr>
                <tr className="divide-x divide-white bg-slate-100">
                  <td className={tableClassBold}>Intermediaries</td>
                  <td className={tableClass}>Broker</td>
                </tr>
                <tr className="bg-danger-lt divide-x divide-white">
                  <td className={tableClassBold}>Intermediary</td>
                  <td className={tableClass}>Mercer Marsh Benefits</td>
                </tr>
                <tr className="divide-x divide-white bg-slate-100">
                  <td className={tableClassBold}>Remuneration Method</td>
                  <td className={tableClass}>Commissions</td>
                </tr>
                <tr className="bg-danger-lt divide-x divide-white">
                  <td className={tableClassBold}>Remuneration Amount</td>
                  <td className={tableClass}>10% of premiums</td>
                </tr>
                <tr className="divide-x divide-white bg-slate-100">
                  <td className={tableClassBold}>Total Sum Insured</td>
                  <td className={tableClass}>5,000,000</td>
                </tr>
                <tr className="bg-danger-lt divide-x divide-white">
                  <td className={tableClassBold}>Total Premiums</td>
                  <td className={tableClass}>CAD 20,0000</td>
                </tr>
                <tr className="divide-x divide-white bg-slate-100">
                  <td className={tableClassBold}>Headcount</td>
                  <td className={tableClass}>400</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h2 className="text-info my-4 block text-xl font-semibold ">
              Administration Details
            </h2>
            <table className="min-w-full divide-x divide-y divide-white ">
              <thead>
                <tr className="bg-info divide-x divide-white text-white">
                  <th className="w-1/4 py-2 pl-2 text-left">Category</th>
                  <th className="w-3/4 py-2 pl-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="divide-x divide-white bg-slate-100">
                  <td className={tableClassBold}>Invoicing</td>
                  <td className={tableClass}>Quarterly</td>
                </tr>
                <tr className="bg-info-lt divide-x divide-white">
                  <td className={tableClassBold}>Cancellation Period</td>
                  <td className={tableClass}>3 months</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Container>
  );
};
