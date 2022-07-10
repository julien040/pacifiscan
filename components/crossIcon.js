import Svg, { Path } from "react-native-svg";

function CrossIcon() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
    >
      <Path
        stroke="black"
        strokeLinecap="round"
        strokeWidth={2}
        d="M20 20 4 4m16 0L4 20"
      />
    </Svg>
  );
}

export default CrossIcon;
