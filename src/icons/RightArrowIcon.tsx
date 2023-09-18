import type { Icon } from '@/utils/Icon';

const RightArrowIcon: React.FC<Icon> = ({
  width = '16',
  height = '16',
  color = '#9b9ea7',
}) => (
  <svg width={width} height={height} viewBox="0 0 1024 1024" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill={color}>
    <g id="SVGRepo_bgCarrier" strokeWidth="0" />
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
    <g id="SVGRepo_iconCarrier"><path d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z" fill={color} /></g>
  </svg>
);

export default RightArrowIcon;
