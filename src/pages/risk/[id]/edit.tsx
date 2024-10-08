import Head from "next/head";
import Header from "~/components/Header";
import Container from "~/components/Container";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import Router, { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { DatePicker } from "~/components/DatePicker";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { CustomSelect } from "~/components/CustomSelect";

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

const currencies = ["CAD", "USD", "GBP", "AUD"];

const employeeContributionOptions = ["None", "Fully employee paid", "Other"];

const employerContributionOptions = ["None", "Fully Employer paid", "Other"];

const insurers = ["Canada Life", "Sun Life", "Manulife", "Great West Life"];

const intermediaryTypes = ["Broker", "Agent", "Consultant", "Other"];

const intermediaryRemunerationMethods = [
  "Flat Commission",
  "Flat Fee",
  "Other",
];

const salaryDefinitions = ["Annual Base Salary", "Monthly Base Salary"];

const intermediaryNames = [
  "Mercer Marsh Benefits",
  "Aon Hewitt",
  "Willis Towers Watson",
  "Gallagher",
  "Lockton",
  "Local Broker",
];

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
  const { data: sessionData } = useSession();

  const { data: countriesData } =
    api.country.getCountryRelationsByClientId.useQuery({
      clientId: sessionData?.user.activeClient ?? 0,
    });

  const countries = countriesData?.map((item) => item.country ?? "");

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
    // refresh and go back to the risk plan details page
    Router.push(`/risk/${idString}`).catch(console.error);
  };

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
                  {editableRiskPlanDetails.planName} Plan Details Editing
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
                          {countries && editableRiskPlanDetails && (
                            <CustomSelect
                              placeholder={"Select a country"}
                              options={countries}
                              value={editableRiskPlanDetails.country}
                              setValue={(value) => {
                                setEditableRiskPlanDetails({
                                  ...editableRiskPlanDetails,
                                  country: value,
                                });
                              }}
                            />
                          )}
                        </td>
                      </tr>
                      <tr className={planDetailsClass}>
                        <td className={tableClassBold}>Currency</td>
                        <td className={tableClass}>
                          <CustomSelect
                            placeholder={"Select a currency"}
                            options={currencies}
                            value={editableRiskPlanDetails.currency}
                            setValue={(value) => {
                              setEditableRiskPlanDetails({
                                ...editableRiskPlanDetails,
                                currency: value,
                              });
                            }}
                          />
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
                          <CustomSelect
                            placeholder="Select a coverage type"
                            options={coverageTypes}
                            value={editableRiskPlanDetails.coverageType}
                            setValue={(value) => {
                              setEditableRiskPlanDetails({
                                ...editableRiskPlanDetails,
                                coverageType: value,
                              });
                            }}
                          />
                        </td>
                      </tr>
                      <tr className={designDetailsClass}>
                        <td className={tableClassBold}>Eligibility</td>
                        <td className={tableClass}>
                          <CustomSelect
                            placeholder="Select an eligibility"
                            options={eligibility}
                            value={editableRiskPlanDetails.eligibility}
                            setValue={(value) => {
                              setEditableRiskPlanDetails({
                                ...editableRiskPlanDetails,
                                eligibility: value,
                              });
                            }}
                          />
                        </td>
                      </tr>
                      <tr className={designDetailsClass}>
                        <td className={tableClassBold}>Benefit Form</td>
                        <td className={tableClass}>
                          <CustomSelect
                            placeholder="Select a benefit form"
                            options={["Fixed Amount", "Salary Multiple"]}
                            value={editableRiskPlanDetails.coverageForm}
                            setValue={(value) => {
                              setEditableRiskPlanDetails({
                                ...editableRiskPlanDetails,
                                coverageForm: value,
                              });
                            }}
                          />
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
                              <span className="mr-2 mt-2">
                                {editableRiskPlanDetails.currency}{" "}
                              </span>
                              <EditInput
                                placeholder="Enter a fixed amount"
                                type="number"
                                value={
                                  editableRiskPlanDetails.coverageFixedAmount
                                }
                                onChange={(value) => {
                                  setEditableRiskPlanDetails({
                                    ...editableRiskPlanDetails,
                                    coverageFixedAmount: Number(value),
                                    coverageMultiple: 0,
                                  });
                                }}
                              />
                            </div>
                          )}
                          {editableRiskPlanDetails.coverageForm ===
                            "Salary Multiple" && (
                            <div className="flex">
                              <EditInput
                                placeholder="Enter a multiple"
                                type="number"
                                value={editableRiskPlanDetails.coverageMultiple}
                                width="w-16"
                                onChange={(value) => {
                                  setEditableRiskPlanDetails({
                                    ...editableRiskPlanDetails,
                                    coverageMultiple: Number(value),
                                    coverageFixedAmount: 0,
                                  });
                                }}
                              />
                              <p className="px-2 pt-2">x</p>
                              <CustomSelect
                                placeholder="Select a salary definition"
                                options={salaryDefinitions}
                                value={
                                  editableRiskPlanDetails.coverageMultipleDuration
                                }
                                setValue={(value) => {
                                  setEditableRiskPlanDetails({
                                    ...editableRiskPlanDetails,
                                    coverageMultipleDuration: value,
                                  });
                                }}
                              />
                            </div>
                          )}
                        </td>
                      </tr>
                      <tr className={designDetailsClass}>
                        <td className={tableClassBold}>Non-evidence Limit</td>
                        <td className={tableClass}>
                          <div className="flex">
                            <span className="mr-2 mt-2">
                              {editableRiskPlanDetails.currency}{" "}
                            </span>
                            <EditInput
                              placeholder="Enter a non-evidence limit"
                              type="number"
                              value={editableRiskPlanDetails.nonEvidenceLimit}
                              onChange={(value) => {
                                setEditableRiskPlanDetails({
                                  ...editableRiskPlanDetails,
                                  nonEvidenceLimit: Number(value),
                                });
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                      <tr className={designDetailsClass}>
                        <td className={tableClassBold}>Benefit Maximum</td>
                        <td className={tableClass}>
                          <div className="flex">
                            <span className="mr-2 mt-2">
                              {editableRiskPlanDetails.currency}{" "}
                            </span>
                            <EditInput
                              placeholder="Enter a benefit maximum"
                              type="number"
                              value={editableRiskPlanDetails.coverageMaximum}
                              onChange={(value) => {
                                setEditableRiskPlanDetails({
                                  ...editableRiskPlanDetails,
                                  coverageMaximum: Number(value),
                                });
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                      <tr className={designDetailsClass}>
                        <td className={tableClassBold}>
                          Employee Contribution
                        </td>
                        <td className={tableClass}>
                          <CustomSelect
                            placeholder="Select an option"
                            options={employeeContributionOptions}
                            value={editableRiskPlanDetails.employeeContribution}
                            setValue={(value) => {
                              setEditableRiskPlanDetails({
                                ...editableRiskPlanDetails,
                                employeeContribution: value,
                              });
                            }}
                          />
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
                          <CustomSelect
                            placeholder="Select an option"
                            options={employerContributionOptions}
                            value={editableRiskPlanDetails.employerContribution}
                            setValue={(value) => {
                              setEditableRiskPlanDetails({
                                ...editableRiskPlanDetails,
                                employerContribution: value,
                              });
                            }}
                          />
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
                          <CustomSelect
                            placeholder="Select an insurer"
                            options={insurers}
                            value={editableRiskPlanDetails.provider}
                            setValue={(value) => {
                              setEditableRiskPlanDetails({
                                ...editableRiskPlanDetails,
                                provider: value,
                              });
                            }}
                          />
                        </td>
                      </tr>
                      <tr className={financialDetailsClass}>
                        <td className={tableClassBold}>Policy Number</td>
                        <td className={tableClass}>
                          <EditInput
                            placeholder="Enter a policy number"
                            type="text"
                            value={editableRiskPlanDetails.policyNumber}
                            onChange={(value) => {
                              setEditableRiskPlanDetails({
                                ...editableRiskPlanDetails,
                                policyNumber: value,
                              });
                            }}
                          />
                        </td>
                      </tr>
                      <tr className={financialDetailsClass}>
                        <td className={tableClassBold}>Policy Period</td>
                        <td className={tableClass}>
                          <div className="flex">
                            <DatePicker
                              date={editableRiskPlanDetails.policyStartDate}
                              setDate={(date) => {
                                setEditableRiskPlanDetails({
                                  ...editableRiskPlanDetails,
                                  policyStartDate: date,
                                });
                              }}
                            />
                            <p className="mx-2 mt-2"> to </p>

                            <DatePicker
                              date={editableRiskPlanDetails.policyEndDate}
                              setDate={(date) => {
                                setEditableRiskPlanDetails({
                                  ...editableRiskPlanDetails,
                                  policyEndDate: date,
                                });
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                      <tr className={financialDetailsClass}>
                        <td className={tableClassBold}>Intermediaries</td>
                        <td className={tableClass}>
                          <CustomSelect
                            placeholder="Select a provider"
                            options={intermediaryTypes}
                            value={editableRiskPlanDetails.intermediaryType}
                            setValue={(value) => {
                              setEditableRiskPlanDetails({
                                ...editableRiskPlanDetails,
                                intermediaryType: value,
                              });
                            }}
                          />
                        </td>
                      </tr>
                      <tr className={financialDetailsClass}>
                        <td className={tableClassBold}>Intermediary</td>
                        <td className={tableClass}>
                          <CustomSelect
                            placeholder="Select an intermediary"
                            options={intermediaryNames}
                            value={editableRiskPlanDetails.intermediaryName}
                            setValue={(value) => {
                              setEditableRiskPlanDetails({
                                ...editableRiskPlanDetails,
                                intermediaryName: value,
                              });
                            }}
                          />
                        </td>
                      </tr>
                      <tr className={financialDetailsClass}>
                        <td className={tableClassBold}>Remuneration Method</td>
                        <td className={tableClass}>
                          <CustomSelect
                            placeholder="Select a method"
                            options={intermediaryRemunerationMethods}
                            value={
                              editableRiskPlanDetails.intermediaryRemunerationMethod
                            }
                            setValue={(value) => {
                              setEditableRiskPlanDetails({
                                ...editableRiskPlanDetails,
                                intermediaryRemunerationMethod: value,
                              });
                            }}
                          />
                        </td>
                      </tr>
                      <tr className={financialDetailsClass}>
                        <td className={tableClassBold}>Remuneration Amount</td>
                        <td className={tableClass}>
                          <div className="flex">
                            <EditInput
                              placeholder="Enter a commission"
                              width="w-16"
                              type="number"
                              value={
                                editableRiskPlanDetails.intermediaryRemunerationCommission
                              }
                              onChange={(value) => {
                                setEditableRiskPlanDetails({
                                  ...editableRiskPlanDetails,
                                  intermediaryRemunerationCommission:
                                    Number(value),
                                });
                              }}
                            />
                            <p className="pl-2 pt-2">% of premiums</p>
                          </div>
                        </td>
                      </tr>
                      <tr className={financialDetailsClass}>
                        <td className={tableClassBold}>Total Sum Insured</td>
                        <td className={tableClass}>
                          <div className="flex">
                            <span className="mr-2 mt-2">
                              {editableRiskPlanDetails.currency}{" "}
                            </span>
                            <EditInput
                              placeholder="Enter a total sum insured"
                              type="number"
                              value={editableRiskPlanDetails.totalSumInsured}
                              onChange={(value) => {
                                setEditableRiskPlanDetails({
                                  ...editableRiskPlanDetails,
                                  totalSumInsured: Number(value),
                                });
                              }}
                              width="w-48"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr className={financialDetailsClass}>
                        <td className={tableClassBold}>Total Premiums</td>
                        <td className={tableClass}>
                          <div className="flex">
                            <span className="mr-2 mt-2">
                              {editableRiskPlanDetails.currency}{" "}
                            </span>
                            <EditInput
                              placeholder="Enter a total premium"
                              type="number"
                              value={editableRiskPlanDetails.totalPremium}
                              onChange={(value) => {
                                setEditableRiskPlanDetails({
                                  ...editableRiskPlanDetails,
                                  totalPremium: Number(value),
                                });
                              }}
                              width="w-48"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr className={financialDetailsClass}>
                        <td className={tableClassBold}>Headcount</td>
                        <td className={tableClass}>
                          <EditInput
                            placeholder="Enter a headcount"
                            type="number"
                            value={editableRiskPlanDetails.headcount}
                            onChange={(value) => {
                              setEditableRiskPlanDetails({
                                ...editableRiskPlanDetails,
                                headcount: Number(value),
                              });
                            }}
                            width="w-60"
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
                          <Textarea
                            className="w-96"
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
                          <Textarea
                            className="w-96"
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
                          <Textarea
                            className="w-96"
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

type EditInputProps = {
  placeholder: string;
  type: string;
  value: string | number;
  onChange: (value: string) => void;
  width?: string;
};

const EditInput: React.FC<EditInputProps> = ({
  placeholder,
  type,
  value,
  onChange,
  width,
}) => {
  return (
    <Input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={width ?? "w-96"}
    />
  );
};
