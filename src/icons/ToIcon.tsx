import type { Icon } from '@/utils/Icon';

const ToIcon: React.FC<Icon> = ({
  width = '22',
  height = '18',
  color = '#7b7b7b',
}) => (
  <svg width={width} height={height} fill={color} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 909.061 909.062" xmlSpace="preserve" stroke={color} strokeWidth="0.00909061">
    <g id="SVGRepo_bgCarrier" strokeWidth="0" />
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
    <g id="SVGRepo_iconCarrier">
      <g>
        <path d="M454.531,0c-28.995,0-52.5,23.505-52.5,52.5v538.471l-41.747-42.25c-20.38-20.626-53.62-20.825-74.245-0.444 c-20.625,20.379-20.824,53.619-0.445,74.244L415.506,754c9.787,9.905,23.107,15.517,37.031,15.6 c0.105,0.001,0.21,0.001,0.315,0.001c13.81,0,27.07-5.441,36.898-15.154l133.271-131.684c20.625-20.379,20.824-53.619,0.445-74.244 s-53.619-20.824-74.244-0.444l-42.191,41.688V52.5C507.032,23.505,483.526,0,454.531,0z" />
        <path d="M215.721,856.562c0,28.994,23.505,52.5,52.5,52.5H640.84c28.996,0,52.5-23.506,52.5-52.5c0-28.995-23.504-52.5-52.5-52.5 H268.222C239.226,804.062,215.721,827.565,215.721,856.562z" />
      </g>
    </g>
  </svg>
);

export default ToIcon;
