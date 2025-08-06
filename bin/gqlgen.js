#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Parse command line args
const args = process.argv.slice(2);
const entityName = args[0];

// Parse options like --path=...
const options = {};
args.slice(1).forEach(arg => {
  const [key, value] = arg.replace(/^--/, '').split('=');
  options[key] = value;
});

if (!entityName) {
  console.error('❌ Please provide an entity name.');
  console.error('Usage: gqlgen <EntityName> [--path=src/schema/types]');
  process.exit(1);
}

const pascalCase = entityName.charAt(0).toUpperCase() + entityName.slice(1);

// Default path if none provided
const targetPath = options.path
  ? path.join(process.cwd(), options.path, pascalCase)
  : path.join(process.cwd(), 'src', 'schema', 'types', pascalCase);

// Ensure directory exists
if (!fs.existsSync(targetPath)) {
  fs.mkdirSync(targetPath, { recursive: true });
}

// Template files
const templates = {
  [`${pascalCase}.entity.graphql`]: `type ${pascalCase} {
  id: ID!
  name: String!
  createdAt: String
}
`,

  [`${pascalCase}.inputs.graphql`]: `input Create${pascalCase}Input {
  name: String!
}

input Update${pascalCase}Input {
  id: ID!
  name: String
}
`,

  [`${pascalCase}.mutations.graphql`]: `extend type Mutation {
  create${pascalCase}(input: Create${pascalCase}Input!): ${pascalCase}
  update${pascalCase}(input: Update${pascalCase}Input!): ${pascalCase}
  delete${pascalCase}(id: ID!): Boolean
}
`,

  [`${pascalCase}.queries.graphql`]: `extend type Query {
  get${pascalCase}(id: ID!): ${pascalCase}
  list${pascalCase}s: [${pascalCase}]
}
`,
};

// Write files
Object.entries(templates).forEach(([filename, content]) => {
  const filePath = path.join(targetPath, filename);
  fs.writeFileSync(filePath, content);
  console.log(`✅ Created: ${filePath}`);
});
