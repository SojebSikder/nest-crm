import { Fetch } from '../Fetch';

// Whatsapp cloud api version
const api_Version = 'v15.0';

/**
 * Whatsapp cloud api wrapper
 */
export class WhatsappApi {
  private static _api_version = ``;
  private static _phone_number_id = ``;
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

    return await Fetch.post(
      `https://graph.facebook.com/${this._api_version}/${this._phone_number_id}/messages?access_token=${this._token}`,
      data,
      { headers: { 'Content-Type': 'application/json' } },
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

    return await Fetch.post(
      `https://graph.facebook.com/${this._api_version}/${this._phone_number_id}/messages?access_token=${this._token}`,
      data,
      { headers: { 'Content-Type': 'application/json' } },
    );
  }
}
