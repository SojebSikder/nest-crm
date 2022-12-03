export type GetPhoneNumberIdOption = {
  verified_name: string;
  display_phone_number: string;
  id: string;
  quality_rating: string;
};

// ------------product-----------

/**
 * Product item option
 */
export type ProductItem = {
  product_retailer_id: string;
};

/**
 * product section option
 */
export type Section = {
  title: string;
  product_items: ProductItem[];
};

export type HeaderType = {
  text: string;
  image: string;
  video: string;
  document: string;
};
