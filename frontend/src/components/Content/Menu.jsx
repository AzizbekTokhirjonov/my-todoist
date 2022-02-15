import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// how to use: in order use this component, provide openMenu (initial null value)
// from parent component as well as access to the function to update that state.
// Provide the list of menu items as prop to this component for custom usage

export default function MenuTemplate({
  openMenu,
  closeMenu,
  menuItems,
  setPriority,
  setTaskLabel,
  title,
}) {
  const [anchorEl, setAnchorEl] = React.useState(openMenu);
  const open = Boolean(anchorEl);

  const handleClose = (e) => {
    title === "label"
      ? setTaskLabel(e.target.innerText)
      : setPriority(e.target.innerText);
    console.log(e.target.innerText);
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
        <MenuItem key={item} onClick={handleClose}>
          {item}
        </MenuItem>
      ))}
    </Menu>
  );
}
