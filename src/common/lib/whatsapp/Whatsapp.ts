import { Fetch } from '../Fetch';
import { GetPhoneNumberIdOption, Section } from './options';

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
  private static _phone_number_id = ``;
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
    token,
  }: {
    apiVersion?: string;
    phoneNumberId: string;
    token: string;
  }) {
    this._api_version = apiVersion;
    this._phone_number_id = phoneNumberId;
    this._token = token;
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
    bodyText = null,
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
    bodyText?: string;
    /**
     * Footer text
     */
    footerText?: string;
    /**
     * catalog id
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
        footer: {
          text: footerText,
        },
        action: {
          catalog_id: catalog_id,
          product_retailer_id: product_retailer_id,
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
   * Send multiple product message
   */
  static async sendMultipleProduct({
    to,
    headerText = null,
    bodyText = null,
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
    headerText?: string;
    /**
     * body text
     */
    bodyText?: string;
    /**
     * Footer text
     */
    footerText?: string;
    /**
     * catalog id
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
        footer: {
          text: footerText,
        },
        action: {
          catalog_id: catalog_id,
          sections: _sections,
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
   * Get phone number using Whatsapp business account id
   * @param accountId Whatsapp business account id
   * @returns
   */
  static async getPhoneNumberId(
    accountId: string,
  ): Promise<GetPhoneNumberIdOption[]> {
    const _header = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._token}}`,
      },
    };
    const response = await Fetch.get(
      `https://graph.facebook.com/${this._api_version}/${accountId}/phone_numbers`,
      _header,
    );
    return response.data.data;
  }
}
