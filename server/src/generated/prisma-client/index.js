"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "Team",
    embedded: false
  },
  {
    name: "Visit",
    embedded: false
  },
  {
    name: "Hotel",
    embedded: false
  },
  {
    name: "Sector",
    embedded: false
  },
  {
    name: "Shift",
    embedded: false
  },
  {
    name: "Schedule",
    embedded: false
  },
  {
    name: "Resident",
    embedded: false
  },
  {
    name: "Role",
    embedded: false
  },
  {
    name: "MutationType",
    embedded: false
  },
  {
    name: "VisitStatus",
    embedded: false
  },
  {
    name: "Gender",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `${process.env["PRISMA_ENDPOINT"]}`,
  secret: `${process.env["PRISMA_SECRET"]}`
});
exports.prisma = new exports.Prisma();
