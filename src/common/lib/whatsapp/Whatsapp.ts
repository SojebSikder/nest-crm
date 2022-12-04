import { Fetch } from '../Fetch';
import {
  ActionButton,
  BusinessProfile,
  CreateMessageTemplate,
  GetPhoneNumberIdOption,
  MessageTemplate,
  Section,
} from './options';

// Whatsapp cloud api version
const api_Version = 'v15.0';

/**
 * Whatsapp cloud api wrapper
 */
export class WhatsappApi {
  /**
   * Whatsapp cloud api version
   */
  private static _api_version: string = api_Version;
  private static _phone_number_id = '';
  /**
   * Whatsapp business account id
   */
  private static _account_id = '';
  /**
   * Access token
   */
  private static _token = ``;

  /**
   * Set whatsapp api credentials
   * @param param0
   * @returns
   */
  static config({
    apiVersion = api_Version,
    phoneNumberId,
    accountId,
    token,
  }: {
    /**
     * Whatsapp Api version.
     */
    apiVersion?: string;
    /**
     * Whatsapp phone number id
     */
    phoneNumberId?: string;
    /**
     * Whatsapp business account id
     */
    accountId?: string;
    /**
     * Access token
     */
    token: string;
  }) {
    this._api_version = apiVersion;
    this._phone_number_id = phoneNumberId;
    this._token = token;
    this._account_id = accountId;
    return this;
  }

  /**
   * Set phone number id credentials
   * @param param0
   * @returns
   */
  static setPhoneNumberId(phoneNumberId) {
    this._phone_number_id = phoneNumberId;
    return this;
  }

  /**
   * Get whatsapp credentials
   * @param param0
   * @returns
   */
  static getConfig() {
    return {
      apiVersion: this._api_version,
      phoneNumberId: this._phone_number_id,
      token: this._token,
    };
  }

  /**
   * Send text message
   * @param param0
   * @returns
   */
  static async sendText({ to, message }: { to: string; message: string }) {
    const data = {
      messaging_product: 'whatsapp',
      to: to,
      text: { body: message },
    };
    const _header = {
      headers: { 'Content-Type': 'application/json' },
    };
    return await Fetch.post(
      `https://graph.facebook.com/${this._api_version}/${this._phone_number_id}/messages?access_token=${this._token}`,
      data,
      _header,
    );
  }

  /**
   * Send template message
   * @param param0
   * @returns
   */
  static async sendTemplate({
    to,
    templateName = 'hello_world',
    language = 'en_US',
  }: {
    to: string;
    templateName?: string;
    language?: string;
  }) {
    const data = {
      messaging_product: 'whatsapp',
      to: to,
      type: 'template',
      template: {
        name: templateName,
        language: {
          code: language,
        },
      },
    };
    const _header = {
      headers: { 'Content-Type': 'application/json' },
    };
    return await Fetch.post(
      `https://graph.facebook.com/${this._api_version}/${this._phone_number_id}/messages?access_token=${this._token}`,
      data,
      _header,
    );
  }

  /**
   * Mark message as read
   * @param message_id
   * @returns
   */
  static async markMessageAsRead(message_id: string) {
    const data = {
      messaging_product: 'whatsapp',
      status: 'read',
      message_id: message_id,
    };
    const _header = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._token}`,
      },
    };
    return await Fetch.post(
      `https://graph.facebook.com/${this._api_version}/${this._phone_number_id}/messages`,
      data,
      _header,
    );
  }

  /**
   * Send single product message
   * @param {Object} arg
   * @param {string} arg.to Recipient phone number
   * @param {string} arg.body body text
   * @returns
   */
  static async sendSingleProduct({
    to,
    bodyText,
    footerText = null,
    catalog_id,
    product_retailer_id,
  }: {
    /**
     * Recipient phone number
     */
    to: string;
    /**
     * body text
     */
    bodyText: string;
    /**
     * Footer text
     */
    footerText?: string;
    /**
     * Unique identifier of the Facebook catalog linked to your WhatsApp Business Account.
     * This ID can be retrieved via Commerce Manager.
     */
    catalog_id: string;
    /**
     * product retailer id
     */
    product_retailer_id: string;
  }) {
    const data = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: to,
      type: 'interactive',
      interactive: {
        type: 'product',
        body: {
          text: bodyText,
        },
        action: {
          catalog_id: catalog_id,
          product_retailer_id: product_retailer_id,
        },
      },
    };
    if (footerText) {
      Object.assign(data.interactive, {
        footer: {
          text: footerText,
        },
      });
    }
    const _header = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._token}`,
      },
    };
    return await Fetch.post(
      `https://graph.facebook.com/${this._api_version}/${this._phone_number_id}/messages`,
      data,
      _header,
    );
  }

  /**
   * Send multiple product message
   */
  static async sendMultipleProduct({
    to,
    headerText,
    bodyText,
    footerText = null,
    catalog_id,
    sections,
  }: {
    /**
     * Recipient phone number
     */
    to: string;
    /**
     * header text
     */
    headerText: string;
    /**
     * body text
     */
    bodyText: string;
    /**
     * Footer text
     */
    footerText?: string;
    /**
     * Unique identifier of the Facebook catalog linked to your WhatsApp Business Account.
     * This ID can be retrieved via Commerce Manager.
     */
    catalog_id: string;
    /**
     * Product section
     */
    sections: Section[];
  }) {
    const _sections = sections;

    const data = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: to,
      type: 'interactive',
      interactive: {
        type: 'product_list',
        header: {
          type: 'text',
          text: headerText,
        },
        body: {
          text: bodyText,
        },
        action: {
          catalog_id: catalog_id,
          sections: _sections,
        },
      },
    };

    if (footerText) {
      Object.assign(data.interactive, {
        footer: {
          text: footerText,
        },
      });
    }

    const _header = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._token}`,
      },
    };
    return await Fetch.post(
      `https://graph.facebook.com/${this._api_version}/${this._phone_number_id}/messages`,
      data,
      _header,
    );
  }

  /**
   * Send interactive button message
   * @returns
   */
  static async sendButtonMessage({
    to,
    headerText = null,
    bodyText = null,
    footerText = null,
    buttons,
  }: {
    /**
     * Recipient phone number
     */
    to: string;
    /**
     * header text. Maximum of 1024 characters.
     */
    headerText?: string;
    /**
     * body text. Maximum of 1024 characters.
     */
    bodyText?: string;
    /**
     * Footer text
     */
    footerText?: string;
    /**
     * Button content. It cannot be an empty string and must be unique within the message.
     * Emojis are supported, markdown is not.
     * Maximum length: 20 characters.
     */
    buttons: ActionButton[];
  }) {
    const data = {
      messaging_product: 'whatsapp',
      to: to,
      type: 'interactive',
      interactive: {
        type: 'button',
        header: {
          type: 'text',
          text: headerText,
        },
        body: {
          text: bodyText,
        },
        footer: {
          text: footerText,
        },
        action: {
          buttons: buttons,
        },
      },
    };
    const _header = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._token}`,
      },
    };

    return await Fetch.post(
      `https://graph.facebook.com/${this._api_version}/${this._phone_number_id}/messages`,
      data,
      _header,
    );
  }
  /**
   * Send interactive list message
   * @returns
   */
  static async sendListMessage({
    to,
    headerText,
    bodyText,
    footerText = null,
    buttonText,
    sections,
  }: {
    /**
     * Recipient phone number
     */
    to: string;
    /**
     * header text. Maximum of 1024 characters.
     */
    headerText: string;
    /**
     * body text. Maximum of 1024 characters.
     */
    bodyText: string;
    /**
     * Footer text
     */
    footerText?: string;
    /**
     * a button field with your button’s content, maximum of 20 characters
     */
    buttonText: string;
    /**
     * at least one section object (maximum of 10) with a maximum of 24 characters for the title for section
     */
    sections: Section[];
  }) {
    const data = {
      messaging_product: 'whatsapp',
      to: to,
      type: 'interactive',
      interactive: {
        type: 'list',
        header: {
          type: 'text',
          text: headerText,
        },
        body: {
          text: bodyText,
        },
        action: {
          button: buttonText,
          sections: sections,
        },
      },
    };
    if (footerText) {
      Object.assign(data.interactive, {
        footer: {
          text: footerText,
        },
      });
    }

    const _header = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._token}`,
      },
    };

    return await Fetch.post(
      `https://graph.facebook.com/${this._api_version}/${this._phone_number_id}/messages`,
      data,
      _header,
    );
  }

  /**
   * Get whatsapp message templates
   * @returns
   */
  static async getMessageTemplates(): Promise<MessageTemplate[]> {
    const _header = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._token}}`,
      },
    };
    const response = await Fetch.get(
      `https://graph.facebook.com/${this._api_version}/${this._account_id}/message_templates?fields=name,category,content,language,name_or_content,status`,
      _header,
    );
    return response.data.data;
  }

  /**
   * Create whatsapp message template
   * @returns
   */
  static async createMessageTemplate(templateData: CreateMessageTemplate) {
    const data: CreateMessageTemplate = {
      name: templateData.name,
      category: templateData.category,
      language: templateData.language,
      components: templateData.components,
    };
    const _header = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._token}}`,
      },
    };
    const response = await Fetch.post(
      `https://graph.facebook.com/${this._api_version}/${this._account_id}/message_templates`,
      data,
      _header,
    );

    return response.data.id;
  }

  /**
   * Delete whatsapp message template
   * @returns
   */
  static async deleteMessageTemplate(templateName: string): Promise<boolean> {
    const _header = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._token}}`,
      },
    };
    const response = await Fetch.delete(
      `https://graph.facebook.com/${this._api_version}/${this._account_id}/message_templates?name=${templateName}`,
      _header,
    );

    return response.data.success;
  }

  /**
   * Get whatsapp business profile details
   * @returns
   */
  static async getBusinessProfileDeatils(): Promise<BusinessProfile> {
    const _header = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._token}}`,
      },
    };
    const response = await Fetch.get(
      `https://graph.facebook.com/${this._api_version}/${this._phone_number_id}/whatsapp_business_profile?fields=about,address,description,email,profile_picture_url,websites,vertical`,
      _header,
    );
    return response.data.data[0];
  }

  /**
   * Update whatsapp business profile details
   * @returns
   */
  static async updateBusinessProfileDeatils(
    profileDetails: BusinessProfile,
  ): Promise<boolean> {
    const _header = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._token}}`,
      },
    };
    const data = {
      about: profileDetails.about,
      address: profileDetails.address,
      description: profileDetails.description,
      email: profileDetails.email,
      profile_picture_url: profileDetails.profile_picture_url,
      websites: profileDetails.websites,
      vertical: profileDetails.vertical,
      messaging_product: 'whatsapp',
    };

    const response = await Fetch.post(
      `https://graph.facebook.com/${this._api_version}/${this._phone_number_id}/whatsapp_business_profile`,
      data,
      _header,
    );
    return response.data.success;
  }

  /**
   * Get all phone number using Whatsapp business account id
   * @returns
   */
  static async getPhoneNumberIds(): Promise<GetPhoneNumberIdOption[]> {
    const _header = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._token}}`,
      },
    };
    const response = await Fetch.get(
      `https://graph.facebook.com/${this._api_version}/${this._account_id}/phone_numbers`,
      _header,
    );
    return response.data.data;
  }

  /**
   * Get Whatsapp business account ids
   * @returns
   */
  static async getWabaIds() {
    const wabaId = await this.getWabaData();
    return wabaId.granular_scopes.find((data) => {
      if (data.scope == 'whatsapp_business_management') {
        return data.target_ids;
      }
    });
  }

  /**
   * Get all Whatsapp business account data
   * @returns
   */
  static async getWabaData() {
    const _header = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._token}}`,
      },
    };
    const response = await Fetch.get(
      `https://graph.facebook.com/${this._api_version}/debug_token?input_token=${this._token}`,
      _header,
    );
    return response.data.data;
  }
}
