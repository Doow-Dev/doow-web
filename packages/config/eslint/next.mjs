import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

export function createNextEslintConfig({ ignores = [] } = {}) {
  return [
    {
      ignores,
    },
    ...nextCoreWebVitals,
    ...nextTypeScript,
  ];
}
