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
  /**
   * Unique identifier of the product in a catalog.
   * Maximum 100 characters for both Single-Product and Multi-Product messages.
   */
  product_retailer_id: string;
};

/**
 * Array of section objects. There is a minimum of 1 and maximum of 10. See section object.
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

// ----------interactive message----------
export type ButtonType = 'reply' | (string & Record<string, unknown>);
// action button
export type ActionButton = {
  /**
   * The only supported option is reply for Reply Button Messages.
   */
  type: ButtonType;
  reply: {
    /**
     * Unique identifier for your button.
     * This ID is returned in the webhook when the button is clicked by the user.
     * Maximum length: 256 characters.
     */
    id: string;
    /**
     * Button title. It cannot be an empty string and must be unique within the message.
     * Emojis are supported, markdown is not.
     * Maximum length: 20 characters.
     */
    title: string;
  };
};
