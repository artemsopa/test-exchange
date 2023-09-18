import type { Icon } from '@/utils/Icon';

const BackIcon: React.FC<Icon> = ({
  width = '18',
  height = '18',
  color = '#1f003b',
}) => (
  <svg width={width} height={height} viewBox="0 0 1024.00 1024.00" className="icon" xmlns="http://www.w3.org/2000/svg" fill={color} stroke={color} strokeWidth="18.432">
    <g id="SVGRepo_bgCarrier" strokeWidth="0" />
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
    <g id="SVGRepo_iconCarrier">
      <path fill={color} d="M224 480h640a32 32 0 110 64H224a32 32 0 010-64z" />
      <path fill={color} d="M237.248 512l265.408 265.344a32 32 0 01-45.312 45.312l-288-288a32 32 0 010-45.312l288-288a32 32 0 1145.312 45.312L237.248 512z" />
    </g>
  </svg>
);

export default BackIcon;
