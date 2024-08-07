export type product = {
  _id?: string;
  name?: string;
  desc?: string;
  ratingRate?: number;
  ratingCount?: number;
  priceOriginal?: number;
  priceCurrent?: number;
  img1?: string;
  img2?: string;
  img3?: string;
};

export type rootStore = {
  cart: [];
  favourate: [];
  openedPost: Array<product>;
  allFeaturedDress: [
    [
      {
        _id?: string;
        name?: string;
        desc?: string;
        ratingRate?: number;
        ratingCount?: number;
        priceOriginal?: number;
        priceCurrent?: number;
        img1?: string;
        img2?: string;
        img3?: string;
      },
      {
        _id?: string;
        name?: string;
        desc?: string;
        ratingRate?: number;
        ratingCount?: number;
        priceOriginal?: number;
        priceCurrent?: number;
        img1?: string;
        img2?: string;
        img3?: string;
      }
    ]
  ];
  allFeaturedJewellery: [
    [
      {
        _id?: string;
        name?: string;
        desc?: string;
        ratingRate?: number;
        ratingCount?: number;
        priceOriginal?: number;
        priceCurrent?: number;
        img1?: string;
        img2?: string;
        img3?: string;
      },
      {
        _id?: string;
        name?: string;
        desc?: string;
        ratingRate?: number;
        ratingCount?: number;
        priceOriginal?: number;
        priceCurrent?: number;
        img1?: string;
        img2?: string;
        img3?: string;
      }
    ]
  ];
  allFeaturedFootwear: [
    [
      {
        _id?: string;
        name?: string;
        desc?: string;
        ratingRate?: number;
        ratingCount?: number;
        priceOriginal?: number;
        priceCurrent?: number;
        img1?: string;
        img2?: string;
        img3?: string;
      },
      {
        _id?: string;
        name?: string;
        desc?: string;
        ratingRate?: number;
        ratingCount?: number;
        priceOriginal?: number;
        priceCurrent?: number;
        img1?: string;
        img2?: string;
        img3?: string;
      }
    ]
  ];
};
