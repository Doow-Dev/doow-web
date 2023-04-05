const params: string[] = [
  "@gmail.com",
  "@outlook.com",
  "@yahoo.com",
  // Apple
  "@apple.com",
  "@me.com",
  "@icloud.com",
  "@mac.com",
  "@qq.com",
  "@orange.fe",
  "@wed.de",
  "@myyahoo.com",
  "@yahoo.co.uk",
  "@yahoo.fr",
];

export default function EmailChecker(value: string) {
  if (value) {
    const match = params.filter((v, i) =>
      value.toLowerCase().includes(v.toLowerCase())
    );

    if (match.length > 0) {
      return true;
    }
    return false;
  }
  return false;
}
