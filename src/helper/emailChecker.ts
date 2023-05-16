const params: string[] = [
  // "@gmail.com",
  // "@outlook.com",
  // Apple
  // "@apple.com",
  // "@me.com",
  // "@icloud.com",
  // "@mac.com",
  // "@qq.com",
  // "@orange.fe",
  // "@wed.de",
  //yahoo
  // "@yahoo.com",
  // "@myyahoo.com",
  // "@yahoo.co.uk",
  // "@yahoo.fr",
  // "@aol.com",
  // "@icloudmail.com",
  // "@live.com",
  // "@hotmail.com",
  // "@msn.com",
  // "@yandex.ru",
  // "@googlemail.com",
];

export default function IsValidBusinessMail(value: string): boolean {
  if (ValidateEmail(value)) {
    const match = params.filter((v, i) =>
      value.toLowerCase().includes(v.toLowerCase())
    );
    // console.log(value, "value");
    // console.log(match, "match");

    if (match.length === 0) {
      return true;
    }
    return false;
  }
  return false;
}

function ValidateEmail(mail: string): boolean {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}
