export type GetPhoneNumberIdOption = {
  verified_name: string;
  display_phone_number: string;
  id: string;
  quality_rating: string;
};

// business profile
export type BusinessProfile = {
  messaging_product: string;
  address: string;
  description: string;
  vertical: string;
  about: string;
  email: string;
  websites: string[];
  profile_picture_url: string;
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

export type SectionRow = {
  id: string;
  title: string;
  description: string;
};

/**
 * Array of section objects. There is a minimum of 1 and maximum of 10. See section object.
 */
export type Section = {
  /**
   * at least one section object (maximum of 10) with a maximum of 24 characters for the title for section
   */
  title: string;

  /**
   * product_item for product type message, required if message type is product
   */
  product_items?: ProductItem[];

  /**
   * rows for list type message, required if message type is list
   */
  rows?: SectionRow[];
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
