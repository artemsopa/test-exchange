import type { Icon } from '@/utils/Icon';

const ArrowDownIcon: React.FC<Icon> = ({
  color = '#000000',
  width = '17',
  height = '17',
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.207 13.1714L17.1568 8.22168L18.571 9.63589L12.207 15.9999L5.84302 9.63589L7.25724 8.22168L12.207 13.1714Z"
      fill={color}
    />
  </svg>
);

export default ArrowDownIcon;
