import { apiInstance } from '@/interceptors/axios';
import { InfoResponse } from '@/types/InfoResponse';

export class GeneralService {
  static getInfo = async (isFloat: boolean, amount: string, from: string, to: string) => await apiInstance.post<InfoResponse>(
    'info',
    {
      amount,
      from,
      to,
      promocode: '',
    },
    {
      params: { float: isFloat },
    },
  );

  static checkAddress = async (coint_to: string, network: string, withdrawal: string, withdrawal_extra_id: string | null = null) => await apiInstance.post(
    'withdrawal/check-address',
    {
      coint_to,
      network,
      withdrawal,
      withdrawal_extra_id,
    },
  );
}
