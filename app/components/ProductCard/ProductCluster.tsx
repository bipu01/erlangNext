import { productClusterProp } from "../../declare";
import {
  DataOfLeftImg,
  DataOfRightImg,
  ProductCardLeftImg,
  ProductCardRightImg,
} from "./ProductCard";

export const ProductCluster = ({
  color,
  leftRow,
  rightRow,
}: productClusterProp) => {
  return (
    <div className="grid grid-cols-5 sm:grid-cols-2 sm:grid-rows-3 sm:gap-x-8 gap-y-16 sm:gap-y-0 sm:space-y-0 overflow-x-clip sm:mb-5vh sm:max-w-full  h-55rem ">
      <ProductCardLeftImg
        holeColor={color}
        _id={leftRow._id}
        name={leftRow.name}
        desc={leftRow.desc}
        priceCurrent={leftRow.priceCurrent}
        priceOriginal={leftRow.priceOriginal}
        img1={leftRow.img1}
        img2={leftRow.img2}
        img3={leftRow.img3}
        ratingRate={leftRow.ratingRate || 0}
        ratingCount={leftRow.ratingCount}
      />

      <div className="row-span-2 col-span-2 sm:col-span-1 sm:row-span-1 grid sm:grid-rows-2">
        <DataOfLeftImg
          holeColor={color}
          _id={leftRow._id}
          name={leftRow.name}
          desc={leftRow.desc}
          priceCurrent={leftRow.priceCurrent}
          priceOriginal={leftRow.priceOriginal}
          img1={leftRow.img1}
          img2={leftRow.img2}
          img3={leftRow.img3}
          ratingRate={leftRow.ratingRate || 0}
          ratingCount={leftRow.ratingCount}
        />
        <div className="hidden sm:block sm:row-span-1"></div>
      </div>

      <ProductCardRightImg
        holeColor={color}
        _id={rightRow._id}
        name={rightRow.name}
        desc={rightRow.desc}
        priceCurrent={rightRow.priceCurrent}
        priceOriginal={rightRow.priceOriginal}
        img1={rightRow.img1}
        img2={rightRow.img2}
        img3={rightRow.img3}
        ratingRate={rightRow.ratingRate || 0}
        ratingCount={rightRow.ratingCount}
      />

      <div className="row-span-2 col-span-2 sm:col-span-1 sm:row-span-1 grid sm:grid-rows-2 ">
        <div className="hidden sm:block sm:row-span-1 "></div>
        <DataOfRightImg
          holeColor={color}
          _id={rightRow._id}
          name={rightRow.name}
          desc={rightRow.desc}
          priceCurrent={rightRow.priceCurrent}
          priceOriginal={rightRow.priceOriginal}
          img1={rightRow.img1}
          img2={rightRow.img2}
          img3={rightRow.img3}
          ratingRate={rightRow.ratingRate || 0}
          ratingCount={rightRow.ratingCount}
        />
      </div>
    </div>
  );
};
