import { AppBar, Avatar, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import ProfileImage from '../assets/logos/westpointlogo.png'
import React, { useEffect, useState } from 'react';


import { useNavigate } from 'react-router-dom';
function CCQPlusAppBar() {




    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);



    function handleMenuOpen(event) {
        setAnchorEl(event.currentTarget);
    }
    function handleMenuClose() {
        setAnchorEl(null);


    }



    function goToAdminView() {
        navigate('/adminview');
    }
    function goToImageView() {
        navigate('/imageview');
    }
    return (

        <>

            <AppBar position="static" color="primary">


                <Toolbar>
                    

                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        CCQ Plus Microsoft Teams BETA
    </Link>
</Typography>


                    <Tooltip title="AO Image Viewer">


<IconButton onClick={goToImageView}>
<Typography variant="h6">AO Image Viewer</Typography>
    {/* <Avatar src={BTDLogo} /> */}
</IconButton>

</Tooltip>
                    <Tooltip title="Command Team Login">


<IconButton onClick={goToAdminView}>
<Typography variant="h6">Command Team Login</Typography>
    {/* <Avatar src={BTDLogo} /> */}
</IconButton>

</Tooltip>
                    <Tooltip title="Manage Profile">


                        <IconButton onClick={handleMenuOpen}>
                            
                            <Avatar src={ProfileImage} />
                        </IconButton>

                    </Tooltip>
                </Toolbar>
            </AppBar>

        </>
    )
}

export default CCQPlusAppBar