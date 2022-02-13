import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventNoteIcon from "@mui/icons-material/EventNote";
import GridViewIcon from "@mui/icons-material/GridView";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import { Link } from "react-router-dom";
const drawerWidth = 300;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function SideMenu({ open, handleDrawerClose, theme }) {
  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader sx={{ backgroundColor: "#424242" }}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon style={{ color: "white" }} />
          ) : (
            <ChevronLeftIcon style={{ color: "white" }} />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List id="drawer-list">
        <Link to="/">
          <ListItem button key="Inbox">
            {open ? (
              <ListItemIcon>
                <MailIcon style={{ color: "#325288" }} />
              </ListItemIcon>
            ) : (
              <Tooltip
                placement="right"
                title="Inbox"
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
              >
                <ListItemIcon>
                  <MailIcon style={{ color: "#325288" }} />
                </ListItemIcon>
              </Tooltip>
            )}
            <ListItemText primary="Inbox"></ListItemText>
          </ListItem>
        </Link>
        <Link to="/today">
          <ListItem button key="Today">
            {open ? (
              <ListItemIcon>
                <EventAvailableIcon style={{ color: "#24A19C" }} />
              </ListItemIcon>
            ) : (
              <Tooltip
                placement="right"
                title="Today"
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
              >
                <ListItemIcon>
                  <EventAvailableIcon sstyle={{ color: "#24A19C" }} />
                </ListItemIcon>
              </Tooltip>
            )}
            <ListItemText primary="Today"></ListItemText>
          </ListItem>
        </Link>
        <Link to="/upcoming">
          <ListItem button key="Upcoming">
            {open ? (
              <ListItemIcon>
                <EventNoteIcon style={{ color: "#D96098" }} />
              </ListItemIcon>
            ) : (
              <Tooltip
                placement="right"
                title="Upcoming"
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
              >
                <ListItemIcon>
                  <EventNoteIcon style={{ color: "#D96098" }} />
                </ListItemIcon>
              </Tooltip>
            )}
            <ListItemText primary="Upcoming"></ListItemText>
          </ListItem>
        </Link>
        <Link to="/filters">
          <ListItem button key="Filters & Labels">
            {open ? (
              <ListItemIcon>
                <GridViewIcon style={{ color: "green" }} />
              </ListItemIcon>
            ) : (
              <Tooltip
                placement="right"
                title="Filters & Labels"
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
              >
                <ListItemIcon>
                  <GridViewIcon style={{ color: "green" }} />
                </ListItemIcon>
              </Tooltip>
            )}
            <ListItemText primary="Filters & Labels"></ListItemText>
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <ListItem button key="Favorites">
          <ListItemIcon>
            {open ? (
              <ChevronRightIcon />
            ) : (
              <Tooltip
                placement="right"
                title="Favorites"
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
              >
                <FavoriteIcon style={{ color: "red" }} />
              </Tooltip>
            )}
          </ListItemIcon>
          <ListItemText primary="Favorites" />
        </ListItem>
        <ListItem button key="Projects">
          <ListItemIcon>
            {open ? (
              <ChevronRightIcon />
            ) : (
              <Tooltip
                placement="right"
                title="Projects"
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
              >
                <AppRegistrationIcon style={{ color: "#B3541E" }} />
              </Tooltip>
            )}
          </ListItemIcon>
          <ListItemText primary="Projects" />
        </ListItem>
        <ListItem button key="Archive">
          <ListItemIcon>
            {open ? (
              <ChevronRightIcon />
            ) : (
              <Tooltip
                placement="right"
                title="Archive"
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
              >
                <ArchiveIcon style={{ color: "#362222" }} />
              </Tooltip>
            )}
          </ListItemIcon>
          <ListItemText primary="Archive" />
        </ListItem>
      </List>
    </Drawer>
  );
}
