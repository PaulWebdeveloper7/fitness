'use client'
import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';import AssignmentIcon from '@mui/icons-material/Assignment';
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />  
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
      <PeopleIcon />   
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentOutlinedIcon /> 
      </ListItemIcon>
      <ListItemText primary="Anaylsis" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />  
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <NotificationsActiveOutlinedIcon />  
      </ListItemIcon>
      <ListItemText primary="Payments" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PaidOutlinedIcon />   
      </ListItemIcon>
      <ListItemText primary="Help Center" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <HelpOutlineOutlinedIcon/>  
      </ListItemIcon>
      <ListItemText primary="Live session" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <SlowMotionVideoIcon />    
      </ListItemIcon>
      <ListItemText primary="Account set up" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AccountCircleIcon />   
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);