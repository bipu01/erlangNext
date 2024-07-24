import CartIcon from "../../SVG/CartIcon";
import { buttonProp, buttonPropInterface } from "../../declare";
import { sizeOfLessMajorText } from "../../defineSize";
import { HandleAddToCart } from "./ButtonFunctions/handleAddToCart";

export const CartBuyNowBtn = (prop: buttonPropInterface) => {
  return (
    <button
      className={`${
        prop.primary
          ? "bg-primaryBlue text-bodybg rounded-md"
          : "bg-bodybg text-primaryBlue rounded-md"
      } absolute bottom-0 right-0 px-4 sm:px-5vw ${sizeOfLessMajorText} w-auto  max-w-15rem py-2 sm:py-3
  items-center flex gap-1 sm:gap-2 font-normal sm:font-medium tracking-wider justify-center
  whitespace-nowrap`}
    >
      {prop.text}
    </button>
  );
};

export const ProductBuyNowBtn = (prop: buttonPropInterface) => {
  return (
    <button
      className={`${
        prop.primary
          ? "bg-primaryBlue text-bodybg rounded-md"
          : "bg-bodybg text-primaryBlue rounded-md"
      } px-4 sm:px-5vw ${sizeOfLessMajorText}  max-w-15rem py-2 sm:py-3 w-45% sm:w-40%
  items-center flex gap-1 sm:gap-2 font-normal sm:font-medium tracking-wider justify-center
  whitespace-nowrap`}
    >
      {prop.text}
    </button>
  );
};

export const SecondaryButton = () => {
  return <div>SecondaryButton</div>;
};

export const TertiaryButton = () => {
  return <div>TertiaryButton</div>;
};

export const AddToCartButton = (prop: buttonPropInterface) => {
  // const dispatch = useDispatch();
  return (
    <>
      <button
        id={`addToCart` + prop._id}
        className={`${
          prop.primary
            ? "bg-primaryBlue text-bodybg rounded-md px-5vw sm:px-4 lg:px-5  w-full sm:w-auto"
            : "bg-bodybg text-primaryBlue rounded-md py-1 sm:py-3 px-10vw sm:px-4vw w-45vw sm:w-auto"
        } ${sizeOfLessMajorText} ${
          prop.custom
        } py-1 sm:py-2 items-center flex gap-1 sm:gap-2 font-medium tracking-wider justify-center
        whitespace-nowrap`}
        onClick={HandleAddToCart}
      >
        {prop.text}
      </button>
    </>
  );
};

export const ProductAddToCartButton = (prop: buttonPropInterface) => {
  // const dispatch = useDispatch();
  return (
    <>
      <button
        id={`addToCart` + prop._id}
        className={`${
          prop.primary
            ? "bg-primaryBlue text-bodybg rounded-md px-5vw sm:px-4 lg:px-5  "
            : "bg-bodybg text-primaryBlue rounded-md py-1 sm:py-3 px-10vw sm:px-4vw "
        } ${sizeOfLessMajorText} ${
          prop.custom
        }  py-2 sm:py-3 w-45% sm:w-40% items-center flex gap-1 sm:gap-2 font-medium tracking-wider justify-center
        whitespace-nowrap`}
        onClick={HandleAddToCart}
      >
        {prop.text}
      </button>
    </>
  );
};

export const OptionsPanelBtn = (prop: buttonProp) => {
  if (prop.active) {
    return (
      <>
        <button className="bg-primaryBlue text-bodybg py-1 px-4 xmd:px-8  rounded-sm">
          {prop.text}
        </button>
      </>
    );
  }
  return (
    <>
      <button className=" bg-bgLightBlue text-primaryBlue py-1 px-2 xmd:px-8 rounded-sm">
        {prop.text}
      </button>
    </>
  );
};
