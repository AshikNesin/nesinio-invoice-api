const { buildSchema } = require('graphql');
// Construct a schema, using GraphQL schema language
const schema = buildSchema(`

type LineItem {
    id: ID!
    description: String
    unitAmount: Int
    quantity:Int
  }

  type Invoice {
    id: ID!
    number: String
    date: String
    dueDate: String
    status: String
    lineItems:[LineItem]
    notes: String
    customer:Customer
  }

  type Customer {
    id: ID!
    name: String
    email: String
    mobile: Int
    address: String
  }

  type Query {
    invoice(id:ID!):Invoice,
    invoices:[Invoice!]!,
    customers: [Customer!]!
    customer(id: ID!): Customer!
}




input LineItemInput {
    description: String!
    unitAmount: Int!
    quantity:Int!
}
input LineItemEditInput {
  id:ID
  description: String!
  unitAmount: Int!
  quantity:Int!
}

input CreateInvoiceInput {
    customerId: ID!
    lineItems:[LineItemInput]
}

input UpdateInvoiceInput {
  id: ID!
  lineItems:[LineItemEditInput]
}


type Mutation {
    createCustomer(name: String!, email: String, mobile: Int, address:String ): Customer!
    createInvoice(data:CreateInvoiceInput): Invoice!
    updateInvoice(data:UpdateInvoiceInput): Invoice!
}
`);

module.exports = schema;
