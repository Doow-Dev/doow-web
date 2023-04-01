export function formartNumberToWords(aNum: number) {
  const asString = aNum.toString();
  const numLength = asString.length;
  const lastValue = asString.substring(numLength - 1, numLength);

  if (aNum >= 11 && aNum <= 19) {
    return `${aNum}th`;
  }
  switch (lastValue) {
    case "1":
      return `${aNum}st`;
      break;
    case "2":
      return `${aNum}nd`;
      break;
    case "3":
      return `${aNum}rd`;
      break;
    case "4":
      return `${aNum}th`;
      break;
    case "5":
      return `${aNum}th`;
      break;
    case "6":
      return `${aNum}th`;
      break;
    case "7":
      return `${aNum}th`;
    case "8":
      return `${aNum}th`;
    case "9":
      return `${aNum}th`;
    case "10":
      return `${aNum}th`;
      break;
    default:
      return `${aNum}th`;
      break;
  }
}
