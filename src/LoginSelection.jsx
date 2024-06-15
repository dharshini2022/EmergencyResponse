import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';

// Define the initialization function globally
function googleTranslateElementInit() {
  new window.google.translate.TranslateElement({
    pageLanguage: 'en',
    includedLanguages: 'en,ta,hi,kn,te,ml,es,fr,de,it', 
    layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
    autoDisplay: false, // Prevent autoDisplay to manually handle translations
  }, 'google_translate_element');
}

window.googleTranslateElementInit = googleTranslateElementInit;

const images = [
  {
    url: 'https://www.pinclipart.com/picdir/big/20-209908_hospital-clipart-patient-assessment-patient-portal-png-icon.png',
    title: 'Patient Login',
    route: '/plog',
  },
  {
    url: 'https://i.pinimg.com/564x/3f/5a/d8/3f5ad816179850d23695910e906554a7.jpg',
    title: 'Incharge Login',
    route:'/IncLog',
  },
  {
    url: 'https://www.pngkey.com/png/detail/507-5075475_hospital-icon-hospital.png',
    title: 'Hospital Login',
    route: '/hoslogin',
  },
  {
    url: 'https://cdn-icons-png.flaticon.com/512/1716/1716252.png',
    title: 'Admin Login',
    route: '/adminlogin',
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 300,
  width: 300,
  borderRadius: '10px',
  overflow: 'hidden',
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  transform: 'scale(0.8)', // Adjust the scale factor to zoom out
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

const MainContent = styled(Box)({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '16px',
});

const Footer = styled(Box)({
  backgroundColor: 'white',
  color: '#1D2634',
  textAlign: 'center',
  padding: '16px',
  width: '100vw',
});

const Header = styled(AppBar)({
  backgroundColor: 'white',
  color: '#1D2634',
  flexShrink: 0,
  width: '100vw',
});

export default function LoginSelection() {
  const [translatedTitle, setTranslatedTitle] = React.useState({});

  // Function to handle translation
  const translateText = (text) => {
    if (window.google && window.google.translate) {
      const translator = new window.google.translate.TranslateService();
      translator.translate(text, 'en', 'fr', (result) => {
        setTranslatedTitle(result.translation);
      });
    }
  };

  React.useEffect(() => {
    // Load Google Translate API script
    const script = document.createElement('script');
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    // Initialize translation elements
    const initTranslate = () => {
      if (window.google && window.google.translate) {
        googleTranslateElementInit();
      }
    };

    // Check if translation elements are ready
    if (!window.google || !window.google.translate) {
      script.addEventListener('load', initTranslate);
    } else {
      initTranslate();
    }

    // Clean up function
    return () => {
      script.removeEventListener('load', initTranslate);
    };
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'black', gap: '50px' }}>
      <Header position="static">
        <Toolbar>
          <img src="LifeScan_Logo.jpg" alt="Logo" style={{ height: 50, width: 50, borderRadius: '50%', marginRight: 16 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center', fontSize: '2rem', width: 'fit-content' }}>
            Welcome to LifeScan
          </Typography>
          {/* Google Translate Element */}
          <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
            <div id="google_translate_element"></div>
          </Box>
        </Toolbar>
      </Header>

      <MainContent>
        {images.map((image, index) => (
          <Box key={index} className="image-container">
            <Link to={image.route}>
              <ImageButton
                focusRipple
                onMouseEnter={() => translateText(image.title)} // Translate on mouse enter
                onMouseLeave={() => setTranslatedTitle({})} // Clear translation on mouse leave
              >
                <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                <ImageBackdrop className="MuiImageBackdrop-root" />
                <Image>
                  <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    sx={{
                      position: 'relative',
                      p: 4,
                      pt: 2,
                      pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                    }}
                  >
                    {/* Display translated title if available */}
                    {translatedTitle.translatedText || image.title}
                    <ImageMarked className="MuiImageMarked-root" />
                  </Typography>
                </Image>
              </ImageButton>
            </Link>
          </Box>
        ))}
      </MainContent>

      <Footer component="footer">
        <Typography variant="body2">© 2024 LifeScan. All rights reserved.</Typography>
      </Footer>
    </Box>
  );
}
