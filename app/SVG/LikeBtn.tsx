import { svgProp } from "../declare";

export const LikeBtn = (prop: svgProp) => {
  return (
    <svg
      width="17"
      height="15"
      viewBox="0 0 17 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${prop.custom} h-100% w-100% object-contain`}
    >
      <path
        d="M8.50471 14L2.13916 8.01207C-1.32038 4.41931 3.76514 -2.47878 8.50471 3.10197C13.2443 -2.47878 18.3068 4.44327 14.8703 8.01207L8.50471 14Z"
        fill={prop.fillColor}
        stroke={prop.borderColor || "#1C244B"}
        strokeWidth={prop.borderThickness || "1.5"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
