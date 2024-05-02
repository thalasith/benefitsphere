import Head from "next/head";
import { useRouter } from "next/router";
import Header from "~/components/Header";
import Container from "~/components/Container";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import Router from "next/router";

const tableClass = "text-left pl-2 py-2";
const tableClassBold = "text-left pl-2 py-2 font-bold";
const planDetailsClass =
  "divide-x divide-white odd:bg-slate-100 even:bg-tertiary-lt";
const designDetailsClass =
  "divide-x divide-white odd:bg-slate-100 even:bg-secondary-lt";
const financialDetailsClass =
  "divide-x divide-white odd:bg-slate-100 even:bg-danger-lt";
const adminDetailsClass =
  "divide-x divide-white odd:bg-slate-100 even:bg-info-lt";

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

const countries = ["Canada", "USA", "UK", "Australia"];

const currencies = ["CAD", "USD", "GBP", "AUD"];

const employeeContributionOptions = ["None", "Fully employee paid", "Other"];

const employerContributionOptions = ["None", "Fully Employer paid", "Other"];

const insurers = ["Canada Life", "Sun Life", "Manulife", "Great West Life"];

export default function EditRiskPlan() {
  const [editableRiskPlanDetails, setEditableRiskPlanDetails] = useState({
    id: 0,
    clientId: 0,
    planName: "Test",
    country: "Test",
    currency: "",
    groupPlanOffered: false,
    eligibility: "",
    coverageType: "",
    coverageForm: "",
    coverageMultipleDuration: "",
    coverageMultiple: 0,
    coverageFixedAmount: 0,
    nonEvidenceLimit: 0,
    coverageMaximum: 0,
    employeeContribution: "",
    employeeContributionOther: "",
    employerContribution: "",
    employerContributionOther: "",
    funding: false,
    provider: "",
    policyNumber: "",
    policyStartDate: new Date(1632184260000),
    policyEndDate: new Date(1632184260000),
    cancellationDuration: "",
    cancellationAmount: 0,
    headcount: 0,
    totalSumInsured: 0,
    totalPremium: 0,
    invoicingDescription: "",
    employeeEnrollmentDescription: "",
    employeeTerminationDescription: "",
    intermediaryType: "",
    intermediaryName: "",
    intermediaryRemunerationMethod: "",
    intermediaryRemunerationCommission: 0,
    intermediaryRemunerationFee: 0,
    intermediaryRemunerationOther: "",
  });
  const { id } = useRouter().query;
  const idString = typeof id === "string" ? id : "";

  const { data: riskPlanDetails } =
    api.riskPlan.getRiskPlanDetailsById.useQuery({
      riskPlanId: Number(idString),
    });

  useEffect(() => {
    if (riskPlanDetails) {
      setEditableRiskPlanDetails(riskPlanDetails);
    }
  }, [riskPlanDetails]);
  const { mutate: riskPlanDetailsUpdate } =
    api.riskPlan.updateRiskPlanDetailsById.useMutation();

  const saveData = () => {
    if (editableRiskPlanDetails.id === 0) return;

    riskPlanDetailsUpdate(editableRiskPlanDetails);
    Router.push(`/risk/${idString}`).catch((err) => console.log(err));
  };

  console.log(editableRiskPlanDetails);

  return (
    <>
      <Head>
        <title>Benefitsphere - Edit Risk Benefit</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="text-primary">
        <Header />
        <Container>
          {editableRiskPlanDetails && (
            <div>
              <div className="flex justify-between">
                <h1 className="text-3xl font-bold">
                  Life Plan Details Editing
                </h1>
                <div>
                  <button
                    className="rounded-lg bg-primary px-4 py-1 text-lg font-bold text-white hover:bg-tertiary"
                    onClick={() => saveData()}
                  >
                    Save
                  </button>
                  <Link href={`/risk/${idString}`} className="pl-2">
                    <button className="rounded-lg bg-slate-500 px-4 py-1 text-lg font-bold text-white hover:bg-tertiary">
                      Cancel
                    </button>
                  </Link>
                </div>
              </div>
              <div className="ml-4">
                <div>
                  <h2 className="my-4 block text-xl font-semibold ">
                    Plan Information
                  </h2>
                  <table className="min-w-full divide-x divide-y divide-white ">
                    <thead>
                      <tr className="divide-x divide-white bg-primary text-white">
                        <th className="w-1/4 py-2 pl-2 text-left">Category</th>
                        <th className="w-3/4 py-2 pl-2 text-left">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className={planDetailsClass}>
                        <td className={tableClassBold}>Country</td>
                        <td className={tableClass}>
                          <select
                            className="w-1/5 rounded border border-slate-500"
                            onChange={(e) => {
                              setEditableRiskPlanDetails({
                                ...editableRiskPlanDetails,
                                country: e.target.value,
                              });
                            }}
                          >
                            {countries.map((item, idx) => (
                              <option
                                key={idx}
                                selected={
                                  item === editableRiskPlanDetails.country
                                }
                              >
                                {item}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                      <tr className={planDetailsClass}>
                        <td className={tableClassBold}>Currency</td>
                        <td className={tableClass}>
                          <select
                            className="w-1/5 rounded border border-slate-500"
                            onChange={(e) => {
                              setEditableRiskPlanDetails({
                                ...editableRiskPlanDetails,
                                currency: e.target.value,
                              });
                            }}
                          >
                            {currencies.map((item, idx) => (
                              <option
                                key={idx}
                                selected={
                                  item === editableRiskPlanDetails.currency
                                }
                              >
                                {item}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                      <tr className={planDetailsClass}>
                        <td className={tableClassBold}>
                          Is this a supplemental group benefit?
                        </td>
                        <td className={tableClass}>
                          <select className="w-1/5 rounded border border-slate-500">
                            <option>Yes</option>
                            <option>No</option>
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  <h2 className="my-4 block text-xl font-semibold text-secondary">
                    Design Details
                  </h2>
                  <table className="min-w-full divide-x divide-y divide-white ">
                    <thead>
                      <tr className="divide-x divide-white bg-secondary text-white">
                        <th className="w-1/4 py-2 pl-2 text-left">Category</th>
                        <th className="w-3/4 py-2 pl-2 text-left">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="divide-x divide-white bg-slate-100">
                        <td className={tableClassBold}>Coverage Type</td>
                        <td className={tableClass}>
                          <select
                            className="w-1/5 rounded border border-slate-500"
                            onChange={(e) => {
                              setEditableRiskPlanDetails({
                                ...editableRiskPlanDetails,
                                coverageType: e.target.value,
                              });
                            }}
                          >
                            <option
                              value=""
                              disabled
                              selected={
                                editableRiskPlanDetails.coverageType === ""
                              }
                            >
                              Select your option
                            </option>
                            {coverageTypes.map((item, idx) => (
                              <option
                                key={idx}
                                selected={
                                  item === editableRiskPlanDetails.coverageType
                                }
                              >
                                {item}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                      <tr className={designDetailsClass}>
                        <td className={tableClassBold}>Eligibility</td>
                        <td className={tableClass}>
                          <select
                            className="w-1/5 rounded border border-slate-500"
                            onChange={(e) => {
                              setEditableRiskPlanDetails({
                                ...editableRiskPlanDetails,
                                eligibility: e.target.value,
                              });
                            }}
                          >
                            <option
                              value=""
                              disabled
                              selected={
                                editableRiskPlanDetails.eligibility === ""
                              }
                            >
                              Select an option
                            </option>
                            {eligibility.map((item, idx) => (
                              <option key={idx}>{item}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                      <tr className={designDetailsClass}>
                        <td className={tableClassBold}>Benefit Form</td>
                        <td className={tableClass}>
                          <select
                            className="w-1/5 rounded border border-slate-500"
                            onChange={(e) => {
                              setEditableRiskPlanDetails({
                                ...editableRiskPlanDetails,
                                coverageForm: e.target.value,
                              });
                            }}
                          >
                            <option
                              value=""
                              disabled
                              selected={
                                editableRiskPlanDetails.coverageForm === ""
                              }
                            >
                              Select an option
                            </option>
                            <option
                              selected={
                                "Fixed Amount" ===
                                editableRiskPlanDetails.coverageForm
                              }
                            >
                              Fixed Amount
                            </option>
                            <option
                              selected={
                                "Salary Multiple" ===
                                editableRiskPlanDetails.coverageForm
                              }
                            >
                              Salary Multiple
                            </option>
                          </select>
                        </td>
                      </tr>
                      <tr className={designDetailsClass}>
                        <td className={tableClassBold}>Benefit Description</td>
                        <td className={tableClass}>
                          {editableRiskPlanDetails.coverageForm === "" && (
                            <div className="flex">
                              Please choose a benefit form first!
                            </div>
                          )}
                          {editableRiskPlanDetails.coverageForm ===
                            "Fixed Amount" && (
                            <div className="flex">
                              <input
                                type="number"
                                className="rounded border border-slate-500 px-1 py-0.5"
                                value={
                                  editableRiskPlanDetails.coverageFixedAmount
                                }
                                onChange={(e) => {
                                  setEditableRiskPlanDetails({
                                    ...editableRiskPlanDetails,
                                    coverageFixedAmount: Number(e.target.value),
                                    coverageMultiple: 0,
                                    coverageMultipleDuration: "",
                                  });
                                }}
                              />
                            </div>
                          )}
                          {editableRiskPlanDetails.coverageForm ===
                            "Salary Multiple" && (
                            <div className="flex">
                              <input
                                type="number"
                                className="w-12 rounded border border-slate-500 px-1 py-0.5"
                                value={editableRiskPlanDetails.coverageMultiple}
                                onChange={(e) => {
                                  setEditableRiskPlanDetails({
                                    ...editableRiskPlanDetails,
                                    coverageMultiple: Number(e.target.value),
                                    coverageFixedAmount: 0,
                                  });
                                }}
                              />
                              <p className="ml-2">x</p>
                              <select
                                className="ml-2 w-1/5 rounded border border-slate-500 py-0.5"
                                onChange={(e) => {
                                  setEditableRiskPlanDetails({
                                    ...editableRiskPlanDetails,
                                    coverageMultipleDuration: e.target.value,
                                  });
                                }}
                              >
                                <option
                                  selected={
                                    editableRiskPlanDetails.coverageMultipleDuration ===
                                    "Annual Base Salary"
                                  }
                                >
                                  Annual Base Salary
                                </option>
                                <option
                                  selected={
                                    editableRiskPlanDetails.coverageMultipleDuration ===
                                    "Monthly Base Salary"
                                  }
                                >
                                  Monthly Base Salary
                                </option>
                              </select>{" "}
                            </div>
                          )}
                        </td>
                      </tr>
                      <tr className={designDetailsClass}>
                        <td className={tableClassBold}>Non-evidence Limit</td>
                        <td className={tableClass}>
                          CAD{" "}
                          <input
                            type="number"
                            className="rounded border border-slate-500 px-1 py-0.5"
                            value={editableRiskPlanDetails.nonEvidenceLimit}
                            onChange={(e) => {
                              setEditableRiskPlanDetails({
                                ...editableRiskPlanDetails,
                                nonEvidenceLimit: Number(e.target.value),
                              });
                            }}
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
                            value={editableRiskPlanDetails.coverageMaximum}
                            onChange={(e) => {
                              setEditableRiskPlanDetails({
                                ...editableRiskPlanDetails,
                                coverageMaximum: Number(e.target.value),
                              });
                            }}
                          />
                        </td>
                      </tr>
                      <tr className={designDetailsClass}>
                        <td className={tableClassBold}>
                          Employee Contribution
                        </td>
                        <td className={tableClass}>
                          <select
                            className="w-1/5 rounded border border-slate-500"
                            onChange={(e) => {
                              setEditableRiskPlanDetails({
                                ...editableRiskPlanDetails,
                                employeeContribution: e.target.value,
                              });
                            }}
                          >
                            <option
                              value=""
                              disabled
                              selected={
                                editableRiskPlanDetails.employeeContribution ===
                                ""
                              }
                            >
                              Select an option
                            </option>
                            {employeeContributionOptions.map((item, idx) => (
                              <option
                                key={idx}
                                selected={
                                  item ===
                                  editableRiskPlanDetails.employeeContribution
                                }
                              >
                                {item}
                              </option>
                            ))}
                          </select>
                          {editableRiskPlanDetails.employeeContribution ===
                            "Other" && (
                            <input
                              type="text"
                              className="mx-4 w-3/5 rounded border border-slate-500 pl-2"
                              value={
                                editableRiskPlanDetails.employeeContributionOther
                              }
                              onChange={(e) => {
                                setEditableRiskPlanDetails({
                                  ...editableRiskPlanDetails,
                                  employeeContributionOther: e.target.value,
                                });
                              }}
                            />
                          )}
                        </td>
                      </tr>
                      <tr className={designDetailsClass}>
                        <td className={tableClassBold}>
                          Employer Contribution
                        </td>
                        <td className={tableClass}>
                          <select
                            className="w-1/5 rounded border border-slate-500"
                            onChange={(e) => {
                              setEditableRiskPlanDetails({
                                ...editableRiskPlanDetails,
                                employerContribution: e.target.value,
                              });
                            }}
                          >
                            <option
                              value=""
                              disabled
                              selected={
                                editableRiskPlanDetails.employerContribution ===
                                ""
                              }
                            >
                              Select an option
                            </option>
                            {employerContributionOptions.map((item, idx) => (
                              <option
                                key={idx}
                                selected={
                                  item ===
                                  editableRiskPlanDetails.employerContribution
                                }
                              >
                                {item}
                              </option>
                            ))}
                          </select>
                          {editableRiskPlanDetails.employerContribution ===
                            "Other" && (
                            <input
                              type="text"
                              className="mx-4 w-3/5 rounded border border-slate-500 pl-2"
                              value={
                                editableRiskPlanDetails.employerContributionOther
                              }
                              onChange={(e) => {
                                setEditableRiskPlanDetails({
                                  ...editableRiskPlanDetails,
                                  employerContributionOther: e.target.value,
                                });
                              }}
                            />
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  <h2 className="my-4 block text-xl font-semibold text-danger ">
                    Financial Details
                  </h2>
                  <table className="min-w-full divide-x divide-y divide-white ">
                    <thead>
                      <tr className="divide-x divide-white bg-danger text-white">
                        <th className="w-1/4 py-2 pl-2 text-left">Category</th>
                        <th className="w-3/4 py-2 pl-2 text-left">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className={financialDetailsClass}>
                        <td className={tableClassBold}>Insurer</td>
                        <td className={tableClass}>
                          <select
                            className="w-1/5 rounded border border-slate-500"
                            value={editableRiskPlanDetails.provider}
                            onChange={(e) => {
                              setEditableRiskPlanDetails({
                                ...editableRiskPlanDetails,
                                provider: e.target.value,
                              });
                            }}
                          >
                            <option
                              value=""
                              disabled
                              selected={editableRiskPlanDetails.provider === ""}
                            >
                              Select a provider
                            </option>
                            {insurers.map((item, idx) => (
                              <option key={idx}>{item}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                      <tr className={financialDetailsClass}>
                        <td className={tableClassBold}>Policy Number</td>
                        <td className={tableClass}>
                          <input
                            type="text"
                            className="w-2/5 rounded border border-slate-500 pl-2"
                            value={editableRiskPlanDetails.policyNumber}
                            onChange={(e) => {
                              setEditableRiskPlanDetails({
                                ...editableRiskPlanDetails,
                                policyNumber: e.target.value,
                              });
                            }}
                          />
                        </td>
                      </tr>
                      <tr className={financialDetailsClass}>
                        <td className={tableClassBold}>Policy Period</td>
                        <td className={tableClass}>
                          <div className="flex">
                            <input
                              type="date"
                              className="rounded border border-slate-500 pl-2"
                            />
                            <p className="mx-2">to</p>
                            <input
                              type="date"
                              className="rounded border border-slate-500 pl-2"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr className={financialDetailsClass}>
                        <td className={tableClassBold}>Intermediaries</td>
                        <td className={tableClass}>
                          <select
                            className="w-1/5 rounded border border-slate-500"
                            value={editableRiskPlanDetails.intermediaryType}
                            onChange={(e) => {
                              setEditableRiskPlanDetails({
                                ...editableRiskPlanDetails,
                                intermediaryType: e.target.value,
                              });
                            }}
                          >
                            <option>Broker</option>
                            <option>Agent</option>
                            <option>Consultant</option>
                            <option>Other</option>
                          </select>
                        </td>
                      </tr>
                      <tr className={financialDetailsClass}>
                        <td className={tableClassBold}>Intermediary</td>
                        <td className={tableClass}>
                          <input
                            type="text"
                            className="w-2/5 rounded border border-slate-500 pl-2"
                            value={editableRiskPlanDetails.intermediaryName}
                            onChange={(e) => {
                              setEditableRiskPlanDetails({
                                ...editableRiskPlanDetails,
                                intermediaryName: e.target.value,
                              });
                            }}
                          />
                        </td>
                      </tr>
                      <tr className={financialDetailsClass}>
                        <td className={tableClassBold}>Remuneration Method</td>
                        <td className={tableClass}>
                          <select
                            className="w-1/5 rounded border border-slate-500"
                            value={
                              editableRiskPlanDetails.intermediaryRemunerationMethod
                            }
                            onChange={(e) => {
                              setEditableRiskPlanDetails({
                                ...editableRiskPlanDetails,
                                intermediaryRemunerationMethod: e.target.value,
                              });
                            }}
                          >
                            <option>Flat Commission</option>
                            <option>Flat Fee</option>
                            <option>Other</option>
                          </select>
                        </td>
                      </tr>
                      <tr className={financialDetailsClass}>
                        <td className={tableClassBold}>Remuneration Amount</td>
                        <td className={tableClass}>
                          <div className="flex">
                            <input
                              type="number"
                              className="w-12 rounded border border-slate-500 pl-2"
                              value={
                                editableRiskPlanDetails.intermediaryRemunerationCommission
                              }
                              onChange={(e) => {
                                setEditableRiskPlanDetails({
                                  ...editableRiskPlanDetails,
                                  intermediaryRemunerationCommission: Number(
                                    e.target.value,
                                  ),
                                });
                              }}
                            />{" "}
                            <p className="pl-2">% of premiums</p>
                          </div>
                        </td>
                      </tr>
                      <tr className={financialDetailsClass}>
                        <td className={tableClassBold}>Total Sum Insured</td>
                        <td className={tableClass}>
                          CAD{" "}
                          <input
                            type="number"
                            className="rounded border border-slate-500 pl-2"
                            value={editableRiskPlanDetails.totalSumInsured}
                            onChange={(e) => {
                              setEditableRiskPlanDetails({
                                ...editableRiskPlanDetails,
                                totalSumInsured: Number(e.target.value),
                              });
                            }}
                          />
                        </td>
                      </tr>
                      <tr className={financialDetailsClass}>
                        <td className={tableClassBold}>Total Premiums</td>
                        <td className={tableClass}>
                          CAD{" "}
                          <input
                            type="number"
                            className="rounded border border-slate-500 pl-2"
                            value={editableRiskPlanDetails.totalPremium}
                            onChange={(e) => {
                              setEditableRiskPlanDetails({
                                ...editableRiskPlanDetails,
                                totalPremium: Number(e.target.value),
                              });
                            }}
                          />
                        </td>
                      </tr>
                      <tr className={financialDetailsClass}>
                        <td className={tableClassBold}>Headcount</td>
                        <td className={tableClass}>
                          <input
                            type="number"
                            className="rounded border border-slate-500 pl-2"
                            value={editableRiskPlanDetails.headcount}
                            onChange={(e) => {
                              setEditableRiskPlanDetails({
                                ...editableRiskPlanDetails,
                                headcount: Number(e.target.value),
                              });
                            }}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  <h2 className="my-4 block text-xl font-semibold text-info ">
                    Administration Details
                  </h2>
                  <table className="min-w-full divide-x divide-y divide-white ">
                    <thead>
                      <tr className="divide-x divide-white bg-info text-white">
                        <th className="w-1/4 py-2 pl-2 text-left">Category</th>
                        <th className="w-3/4 py-2 pl-2 text-left">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className={adminDetailsClass}>
                        <td className={tableClassBold}>
                          Policy Cancellation Period
                        </td>
                        <td className={tableClass}>3 months</td>
                      </tr>
                      <tr className={adminDetailsClass}>
                        <td className={tableClassBold}>Invoicing</td>
                        <td className={tableClass}>
                          <textarea
                            className="w-3/5 rounded border border-slate-500 pl-2"
                            rows={3}
                            value={editableRiskPlanDetails.invoicingDescription}
                            onChange={(e) => {
                              setEditableRiskPlanDetails({
                                ...editableRiskPlanDetails,
                                invoicingDescription: e.target.value,
                              });
                            }}
                          />
                        </td>
                      </tr>
                      <tr className={adminDetailsClass}>
                        <td className={tableClassBold}>Employee Enrollment</td>
                        <td className={tableClass}>
                          <textarea
                            className="w-3/5 rounded border border-slate-500 pl-2"
                            rows={3}
                            value={
                              editableRiskPlanDetails.employeeEnrollmentDescription
                            }
                            onChange={(e) => {
                              setEditableRiskPlanDetails({
                                ...editableRiskPlanDetails,
                                employeeEnrollmentDescription: e.target.value,
                              });
                            }}
                          />
                        </td>
                      </tr>
                      <tr className={adminDetailsClass}>
                        <td className={tableClassBold}>Employee Termination</td>
                        <td className={tableClass}>
                          <textarea
                            className="w-3/5 rounded border border-slate-500 pl-2"
                            rows={3}
                            value={
                              editableRiskPlanDetails.employeeTerminationDescription
                            }
                            onChange={(e) => {
                              setEditableRiskPlanDetails({
                                ...editableRiskPlanDetails,
                                employeeTerminationDescription: e.target.value,
                              });
                            }}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </Container>
      </main>
    </>
  );
}
