import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Route, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const images = [
  {
    url: "https://c8.alamy.com/comp/2E2G4GE/fingerprint-scan-black-vector-icon-scanner-marks-with-finger-print-symbol-2E2G4GE.jpg",
    title: "Scan Fingerprint",
    route: "/pscan"
  },
  // {
  //   url: "Update_Exisiting_Img.jpg",
  //   title: "Update Existing Patient",
  // },
  {
    url: "Add_New_Img.jpg",
    title: "Add New Patient",
    route: "/preg"
  },
];

const ImageButton = styled("button")(({ theme }) => ({
  position: "relative",
  height: 300,
  width: 400,
  borderRadius: "10px",
  overflow: "hidden",
  background: "none",
  border: "none",
  padding: 0,
  cursor: "pointer",
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiTypography-root": {
      border: "4px solid currentColor",
    },
  },
}));

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center",
  transform: "scale(0.8)",
});

const Image = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
}));

const ImageMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)", // Here is the issue
  transition: theme.transitions.create("opacity"),
}));

const MainContent = styled(Box)({
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "16px",
});

const Footer = styled(Box)({
  backgroundColor: "white",
  color: "#1D2634",
  textAlign: "center",
  padding: "16px",
  width: "100vw",
});

const Header = styled(AppBar)({
  backgroundColor: "white",
  color: "#1D2634",
  flexShrink: 0,
  width: "100vw",
});

function InchargeHome() {
  const location = useLocation();
  const { inchargeID } = location.state || {};

  // Log the inchargeID to the console
  React.useEffect(() => {
    console.log("Incharge ID:", inchargeID);
  }, [inchargeID]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "black",
        gap: "50px",
      }}
      
    >
      <Header position="static">
        <Toolbar>
          <img
            src="LifeScan_Logo.jpg"
            alt="Logo"
            style={{ height: 50, marginRight: 16 }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center", fontSize: "2rem" }}
          >
            Welcome to SafeScan
          </Typography>
        </Toolbar>
      </Header>

      <MainContent>
        {images.map((image, index) => (
          <Box key={index} className="image-container">
            <Link to={image.route}>
            <ImageButton>
              <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
              <ImageBackdrop className="MuiImageBackdrop-root" />
              <Image>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  sx={{
                    position: "relative",
                    p: 4,
                    pt: 2,
                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`, // Correct usage of calc
                  }}
                >
                  {image.title}
                  <ImageMarked className="MuiImageMarked-root" />
                </Typography>
              </Image>
            </ImageButton>
            </Link>
          </Box>
        ))}
      </MainContent>

      <Footer component="footer">
        <Typography variant="body2">
          © 2024 SafeScan. All rights reserved.
        </Typography>
      </Footer>
    </Box>
  );
}

export default InchargeHome;
