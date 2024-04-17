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
});

export const clientsRelations = relations(clients, ({ many }) => ({
  usersToClients: many(usersToClients),
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
  offered: boolean("offered").default(false),
  mandated: boolean("mandated").default(false),
  planName: varchar("planName", { length: 255 }),
  eligibility: varchar("eligibility", { length: 255 }),
  country: varchar("country", { length: 255 }),
  currency: varchar("currency", { length: 3 }),
  benefitType: varchar("benefitType", { length: 255 }),
  benefitForm: varchar("benefitForm", { length: 255 }),
  benefitMultiple: integer("benefitMultiple"),
  benefitMultipleDuration: varchar("benefitMultipleDuration", { length: 255 }),
  benefitFixedAmount: integer("benefitFixedAmount"),
  benefitMaximumAmount: integer("benefitMaximumAmount"),
  waitingPeriodDuration: varchar("waitingPeriodDuration", { length: 255 }),
  waitingPeriodAmount: integer("waitingPeriodAmount"),
  employeeContribution: varchar("employeeContribution", { length: 255 }),
  employeeCoshare: varchar("employeeCoshare", { length: 255 }),
  employerContribution: varchar("employerContribution", { length: 255 }),
  employerCoshare: varchar("employerCoshare", { length: 255 }),
  funding: boolean("funding").default(false),
  nonevidenceLimit: integer("nonevidenceLimit"),
  provider: varchar("provider", { length: 255 }),
  policyNumber: varchar("policyNumber", { length: 255 }),
  policyStartDate: timestamp("policyStartDate", { mode: "date" }),
  policyEndDate: timestamp("policyEndDate", { mode: "date" }),
  cancellationDuration: varchar("cancellationDuration", { length: 255 }),
  cancellationAmount: integer("cancellationAmount"),
  invoicing: varchar("invoicing", { length: 255 }),
  headcount: integer("headcount"),
  totalSumInsured: integer("totalSumInsured"),
  totalPremium: integer("totalPremium"),
});

export const riskPlansRelations = relations(riskPlans, ({ one }) => ({
  client: one(clients, {
    fields: [riskPlans.clientId],
    references: [clients.id],
  }),
}));
