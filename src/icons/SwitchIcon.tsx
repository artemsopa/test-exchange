import type { Icon } from '@/utils/Icon';

const SwitchIcon: React.FC<Icon> = ({
  width = '16',
  height = '16',
  color = '#1f003b',
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={width} height={height} viewBox="0,0,256,256">
    <g fill={color} fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: 'normal' }}><g transform="translate(287.79261,43.02292) rotate(107) scale(9.84615,9.84615)"><path d="M13.8125,0c-5.93359,0 -9.73047,4.29297 -9.8125,10h-3.5c-0.19922,0 -0.40625,0.11328 -0.40625,0.3125c-0.10156,0.19922 -0.10156,0.39844 0,0.5l6,7.6875c0.10156,0.10156 0.20703,0.1875 0.40625,0.1875c0.19922,0 0.30469,-0.08594 0.40625,-0.1875l6,-7.6875c0.10156,-0.10156 0.10156,-0.30078 0,-0.5c-0.10156,-0.19922 -0.30469,-0.3125 -0.40625,-0.3125h-3.5c0.06641,-7.53516 3.92188,-9.21094 4.8125,-9.90625c0.19922,-0.10156 0.19922,-0.09375 0,-0.09375zM19.5,7.34375c-0.14844,0 -0.30469,0.05469 -0.40625,0.15625l-6,7.6875c-0.10156,0.19922 -0.09375,0.39844 -0.09375,0.5c0.10156,0.19922 0.30469,0.3125 0.40625,0.3125h3.59375c-0.06641,7.53516 -3.92187,9.21094 -4.8125,9.90625c-0.19922,0.10156 -0.19922,0.09375 0,0.09375c5.93359,0 9.73047,-4.29297 9.8125,-10h3.40625c0.19922,0 0.40625,-0.11328 0.40625,-0.3125c0.19922,-0.19922 0.19531,-0.39844 0.09375,-0.5l-6,-7.6875c-0.10156,-0.10156 -0.25781,-0.15625 -0.40625,-0.15625z" /></g></g>
  </svg>
);

export default SwitchIcon;
