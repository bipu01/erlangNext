import { svgProp } from "../declare";

const BackArrow = (prop: svgProp) => {
  return (
    <svg
      width={prop.height || 45}
      height={prop.height || 45}
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className=" "
    >
      <path
        d="M31.9636 22.4997H13.0405"
        stroke={prop.borderColor || "#1C244B"}
        strokeWidth={prop.borderThickness || 1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.7713 17.7692L13.0405 22.5L17.7713 27.2308"
        stroke={prop.borderColor || "#1C244B"}
        strokeWidth={prop.borderThickness || 1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.5 43C33.8218 43 43 33.8218 43 22.5C43 11.1782 33.8218 2 22.5 2C11.1782 2 2 11.1782 2 22.5C2 33.8218 11.1782 43 22.5 43Z"
        stroke={prop.borderColor || "#1C244B"}
        strokeWidth={prop.borderThickness || 1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BackArrow;
