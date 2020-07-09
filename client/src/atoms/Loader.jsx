import React from 'react'

export default () => (
  <div className='Loader'>
    <svg
      width='50px'
      viewBox='0 0 300 150'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='svgIcon'>
      <g
        transform='scale(0.5) translate(210 30)'
        stroke='#3D52D5'
        fill='none'
        fillRule='evenodd'
        strokeLinecap='round'
        strokeLinejoin='round'>
        <path
          className='body'
          d='M30.3214 78.3067H315.142C330.368 78.7637 344.817 85.1351 355.423 96.069C366.029 107.003 371.957 121.639 371.95 136.872V177.867C372.081 180.992 371.585 184.111 370.491 187.041C369.396 189.971 367.727 192.653 365.58 194.927C363.433 197.201 360.852 199.023 357.99 200.284C355.128 201.545 352.042 202.22 348.915 202.269H323.146M69.3647 1.00097C69.3647 1.00097 22.3175 93.924 10.7998 118.131C5.32435 129.594 2.01515 141.97 1.03893 154.636C0.671334 163.555 2.91346 172.387 7.49055 180.05C12.0676 187.713 18.7809 193.875 26.8075 197.779M297.573 78.3067L243.888 17.5944C240.594 12.4674 236.057 8.25717 230.698 5.35585C225.339 2.45452 219.333 0.956398 213.239 1.00097H41.4487M249.354 202.269H101.771M147.647 202.269V1.00097'
          stroke-miterlimit='10'
          strokeLinecap='round'
          strokeWidth='17'
        />
      </g>
      <g
        transform='scale(3) translate(1 7)'
        stroke='#3D52D5'
        fill='none'
        fillRule='evenodd'
        strokeLinecap='round'
        strokeLinejoin='round'>
        <ellipse
          strokeWidth='3'
          fill='#3D52D5'
          cx='83.493'
          cy='30.25'
          rx='6.922'
          ry='6.808'
        />
        <ellipse
          strokeWidth='3'
          fill='#3D52D5'
          cx='46.511'
          cy='30.25'
          rx='6.922'
          ry='6.808'
        />
        <path className='line first' d='M22.5 16.5H2.475' strokeWidth='3' />
        <path className='line second' d='M20.5 23.5H.4755' strokeWidth='3' />
        <path className='line third' d='M25.5 9.5h-19' strokeWidth='3' />
      </g>
    </svg>
  </div>
)
