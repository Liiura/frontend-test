import React from 'react';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import HomeIcon from '@material-ui/icons/Home';
import SchoolIcon from '@material-ui/icons/School';
import ClassIcon from '@material-ui/icons/Class';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon:<HomeIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Estudiantes',
    path: '/students',
    icon:<GroupAddIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Mentores',
    path: '/mentors',
    icon: <SchoolIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Clases',
    path: '/lessonsCareer',
    icon: <ClassIcon />,
    cName: 'nav-text'
  }
];
