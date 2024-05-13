import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTableCreator,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `benefitsphere_${name}`);

export const posts = createTable(
  "post",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    createdById: varchar("createdById", { length: 255 })
      .notNull()
      .references(() => users.id),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
  },
  (example) => ({
    createdByIdIdx: index("createdById_idx").on(example.createdById),
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const countries = createTable("country", {
  id: serial("id").primaryKey(),
  country: varchar("name", { length: 255 }),
  code: varchar("code", { length: 2 }),
});

export const countriesRelations = relations(countries, ({ many }) => ({
  countriesToClients: many(countriesToClients),
}));

export const countriesToClients = createTable("countriesToClients", {
  countryId: integer("country_id")
    .notNull()
    .references(() => countries.id),
  clientId: integer("client_id")
    .notNull()
    .references(() => clients.id),
});

export const countriesToClientsRelations = relations(
  countriesToClients,
  ({ one }) => ({
    countries: one(countries, {
      fields: [countriesToClients.countryId],
      references: [countries.id],
    }),
    client: one(clients, {
      fields: [countriesToClients.clientId],
      references: [clients.id],
    }),
  }),
);

export const users = createTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
  userRoleType: varchar("userRoleType", { length: 255 }).default("user"),
  activeClient: integer("activeClient").references(() => clients.id),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  usersToClients: many(usersToClients),
}));

export const accounts = createTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

export const clients = createTable("client", {
  id: serial("id").notNull().primaryKey(),
  clientName: varchar("clientName", { length: 255 }),
  industry: varchar("industry", { length: 255 }),
  baseCurrency: varchar("baseCurrency", { length: 3 }),
  url: varchar("url", { length: 255 }),
});

export const clientsRelations = relations(clients, ({ many }) => ({
  usersToClients: many(usersToClients),
  countriesToClients: many(countriesToClients),
  riskPlans: many(riskPlans),
}));

export const usersToClients = createTable("usersToClients", {
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => users.id),
  clientId: integer("client_id")
    .notNull()
    .references(() => clients.id),
});

export const usersToClientsRelations = relations(usersToClients, ({ one }) => ({
  user: one(users, { fields: [usersToClients.userId], references: [users.id] }),
  client: one(clients, {
    fields: [usersToClients.clientId],
    references: [clients.id],
  }),
}));

export const riskPlans = createTable("riskPlans", {
  id: serial("id").notNull().primaryKey(),
  clientId: integer("client_id")
    .notNull()
    .references(() => clients.id),
  planName: varchar("planName", { length: 255 }).notNull().default(""),
  country: varchar("country", { length: 255 }).notNull().default(""),
  currency: varchar("currency", { length: 3 }).notNull().default(""),
  groupPlanOffered: boolean("groupPlanOffered").notNull().default(false),
  eligibility: varchar("eligibility", { length: 255 }).notNull().default(""),
  coverageType: varchar("coverageType", { length: 255 }).notNull().default(""),
  coverageForm: varchar("coverageForm", { length: 255 }).notNull().default(""),
  coverageMultipleDuration: varchar("coverageMultipleDuration", {
    length: 255,
  })
    .notNull()
    .default(""),
  coverageMultiple: integer("coverageMultiple").notNull().default(0),
  coverageFixedAmount: integer("coverageFixedAmount").notNull().default(0),
  nonEvidenceLimit: integer("nonEvidenceLimit").notNull().default(0),
  coverageMaximum: integer("coverageMaximum").notNull().default(0),
  employeeContribution: varchar("employeeContribution", { length: 255 })
    .notNull()
    .default(""),
  employeeContributionOther: varchar("employeeContributionOther", {
    length: 255,
  })
    .notNull()
    .default(""),
  employerContribution: varchar("employerContribution", { length: 255 })
    .notNull()
    .default(""),
  employerContributionOther: varchar("employerContributionOther", {
    length: 255,
  })
    .notNull()
    .default(""),
  funding: boolean("funding").notNull().default(false),
  provider: varchar("provider", { length: 255 }).notNull().default(""),
  policyNumber: varchar("policyNumber", { length: 255 }).notNull().default(""),
  policyStartDate: timestamp("policyStartDate", { mode: "date" })
    .notNull()
    .default(sql`CURRENT_DATE`),
  policyEndDate: timestamp("policyEndDate", { mode: "date" })
    .notNull()
    .default(sql`CURRENT_DATE`),
  cancellationDuration: varchar("cancellationDuration", { length: 255 })
    .notNull()
    .default(""),
  intermediaryType: varchar("intermediaryType", { length: 255 })
    .notNull()
    .default(""),
  intermediaryName: varchar("intermediaryName", { length: 255 })
    .notNull()
    .default(""),
  intermediaryRemunerationMethod: varchar("intermediaryRemunerationMethod", {
    length: 255,
  })
    .notNull()
    .default(""),
  intermediaryRemunerationCommission: integer(
    "intermediaryRemunerationCommission",
  )
    .notNull()
    .default(0),
  intermediaryRemunerationFee: integer("intermediaryRemunerationFee")
    .notNull()
    .default(0),
  intermediaryRemunerationOther: varchar("intermediaryRemunerationOther", {
    length: 255,
  })
    .notNull()
    .default(""),
  cancellationAmount: integer("cancellationAmount").notNull().default(0),
  headcount: integer("headcount").notNull().default(0),
  totalSumInsured: integer("totalSumInsured").notNull().default(0),
  totalPremium: integer("totalPremium").notNull().default(0),
  invoicingDescription: varchar("invoicing", { length: 2000 })
    .notNull()
    .default(""),
  employeeEnrollmentDescription: varchar("employeeEnrollment", {
    length: 2000,
  })
    .notNull()
    .default(""),
  employeeTerminationDescription: varchar("employeeTermination", {
    length: 2000,
  })
    .notNull()
    .default(""),
  createdBy: varchar("createdBy", { length: 255 }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedBy: varchar("updatedBy", { length: 255 }),
  updatedAt: timestamp("updatedAt"),
  reviewedBy: varchar("reviewedBy", { length: 255 }),
  reviewedAt: timestamp("reviewedAt"),
});

export const riskPlansRelations = relations(riskPlans, ({ one }) => ({
  client: one(clients, {
    fields: [riskPlans.clientId],
    references: [clients.id],
  }),
}));
