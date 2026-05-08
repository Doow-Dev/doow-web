import { docsRedirects } from "../../src/lib/docs/redirects";

const bySource = new Map(docsRedirects.map((redirect) => [redirect.from, redirect]));

for (const redirect of docsRedirects) {
  const chain = [redirect.from, redirect.to];
  let current = bySource.get(redirect.to);

  while (current) {
    chain.push(current.to);
    current = bySource.get(current.to);
  }

  console.log(`${chain.join(" -> ")} (${redirect.reason})`);
}

if (docsRedirects.length === 0) {
  console.log("No docs redirects are registered.");
}
