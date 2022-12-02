import { Fetch } from '../Fetch';
import { GetPhoneNumberIdOption } from './options';

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
    const header = {
      headers: { 'Content-Type': 'application/json' },
    };
    return await Fetch.post(
      `https://graph.facebook.com/${this._api_version}/${this._phone_number_id}/messages?access_token=${this._token}`,
      data,
      header,
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
    const header = {
      headers: { 'Content-Type': 'application/json' },
    };
    return await Fetch.post(
      `https://graph.facebook.com/${this._api_version}/${this._phone_number_id}/messages?access_token=${this._token}`,
      data,
      header,
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
    const header = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._token}`,
      },
    };
    return await Fetch.post(
      `https://graph.facebook.com/${this._api_version}/${this._phone_number_id}/messages`,
      data,
      header,
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
    const header = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._token}}`,
      },
    };
    const response = await Fetch.get(
      `https://graph.facebook.com/${this._api_version}/${accountId}/phone_numbers`,
      header,
    );
    return response.data.data;
  }
}
