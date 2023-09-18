import type { Icon } from '@/utils/Icon';

const ArrowRightIcon: React.FC<Icon> = ({
  color = '#000000',
  width = '17',
  height = '17',
}) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.1714 12.0003L8.22168 7.0505L9.63589 5.6363L15.9999 12.0003L9.63589 18.3643L8.22168 16.95L13.1714 12.0003Z" fill={color} fillOpacity="0.4" />
  </svg>
);

export default ArrowRightIcon;
