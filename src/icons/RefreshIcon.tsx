import type { Icon } from '@/utils/Icon';

const RefreshIcon: React.FC<Icon> = ({
  width = '13',
  height = '16',
  color = '#1f003b',
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={width} height={height} viewBox="0,0,256,256">
    <g fill={color} fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: 'normal' }}><g transform="translate(285.75489,42.70635) rotate(107) scale(9.84615,9.84615)"><path d="M10,0l-10,2l3.03125,3.03125c-1.75781,2.19141 -2.84375,4.94141 -2.84375,7.96875c0,7.07422 5.73438,12.8125 12.8125,12.8125c7.07813,0 12.8125,-5.73828 12.8125,-12.8125c0,-5.30469 -3.21875,-9.86719 -7.8125,-11.8125v3.09375c3.02734,1.73828 5.0625,4.98047 5.0625,8.71875c0,5.5625 -4.5,10.0625 -10.0625,10.0625c-5.5625,0 -10.0625,-4.5 -10.0625,-10.0625c0,-2.27344 0.75781,-4.34766 2.03125,-6.03125l3.03125,3.03125z" /></g></g>
  </svg>
);

export default RefreshIcon;
