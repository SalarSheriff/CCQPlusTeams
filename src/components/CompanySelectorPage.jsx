import { Box, Slide, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import CompanyDisplayPaper from "./CompanyDisplayPaper";
import Grid from '@mui/material/Grid2';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import { getAllLogs, getFilteredLogs, getSharePointSiteInformation, regiments } from '../backend.js';
import * as microsoftTeams from "@microsoft/teams-js";
import { Client } from '@microsoft/microsoft-graph-client';
import { TeamsUserCredential } from "@microsoft/teamsfx";


// Transition for the dialogue modal
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function CompanySelectorPage({accessToken}) {
   
    const navigate = useNavigate();
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [confirmationDialogueOpen, setConfirmationDialogueOpen] = useState(false);



    getFilteredLogs(accessToken, "all", "I1", "11/29/24", "11/30/24")


    function handleSelectCompany(company) {
        setSelectedCompany(company);
        setConfirmationDialogueOpen(true);
    }

    const handleConfirmationDialogueClose = () => setConfirmationDialogueOpen(false);

    const handleConfirmationDialogueAccept = () => {
        alert("Uploading a log to API");
        navigate("/ccq/" + selectedCompany);
    };

    return (
        <>
            <Box sx={{ paddingLeft: '5%', paddingRight: '5%', paddingTop: '2%', margin: 'auto', overflow: 'auto' }}>
                {regiments.map((regiment) => (
                    <Grid container spacing={'5%'}>
                        {regiment.companies.map((company) => (
                            <Grid xs={12} sm={12} lg={4} xl={4} key={company.name}>
                                <CompanyDisplayPaper handleSelectCompany={handleSelectCompany} company={company.name} mascot={company.mascot} buttonText="Sign In" />
                            </Grid>
                        ))}
                    </Grid>
                ))}
                <Dialog open={confirmationDialogueOpen} TransitionComponent={Transition} keepMounted onClose={handleConfirmationDialogueClose} aria-describedby="alert-dialog-slide-description">
                    <DialogTitle>Sign Into the {selectedCompany} CCQ</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Confirm signing into the {selectedCompany} CCQ as {"usr"}({"user.email"}).
                            <br />
                            False Logs are subject to the USMA Honor Code
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleConfirmationDialogueClose}>Dismiss</Button>
                        <Button onClick={handleConfirmationDialogueAccept}>Sign In</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </>
    );
}

export default CompanySelectorPage;
