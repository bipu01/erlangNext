import CartIcon from "../../SVG/CartIcon";
import { buttonProp, buttonPropInterface } from "../../declare";
import { sizeOfLessMajorText } from "../../defineSize";
import { handleAddToCart } from "./ButtonFunctions/addToCart";

export const BuyNowBtn = (prop: buttonPropInterface) => {
  return (
    <button
      className={`${
        prop.primary
          ? "bg-primaryBlue text-bodybg rounded-md"
          : "bg-bodybg text-primaryBlue rounded-md"
      } px-15vw sm:px-5vw ${sizeOfLessMajorText} w-45vw sm:w-auto py-3 sm:py-3
  items-center flex gap-1 sm:gap-2 font-normal sm:font-medium tracking-wider
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
        } py-1 items-center flex gap-1 sm:gap-2 font-medium tracking-wider
        whitespace-nowrap`}
        onClick={handleAddToCart}
      >
        {prop.text}
        {prop.darkBg ? (
          <CartIcon
            borderColor="#FFF9EF"
            custom="h-6 w-6"
            borderThickness={1.5}
          />
        ) : (
          <CartIcon
            borderColor="#1C244B"
            custom="h-6 w-6"
            borderThickness={1.5}
          />
        )}
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
