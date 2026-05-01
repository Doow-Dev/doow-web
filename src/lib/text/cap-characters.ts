export interface CappedCharacters {
  isCapped: boolean;
  text: string;
}

export function capCharacters(value: string, maxCharacters: number): CappedCharacters {
  const normalizedValue = value.trim();
  const normalizedMaxCharacters = Math.max(0, Math.trunc(maxCharacters));

  if (normalizedValue.length <= normalizedMaxCharacters) {
    return {
      isCapped: false,
      text: normalizedValue,
    };
  }

  if (normalizedMaxCharacters <= 0) {
    return {
      isCapped: true,
      text: "",
    };
  }

  if (normalizedMaxCharacters <= 3) {
    return {
      isCapped: true,
      text: ".".repeat(normalizedMaxCharacters),
    };
  }

  return {
    isCapped: true,
    text: `${normalizedValue.slice(0, normalizedMaxCharacters - 3).trimEnd()}...`,
  };
}
