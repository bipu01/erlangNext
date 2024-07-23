declare module "next/server" {
  interface NextRequest {
    user?: any; // Adjust the type based on your user payload structure
  }
}

export type ProductCardProp = {
  _id?: string;
  holeColor?: string;
  name?: string;
  desc?: string;
  priceCurrent?: number;
  priceOriginal?: number;
  ratingRate?: number;
  ratingCount?: number;
  img1?: string;
  img2?: string;
  img3?: string;
};

export type UserType = {
  name: string;
  email: string;
  password: string;
  otherInfo: Array;
  settings: Array;
  likedProducts: Array;
  itemsInCart: Array;
  accessToken: string;
  refreshToken: string;
};

export type buttonProp = {
  text: string;
  active?: boolean;
  primary?: boolean;
  darkMode?: boolean;
};

export interface buttonPropInterface {
  _id?: string;
  text: string;
  active?: boolean;
  primary?: boolean;
  darkBg: boolean;
  custom?: string;
  icon?: boolean;
}

export type productClusterProp = {
  color?: string;
  leftRow: {
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
  rightRow: {
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
};
export interface productClusterPropInterface {
  leftRow: {
    id?: string;
    ProductName?: string;
    rating?: number;
    price?: number;
    originalPrice?: number;
    imgSrc?: string;
  };
  rightRow: {
    id?: string;
    ProductName?: string;
    rating?: number;
    price?: number;
    originalPrice?: number;
    imgSrc?: string;
  };
}

export type svgProp = {
  borderColor?: string | "";
  fillColor?: string | "";
  borderThickness?: number | 1.5;
  custom?: string | "";
  height?: number | 8;
  width?: number | 8;
};

export interface testimonialsPropInterface {
  avatar: string;
  comment: string;
  name: string;
}
export interface cartPropInterface {
  img1?: string;
  img2?: string;
  img3?: string;
  quantity?: number;
  color?: string;
  name?: string;
  rating?: number;
  priceOriginal?: number;
  priceCurrent?: number;
}

export interface productProp {
  id: number;
  title: string;
  price: number;
  desc: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// export type productCluster ={
//     leftRow:{
//         _id:string,
//         name:string,
//         price: {original:number, current:number},
//         description: string,
//         image: {
//             image1:string,
//             image2:string,
//             image3:string
//         },
//         rating: { rate: number, count: number },
//         isFeatured: boolean,
//         category:string
//     },
//     rightRow:{
//         _id:string,
//         name:string,
//         price: {original:number, current:number},
//         description: string,
//         image: {
//             image1:string,
//             image2:string,
//             image3:string
//         },
//         rating: { rate: number, count: number },
//         isFeatured: boolean,
//         category:string
//     }
// }

export type individualProduct = {
  _id: string;
  name: string;
  desc?: string;
  priceOriginal: number;
  priceCurrent: number;
  description: string;
  img1: string;
  img2: string;
  img3: string;
  ratingRate: number;
  ratingCount: number;
  isFeatured: boolean;
  category: string;
};
