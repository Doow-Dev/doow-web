const params: string[] = [
  "@gmail.com",
  "@outlook.com",
  // Apple
  "@apple.com",
  "@me.com",
  "@icloud.com",
  "@mac.com",
  "@qq.com",
  "@orange.fe",
  "@wed.de",
  //yahoo
  "@yahoo.com",
  "@myyahoo.com",
  "@yahoo.co.uk",
  "@yahoo.fr",
  "@aol.com",
  "@icloudmail.com",
  "@live.com",
  "@hotmail.com",
  "@msn.com",
  "@yandex.ru",
  "@googlemail.com",
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
