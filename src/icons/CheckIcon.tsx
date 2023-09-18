import type { Icon } from '@/utils/Icon';

const CheckIcon: React.FC<Icon> = ({
  color = '#662bcf',
  width = '22',
  height = '22',
}) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" strokeWidth="0" />
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
    <g id="SVGRepo_iconCarrier">
      <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
);

export default CheckIcon;
