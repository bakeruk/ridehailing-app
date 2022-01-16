const grey = {
  200: "#FFFFFF",
  190: "#F0F0FF",
  180: "#D3D6E6",
  160: "#BBBDCC",
  140: "#A0A4B2",
  120: "#878C98",
  100: "#6F747C",
  80: "#575C62",
  60: "#404449",
  40: "#292B2E",
  20: "#121314",
  0: "#000000"
};

const blue = {
  200: "#F4FAFE",
  180: "#D8E2FE",
  160: "#BFCAF9",
  140: "#A3ACF1",
  120: "#8489EC",
  100: "#6063E0", // Default
  80: "#4448C2",
  60: "#2D33A4",
  40: "#1C1D73",
  20: "#09083B"
};

const yellow = {
  180: "#FDF8CD",
  160: "#FDEF9C",
  140: "#FDE36A",
  120: "#FDD843",
  100: "#FDC52E", // Default
  80: "#DAA425",
  60: "#B5841C",
  40: "#926614",
  20: "#78510E"
};

const red = {
  180: "#FDEAD9",
  160: "#FECCB1",
  140: "#FDAB8B",
  120: "#FC8A6D",
  100: "#FB543D", // Default
  80: "#D9332C",
  60: "#B61F26",
  40: "#921423",
  20: "#790C23"
};

const green = {
  180: "#E3FEDD",
  160: "#C0FCBC",
  140: "#98F79A",
  120: "#7CEE8B",
  100: "#53E371", // Default
  80: "#3CC364",
  60: "#29A358",
  40: "#1C834E",
  20: "#156C45"
};

export const colors = {
  white: grey[ 200 ],
  black: grey[ 0 ],
  grey,
  blue,
  yellow,
  red,
  green,
  success: green[ 100 ],
  info: blue[ 160 ],
  warning: yellow[ 100 ],
  error: red[ 100 ]
};