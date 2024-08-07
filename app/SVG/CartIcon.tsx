import { svgProp } from "../declare";

const CartIcon = (prop: svgProp) => {
  return (
    <svg
      width={prop.width || "26"}
      height={prop.height || "28"}
      viewBox="0 0 26 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${prop.custom}  h-100% w-100% object-contain`}
    >
      <path
        d="M3.51621 17.0314H18.2263L20.1619 6.38593H1.96777C1.38711 6.38593 1 6.96659 1 7.54725L2.54843 16.2572C2.74199 16.6443 3.1291 17.0314 3.51621 17.0314Z"
        stroke={prop.borderColor || "#1C244B"}
        strokeWidth={prop.borderThickness || "1.5"}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.1612 6.38732L20.9354 2.32268C20.9354 1.93557 21.516 1.54846 21.9031 1.54846H25"
        stroke={prop.borderColor || "#1C244B"}
        strokeWidth={prop.borderThickness || "1.5"}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.2229 17.0299L17.4487 21.0945C17.4487 21.4816 16.8681 21.8687 16.4809 21.8687H5.64191"
        stroke={prop.borderColor || "#1C244B"}
        strokeWidth={prop.borderThickness || "1.5"}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.60968 26.7098C7.14416 26.7098 7.57745 26.2765 7.57745 25.7421C7.57745 25.2076 7.14416 24.7743 6.60968 24.7743C6.07519 24.7743 5.64191 25.2076 5.64191 25.7421C5.64191 26.2765 6.07519 26.7098 6.60968 26.7098Z"
        stroke={prop.borderColor || "#1C244B"}
        strokeWidth={prop.borderThickness || "1.5"}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.3233 26.7098C15.8578 26.7098 16.2911 26.2765 16.2911 25.7421C16.2911 25.2076 15.8578 24.7743 15.3233 24.7743C14.7888 24.7743 14.3555 25.2076 14.3555 25.7421C14.3555 26.2765 14.7888 26.7098 15.3233 26.7098Z"
        stroke={prop.borderColor || "#1C244B"}
        strokeWidth={prop.borderThickness || "1.5"}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CartIcon;
