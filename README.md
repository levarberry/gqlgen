🛠️ gqlgen CLI
============

A lightweight CLI tool for generating GraphQL schema file scaffolds for your Node.js / Nuxt.js projects.  
Inspired by Angular's `ng generate`, this tool helps you quickly scaffold out boilerplate files for new GraphQL entities.

---

🚀 Features
-----------

- Creates 4 scaffold files per entity:
  - `*.entity.graphql`
  - `*.inputs.graphql`
  - `*.queries.graphql`
  - `*.mutations.graphql`
- Organizes files in a clean folder structure
- Supports custom output paths
- Easy to install and use locally or globally

---

📦 Installation
---------------

### Option 1: Use Locally (recommended for internal projects)

    npm install -g @levarberry/gqlgen


---

🧪 Usage
--------

### Basic Usage

    gqlgen User

This will generate:

    src/schema/types/User/
      User.entity.graphql
      User.inputs.graphql
      User.queries.graphql
      User.mutations.graphql

---

### With Custom Output Path

    gqlgen Product --path=src/modules/product/graphql

This will generate:

    src/modules/product/graphql/Product/
      Product.entity.graphql
      Product.inputs.graphql
      Product.queries.graphql
      Product.mutations.graphql

---

📁 File Descriptions
--------------------

| File Name                   | Purpose                                  |
|----------------------------|------------------------------------------|
| `*.entity.graphql`         | GraphQL type definition for the entity   |
| `*.inputs.graphql`         | Input types for create/update mutations  |
| `*.mutations.graphql`      | Mutation definitions for the entity      |
| `*.queries.graphql`        | Query definitions for the entity         |

---

🧰 Example Output (for `User`)
------------------------------

    # User.entity.graphql
    type User {
      id: ID!
      name: String!
      createdAt: String
    }

    # User.inputs.graphql
    input CreateUserInput {
      name: String!
    }

    input UpdateUserInput {
      id: ID!
      name: String
    }

    # User.queries.graphql
    extend type Query {
      getUser(id: ID!): User
      listUsers: [User]
    }

    # User.mutations.graphql
    extend type Mutation {
      createUser(input: CreateUserInput!): User
      updateUser(input: UpdateUserInput!): User
      deleteUser(id: ID!): Boolean
    }

---

👩‍💻 Contributing
-----------------

Feel free to fork, contribute, or submit issues.

1. Clone the repo
2. Make your changes
3. Test locally using `npm link`
4. Open a PR!

---

📃 License
----------

RLB License,  R. Levar Berry gives you the power :)

---

🙌 Credits
----------

Created with ❤️ by Levar Berry for faster GraphQL dev.
