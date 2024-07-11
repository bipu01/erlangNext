import { OptionsPanelBtn } from "../../../components/Buttons/Buttons";
import { paddingForPage } from "../../../defineSize";

const SortByPanel = () => {
  return (
    <section
      className={`mb-10vh space-y-4 sm:space-y-9 w-100vw  ${paddingForPage}`}
    >
      <div className="py-2 xmd:py-4 px-2 xmd:px-4 rounded-sm bg-bodybg flex justify-between sm:block sm:space-x-4 ">
        <OptionsPanelBtn active={true} text="All" />
        <OptionsPanelBtn text="Clothing" />
        <OptionsPanelBtn text="Jewellery" />
        <OptionsPanelBtn text="Footwear" />
      </div>
      <div className="h-0.5 w-100% bg-bodybg"></div>
    </section>
  );
};

export default SortByPanel;
