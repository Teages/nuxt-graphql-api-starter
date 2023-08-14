# Nuxt 3 Minimal GraphQL API Starter

Nuxt + graphql-http + Prisma + Nexus = GraphQL Server

## Develop

The project using yarn as the package manager.

### Setup

Make sure to install the dependencies:
```bash
# yarn
yarn
```

### Development Server

Start the development server on `http://localhost:3000`:
```bash
# yarn
yarn dev
```

### Production

Build the application for production:
```bash
# yarn
yarn build
```

Locally preview production build:
```bash
# yarn
yarn preview
```

## Others

- Format / ESLint: using [![code style](https://antfu.me/badge-code-style.svg)](https://github.com/antfu/eslint-config), but
  - [n/prefer-global/process](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/process.md): `always`
  - [curly](https://eslint.org/docs/latest/rules/curly): `all`
