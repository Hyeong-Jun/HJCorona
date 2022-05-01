import React from 'react';
import * as IoIcons from 'react-icons/io';
import * as MdIcons from 'react-icons/md';
import * as GiIcons from 'react-icons/gi';
// import * as RiIcons from 'react-icons/ri';
export const SidebarData = [
  {
    title: 'Corona',
    path: '/',
    icon: <GiIcons.GiEarthAsiaOceania />
  },
  {
    title: 'About',
    path: '/about',
    icon: <IoIcons.IoIosPaper />
  },
  {
    title: 'Board',
    path: '/board',
    icon: <MdIcons.MdDashboard />
  },
  // {
  //   title: 'Vaccine',
  //   path: '/vaccine',
  //   icon: <RiIcons.RiSyringeLine />
  // }
];