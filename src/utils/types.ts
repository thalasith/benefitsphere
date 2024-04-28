// start writing types for life

// Path: src/utils/types.ts

export type Client = {
  id: string;
  clientName: string;
  industry: string;
  baseCurrency: string;
};

export type RiskBenefit = {
  id: number;
  clientId: number;
  planName: string;
  country: string;
  currency: string;
  groupPlanOffered: boolean | null;
  eligibility: string | null;
  coverageType: string | null;
  coverageForm: string | null;
  coverageMultipleDuration: string | null;
  coverageMultiple: number | null;
  coverageFixedAmount: number | null;
  nonEvidenceLimit: number | null;
  coverageMaximum: number | null;
  employeeContribution: string | null;
  employeeContributionOther: string | null;
  employerContribution: string | null;
  employerContributionOther: string | null;
  funding: boolean | null;
  provider: string | null;
  policyNumber: string | null;
  policyStartDate: Date | null;
  policyEndDate: Date | null;
  cancellationDuration: string | null;
  cancellationAmount: number | null;
  headcount: number | null;
  totalSumInsured: number | null;
  totalPremium: number | null;
  invoicingDescription: string | null;
  employeeEnrollmentDescription: string | null;
  employeeTerminationDescription: string | null;
};
