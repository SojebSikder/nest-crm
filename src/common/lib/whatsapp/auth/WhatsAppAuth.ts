import { Fetch } from '../../Fetch';
import { GetPhoneNumberIdOption } from '../client/options';

const api_Version = 'v15.0';

/**
 * Whatsapp auth
 */
export class WhatsAppAuth {
  /**
   * Whatsapp cloud api version
   */
  private _api_version: string = api_Version;
  /**
   * Whatsapp business account id
   */
  private _account_id = '';
  /**
   * Access token
   */
  private _token = ``;

  constructor({
    apiVersion = api_Version,
    accountId,
    token,
  }: {
    /**
     * Whatsapp Api version.
     */
    apiVersion?: string;
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
    this._token = token;
    this._account_id = accountId;
  }

  /**
   * Get all phone number using Whatsapp business account id
   * @returns
   */
  async getPhoneNumberIds(): Promise<GetPhoneNumberIdOption[]> {
    const _header = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._token}`,
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
  async getWabaIds() {
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
  async getWabaData() {
    const _header = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._token}`,
      },
    };
    const response = await Fetch.get(
      `https://graph.facebook.com/${this._api_version}/debug_token?input_token=${this._token}`,
      _header,
    );
    return response.data.data;
  }
}
