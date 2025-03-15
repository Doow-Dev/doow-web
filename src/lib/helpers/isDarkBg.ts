const hexToRgb = (hex: string) => {
    // Convert HEX to RGB
    const color = hex.charAt(0) === "#" ? hex.substring(1, 7) : hex;
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
    return [r, g, b];
  }

  const rgbToArray = (rgb: string) => {
    // Convert 'rgb()' to []
    return rgb.match(/\d+/g)?.map(Number) || [255, 255, 255];
  };

  export const isDarkBg = (bgColor: string) => {
    const rgb = bgColor.startsWith("#") ? hexToRgb(bgColor) : rgbToArray(bgColor);
    const brightness = rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114;
    return brightness <= 186;
  };