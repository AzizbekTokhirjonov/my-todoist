import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { BsFillTagFill } from "react-icons/bs";
// how to use: in order use this component, provide openMenu (initial null value)
// from parent component as well as access to the function to update that state.
// Provide the list of menu items as prop to this component for custom usage

export default function MenuTemplate({
  openMenu,
  closeMenu,
  menuItems,
  setItem

}) {
  const [anchorEl, setAnchorEl] = React.useState(openMenu);
  const open = Boolean(anchorEl);

  const handleClose = (item) => {
    setItem(item)
    closeMenu(null);
  };

  React.useEffect(() => setAnchorEl(openMenu), [openMenu]);

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{ "aria-labelledby": "basic-button" }}
    >
      {menuItems.map((item) => (
        <MenuItem key={item._id} onClick={() => handleClose(item)}>
          {item.type === 'label' ? <> <BsFillTagFill style={{color: item.color}}/>  {item.title} </>: item.title}
        </MenuItem>
      ))}
    </Menu>
  );
}
