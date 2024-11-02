import { Paper, Box, Typography, Button } from '@mui/material';


import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';



import A1logo from '../assets/logos/A1logo.png'
import B1logo from '../assets/logos/B1logo.png'
import C1logo from '../assets/logos/C1logo.png'
import D1logo from '../assets/logos/D1logo.png'
import E1logo from '../assets/logos/E1logo.png'
import F1logo from '../assets/logos/F1logo.png'
import G1logo from '../assets/logos/G1logo.png'
import H1logo from '../assets/logos/H1logo.png'
import I1logo from '../assets/logos/I1logo.png'
import A2logo from '../assets/logos/A2logo.png'
import B2logo from '../assets/logos/B2logo.png'
import C2logo from '../assets/logos/C2logo.png'
import D2logo from '../assets/logos/D2logo.png'
import E2logo from '../assets/logos/E2logo.png'
import F2logo from '../assets/logos/F2logo.png'
import G2logo from '../assets/logos/G2logo.png'
import H2logo from '../assets/logos/H2logo.png'
import I2logo from '../assets/logos/I2logo.png'
import A3logo from '../assets/logos/A3logo.png'
import B3logo from '../assets/logos/B3logo.png'
import C3logo from '../assets/logos/C3logo.png'
import D3logo from '../assets/logos/D3logo.png'
import E3logo from '../assets/logos/E3logo.png'
import F3logo from '../assets/logos/F3logo.png'
import G3logo from '../assets/logos/G3logo.png'
import H3logo from '../assets/logos/H3logo.png'
import I3logo from '../assets/logos/I3logo.png'
import A4logo from '../assets/logos/A4logo.png'
import B4logo from '../assets/logos/B4logo.png'
import C4logo from '../assets/logos/C4logo.png'
import D4logo from '../assets/logos/D4logo.png'
import E4logo from '../assets/logos/E4logo.png'
import F4logo from '../assets/logos/F4logo.png'
import G4logo from '../assets/logos/G4logo.png'
import H4logo from '../assets/logos/H4logo.png'
import I4logo from '../assets/logos/I4logo.png'


function CompanyDisplayPaper({ company, mascot, buttonText, handleSelectCompany }) {
    // Load appropriate image based on company name
    let companyLogo = I1logo;
    

    switch (company) {
        case 'A1': companyLogo = A1logo; break;
        case 'B1': companyLogo = B1logo; break;
        case 'C1': companyLogo = C1logo; break;
        case 'D1': companyLogo = D1logo; break;
        case 'E1': companyLogo = E1logo; break;
        case 'F1': companyLogo = F1logo; break;
        case 'G1': companyLogo = G1logo; break;
        case 'H1': companyLogo = H1logo; break;
        case 'I1': companyLogo = I1logo; break;
        case 'A2': companyLogo = A2logo; break;
        case 'B2': companyLogo = B2logo; break;
        case 'C2': companyLogo = C2logo; break;
        case 'D2': companyLogo = D2logo; break;
        case 'E2': companyLogo = E2logo; break;
        case 'F2': companyLogo = F2logo; break;
        case 'G2': companyLogo = G2logo; break;
        case 'H2': companyLogo = H2logo; break;
        case 'I2': companyLogo = I2logo; break;
        case 'A3': companyLogo = A3logo; break;
        case 'B3': companyLogo = B3logo; break;
        case 'C3': companyLogo = C3logo; break;
        case 'D3': companyLogo = D3logo; break;
        case 'E3': companyLogo = E3logo; break;
        case 'F3': companyLogo = F3logo; break;
        case 'G3': companyLogo = G3logo; break;
        case 'H3': companyLogo = H3logo; break;
        case 'I3': companyLogo = I3logo; break;
        case 'A4': companyLogo = A4logo; break;
        case 'B4': companyLogo = B4logo; break;
        case 'C4': companyLogo = C4logo; break;
        case 'D4': companyLogo = D4logo; break;
        case 'E4': companyLogo = E4logo; break;
        case 'F4': companyLogo = F4logo; break;
        case 'G4': companyLogo = G4logo; break;
        case 'H4': companyLogo = H4logo; break;
        case 'I4': companyLogo = I4logo; break;

    }


    return (
        <Paper
            elevation={5}
            sx={{
                width: '350px',
                height: '350px', // Adjust the height as needed

            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '70%', // Match the Box height to the Paper height
                    width: '100%', // Match the Box width to the Paper width
                    overflow: 'hidden',
                }}
            >
                <img
                    src={companyLogo}
                    alt={`${company} Logo`}
                    style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain', // Ensure the image scales without losing aspect ratio
                    }}
                />
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                paddingLeft: '5%',
                paddingRight: '5%',
            }}>

            <Typography
                variant="h4"
                sx={{
                    
                    
                }}>{company + " " + mascot}</Typography>
                <Button onClick={()=>handleSelectCompany(company)} variant='contained' color={buttonText === "Sign In" ? "primary" : "warning"} endIcon={<PlayCircleIcon
                
                sx={{
                    width: '30px',
                    height: '30px',
                }} />} sx={{
                    width: '100%',
                    height: '50px',
                    fontSize: buttonText === "Sign In" ? '1.5rem': '1rem',
                  
                }} 
                
              
                >
                
                
                {buttonText}
                
                
                </Button>
            </Box>
            
                
        </Paper>
    );
}

export default CompanyDisplayPaper;
