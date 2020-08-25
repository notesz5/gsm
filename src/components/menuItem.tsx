import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import { NavLink, NavLinkProps } from 'react-router-dom'
import SvgIcon from '@material-ui/core/SvgIcon';
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";


export interface MenuItemProps {
  className: string
  link: string
  Icon: typeof SvgIcon
  name: string
}

const MenuItem: React.FC<MenuItemProps> = props => {
  const {className, link, Icon, name} = props
  const NavLinkRef = React.forwardRef((props: NavLinkProps, ref: any) => <NavLink exact {...props} innerRef={ref} />);

  return (
    <ListItem
      button
      disableRipple
      className={className}
      component={NavLinkRef}
      to={link}
    >
      <ListItemIcon>
        <Icon/>
      </ListItemIcon>
      <ListItemText primary={name} />
    </ListItem>
  )
}

export default MenuItem
