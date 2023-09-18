export interface InfoResponse {
  amount: string;
  applied_promo_code_id: number | null;
  deposit_amount_usdt: string;
  expired_at: string;
  extra_fee_amount: string;
  fee: string;
  max_amount: string;
  min_amount: string;
  networks_from: [];
  networks_to: [];
  profit: string;
  rate: string;
  rate_id: string;
  rate_id_expired_at: number;
  withdrawal_fee: string;
}
