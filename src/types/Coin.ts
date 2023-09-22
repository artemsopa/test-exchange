export interface Coin {
  main: string;
  title: string;
  shortTitle: string;
  desc: string;
  img: string;
  swap: boolean;
  buysell: boolean;
  dex: boolean;
  min: string;
  max: string;
  regex: RegExp;
}
