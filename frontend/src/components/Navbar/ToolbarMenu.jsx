import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import HomeIcon from "@mui/icons-material/Home";
import AutoCompleteSearch from "./AutocompleteSearch";
import { BsQuestionCircle } from "react-icons/bs";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions/actions";
const ToolbarMenu = ({ handleDrawerOpen, open }) => {
  const dispatch = useDispatch();
  return (
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{
          marginRight: "36px",
          ...(open && { display: "none" }),
        }}
      >
        <MenuIcon />
      </IconButton>

      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ mr: 2 }}
      >
        <HomeIcon />
      </IconButton>
      <AutoCompleteSearch />
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge color="error">
            <AiOutlinePlus size={25} />
          </Badge>
        </IconButton>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge color="error">
            <QueryStatsIcon />
          </Badge>{" "}
          <span style={{ fontSize: "13px", marginLeft: "5px" }}> 0/5</span>
        </IconButton>

        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge color="error">
            <BsQuestionCircle size={23} />
          </Badge>
        </IconButton>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-haspopup="true"
          color="inherit"
          onClick={() => dispatch(logoutUser())}
        >
          <AccountCircle />
        </IconButton>
      </Box>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="show more"
          aria-haspopup="true"
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
      </Box>
    </Toolbar>
  );
};

export default ToolbarMenu;
