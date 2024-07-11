import { svgProp } from "../declare";

const Star = (prop: svgProp) => {
  return (
    <svg
      width={prop.width || 16}
      height={prop.height || 16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${prop.custom} h-100% w-100% object-contain`}
    >
      <path
        d="M7.94577 11.9049L3.72047 14.0298L4.52937 9.528L1.1098 6.33759L5.83312 5.6819L7.94577 1.58386L10.0616 5.6819L14.7849 6.33759L11.3653 9.528L12.1742 14.0298L7.94577 11.9049Z"
        fill={prop.fillColor || "#1C244B"}
        stroke={prop.borderColor || "#1C244B"}
        strokeWidth={prop.borderThickness || "1.5"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Star;
