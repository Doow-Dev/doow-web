import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  // schema: "https://eims.up.railway.app/graphql",

  // schema: "https://mims.up.railway.app/graphql",
  schema: "http://192.168.0.138:5000/graphql",
  documents: ["src/graphql/**/*.graphql"],
  generates: {
    "src/generated/graphql.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;
