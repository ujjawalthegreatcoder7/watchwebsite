import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// import FormAddress from '../Formadress/addressform';
import { useNavigate } from 'react-router-dom';


export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const navigate = useNavigate();
  const filldeliverydetails = () => {
    navigate('/Riviera Klock/filldeliverydetails');
  }

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      {/* <List>
        {['Payment Details'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton >
              <ListItemIcon>
                {index % 2 === 0 ? <CurrencyRupeeIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
      <Divider />
      <List>
        {['Delivery Details'].map((text, index) => (
          <btn onClick={filldeliverydetails} >
          <ListItem key={text} disablePadding>
            <ListItemButton> 
              <ListItemIcon>
                {index % 2 === 0 ? <LocalShippingIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton> 
          </ListItem>
          </btn>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
         
      <Button onClick={toggleDrawer(true)}>View More</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
