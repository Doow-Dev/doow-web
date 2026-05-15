import { runDocsContentGovernance } from "./governance";

const result = await runDocsContentGovernance();

console.log(`Docs content gate passed: ${result.pages.length} pages and ${result.searchRecords.length} search records.`);
