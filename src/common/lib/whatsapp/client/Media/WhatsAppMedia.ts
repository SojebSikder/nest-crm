import { Fetch } from '../../../Fetch';
import { WhatsAppMediaOption } from './WhatsAppMediaOption';

export class WhatsAppMedia {
  /**
   * Whatsapp cloud api version
   */
  private _api_version: string;
  private _phone_number_id = '';
  /**
   * Whatsapp business account id
   */
  private _account_id = '';
  /**
   * Access token
   */
  private _token = ``;

  constructor({
    apiVersion,
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
  }

  /**
   * Get media
   */
  async getMedia({
    mediaId,
  }: {
    mediaId: string;
  }): Promise<WhatsAppMediaOption> {
    const _header = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._token}`,
      },
    };
    const response = await Fetch.get(
      `https://graph.facebook.com/${this._api_version}/${mediaId}/?phone_number_id=${this._phone_number_id}`,
      _header,
    );

    return response.data;
  }
}
