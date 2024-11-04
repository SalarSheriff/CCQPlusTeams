//This will connect to the database whether it be excel or sharepoint


import { Client } from '@microsoft/microsoft-graph-client';
import * as microsoftTeams from '@microsoft/teams-js';
import { TeamsUserCredential } from "@microsoft/teamsfx";


let SHAREPOINT_HOST_NAME = "salarsheriff.sharepoint.com";
let SHAREPOINT_SITE_PATH = "/sites/CCQPlusTeamsSharepoint";

const regiments = [
    {
        id: 1,
        name: '1st Regiment',
        motto: 'First and Proud',
        companies: [
            {
                id: 1,
                name: 'A1',
                mascot: "Assassins",
                slogan: "A1 SLOGAN!"
            },
            {
                id: 2,
                name: 'B1',
                mascot: "Barbarians",
                slogan: "B1 SLOGAN!"
            },
            {
                id: 3,
                name: 'C1',
                mascot: "Celts",
                slogan: "C1 SLOGAN!"
            },
            {
                id: 4,
                name: 'D1',
                mascot: "Ducks",
                slogan: "D1 SLOGAN!"
            },
            {
                id: 5,
                name: 'E1',
                mascot: "Vikings",
                slogan: "E1 SLOGAN!"
            },
            {
                id: 6,
                name: 'F1',
                mascot: "Firehouse",
                slogan: "F1 SLOGAN!"
            },
            {
                id: 7,
                name: 'G1',
                mascot: "Greeks",
                slogan: "G1 SLOGAN!"
            },
            {
                id: 8,
                name: 'H1',
                mascot: "Hogs",
                slogan: "H1 SLOGAN!"
            },
            {
                id: 9,
                name: 'I1',
                mascot: "Iron Horses",
                slogan: "Rum Em Down!"
            }
        ]
    },
    {
        id: 2,
        name: '2nd Regiment',
        motto: 'Second to None',
        companies: [
            {
                id: 1,
                name: 'A2',
                mascot: "Spartans",
                slogan: "A2 SLOGAN!"
            },
            {
                id: 2,
                name: 'B2',
                mascot: "Bulldogs",
                slogan: "B2 SLOGAN!"
            },
            {
                id: 3,
                name: 'C2',
                mascot: "Circus",
                slogan: "C2 SLOGAN!"
            },
            {
                id: 4,
                name: 'D2',
                mascot: "Dragons",
                slogan: "D2 SLOGAN!"
            },
            {
                id: 5,
                name: 'E2',
                mascot: "Brewdawgz",
                slogan: "E2 SLOGAN!"
            },
            {
                id: 6,
                name: 'F2',
                mascot: "Zoo",
                slogan: "F2 SLOGAN!"
            },
            {
                id: 7,
                name: 'G2',
                mascot: "Gators",
                slogan: "G2 SLOGAN!"
            },
            {
                id: 8,
                name: 'H2',
                mascot: "Happy",
                slogan: "H2 SLOGAN!"
            },
            {
                id: 9,
                name: 'I2',
                mascot: "Moose",
                slogan: "I2 SLOGAN!"
            }
        ]
    },
    {
        id: 3,
        name: '3rd Regiment',
        motto: 'Tried and True',
        companies: [
            {
                id: 1,
                name: 'A3',
                mascot: "Anacondas",
                slogan: "A3 SLOGAN!"
            },
            {
                id: 2,
                name: 'B3',
                mascot: "Bandits",
                slogan: "B3 SLOGAN!"
            },
            {
                id: 3,
                name: 'C3',
                mascot: "Coyotes",
                slogan: "C3 SLOGAN!"
            },
            {
                id: 4,
                name: 'D3',
                mascot: "Dinos",
                slogan: "D3 SLOGAN!"
            },
            {
                id: 5,
                name: 'E3',
                mascot: "Eagles",
                slogan: "E3 SLOGAN!"
            },
            {
                id: 6,
                name: 'F3',
                mascot: "Troop",
                slogan: "F3 SLOGAN!"
            },
            {
                id: 7,
                name: 'G3',
                mascot: "Gophers",
                slogan: "G3 SLOGAN!"
            },
            {
                id: 8,
                name: 'H3',
                mascot: "Hurricanes",
                slogan: "H3 SLOGAN!"
            },
            {
                id: 9,
                name: 'I3',
                mascot: "Icemen",
                slogan: "I3 SLOGAN!"
            }
        ]
    },
    {
        id: 4,
        name: '4th Regiment',
        motto: 'Fourth and Fierce',
        companies: [
            {
                id: 1,
                name: 'A4',
                mascot: "Apaches",
                slogan: "A4 SLOGAN!"
            },
            {
                id: 2,
                name: 'B4',
                mascot: "Buffaloes",
                slogan: "B4 SLOGAN!"
            },
            {
                id: 3,
                name: 'C4',
                mascot: "Cowboys",
                slogan: "C4 SLOGAN!"
            },
            {
                id: 4,
                name: 'D4',
                mascot: "Dukes",
                slogan: "D4 SLOGAN!"
            },
            {
                id: 5,
                name: 'E4',
                mascot: "Elephants",
                slogan: "E4 SLOGAN!"
            },
            {
                id: 6,
                name: 'F4',
                mascot: "Frogs",
                slogan: "F4 SLOGAN!"
            },
            {
                id: 7,
                name: 'G4',
                mascot: "Guppies",
                slogan: "G4 SLOGAN!"
            },
            {
                id: 8,
                name: 'H4',
                mascot: "Hogs",
                slogan: "H4 SLOGAN!"
            },
            {
                id: 9,
                name: 'I4',
                mascot: "I-Beams",
                slogan: "I4 SLOGAN!"
            }
        ]
    }
]





async function loginAndGetToken() {
    try {
        const credential = new TeamsUserCredential({
            clientId: "961299f6-7113-4aa5-8949-4356fbd73aca",
            initiateLoginEndpoint: "https://<YOUR_DOMAIN>/auth-start.html" // Replace with your Teams app's login endpoint
        });
        const scopes = ["https://graph.microsoft.com/.default"];

        // Acquire token silently using Teams SSO
        const token = await credential.getToken(scopes);
        return token.token;
        console.log("Access token acquired:", token.token);
    } catch (error) {
        console.error("Authentication error:", error);
    }
}

// Function to get user data from Microsoft Graph API
async function getUserDataFromGraph(accessToken) {
    const graphClient = Client.init({
        authProvider: (done) => {
            done(null, accessToken); // Pass the token directly
        },
    });

    try {
        // Call the Graph API to get the current user's profile
        const user = await graphClient.api("/me").get();

        // Return the relevant user data
        return {
            username: user.displayName || user.userPrincipalName || "", // Use displayName or fallback to userPrincipalName
            email: user.mail || user.userPrincipalName || ""            // Use mail or fallback to userPrincipalName
        };
    } catch (error) {
        console.error("Error retrieving user data:", error.message);
        return null; // Return null if there's an error
    }
}




//check if the user is an admin
async function getListOfAdmins(accessToken) {
    const graphClient = Client.init({
        authProvider: (done) => {
            done(null, accessToken); // Pass the token directly
        },
    });

    const hostname = SHAREPOINT_HOST_NAME;
    const sitePath = SHAREPOINT_SITE_PATH;

    try {
        // Step 1: Get the site information
        const site = await graphClient
            .api(`/sites/${hostname}:${sitePath}`)
            .get();

        console.log("Site ID:", site.id);

        // Step 2: Use the site ID to get the "Log" list
        const listName = "AuthorizedAdmins";
        const list = await graphClient
            .api(`/sites/${site.id}/lists/${listName}`)
            .get();

        console.log("List ID:", list.id);

        // Step 3: Retrieve all items in the "Log" list
        const items = await graphClient
            .api(`/sites/${site.id}/lists/${list.id}/items`)
            .expand("fields") // Expand fields to get field values
            .get();

        console.log("Admin Accounts:", items.value);
        return items.value; // Returns an array of log items
    } catch (error) {
        console.error("Error getting log items:", error.message);
    }
}

async function isAdmin(accessToken) {
    let admins = await getListOfAdmins(accessToken);
    let userData = await getUserDataFromGraph(accessToken);
    let user = userData.email;
    let admin = false;
    admins.forEach(element => {
        if (element.fields.email === user) {
            admin = true;
        }
    });
    return admin;
}

// Function to get the SharePoint site
async function getSharePointSiteInformation(accessToken) {

    const graphClient = Client.init({
        authProvider: (done) => {
            done(null, accessToken); // Pass the token directly
        },
    });


    const hostname = SHAREPOINT_HOST_NAME;
    const sitePath = SHAREPOINT_SITE_PATH;

    try {
        const site = await graphClient
            .api(`/sites/${hostname}:${sitePath}`)
            .get();

        console.log("Site ID:", site.id);
        console.log("Site Name:", site.displayName);
    } catch (error) {
        console.error("Error getting site:", error.message);
    }
}

// Function to get all logs from the "Log" list
async function getAllLogs(accessToken) {
    const graphClient = Client.init({
        authProvider: (done) => {
            done(null, accessToken); // Pass the token directly
        },
    });

    const hostname = SHAREPOINT_HOST_NAME;
    const sitePath = SHAREPOINT_SITE_PATH;

    try {
        // Step 1: Get the site information
        const site = await graphClient
            .api(`/sites/${hostname}:${sitePath}`)
            .get();

        console.log("Site ID:", site.id);

        // Step 2: Use the site ID to get the "Log" list
        const listName = "Log";
        const list = await graphClient
            .api(`/sites/${site.id}/lists/${listName}`)
            .get();

        console.log("List ID:", list.id);

        // Step 3: Retrieve all items in the "Log" list
        const items = await graphClient
            .api(`/sites/${site.id}/lists/${list.id}/items`)
            .expand("fields") // Expand fields to get field values
            .get();

        console.log("Log List Items:", items.value);
        return items.value; // Returns an array of log items
    } catch (error) {
        console.error("Error getting log items:", error.message);
    }
}

// New function to get filtered logs based on action, company, and date range
//If action is "all" then it will just give all types of logs

//ex.  getFilteredLogs(accessToken, "all", "I1", "11/29/24", "11/30/24")
async function getFilteredLogs(accessToken, action, company, startDate, endDate) {
    // Call the getAllLogs function to get all log items
    const allLogs = await getAllLogs(accessToken);

    // Convert start and end dates to Date objects for comparison
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Filter logs based on action, company, and date range
    const filteredLogs = allLogs.filter(log => {
        const logAction = log.fields.action;
        const logCompany = log.fields.company;
        const logDate = new Date(log.fields.date);

        return (
            (action === "all" || !action || logAction === action) && // Include all actions if action is "all" or not specified
            (!company || logCompany === company) && // Filter by company if specified
            (!isNaN(logDate) && logDate >= start && logDate <= end) // Filter by date range
        );
    });

    console.log("Filtered Logs:", filteredLogs);
    return filteredLogs; // Returns an array of filtered log items
}


// Function to extract fields from logs
function extractFieldsFromLogs(logs) {
    return logs.map(log => ({
        id: log.fields.id,
        title: log.fields.Title,
        date: log.fields.date,
        time: log.fields.time,
        name: log.fields.name,
        message: log.fields.message,
        action: log.fields.action,
        company: log.fields.company,
        timeOut: log.fields.timeOut,
        createdDateTime: log.createdDateTime,
        modifiedDateTime: log.lastModifiedDateTime,
        webUrl: log.webUrl
    }));
}


// Function to create a new log entry in the "Log" list with individual parameters
async function uploadLog(accessToken, title, date, time, name, message, action, company, timeOut) {
    const graphClient = Client.init({
        authProvider: (done) => {
            done(null, accessToken); // Pass the token directly
        },
    });

    const hostname = SHAREPOINT_HOST_NAME;
    const sitePath = SHAREPOINT_SITE_PATH;

    try {
        // Step 1: Get the site information
        const site = await graphClient
            .api(`/sites/${hostname}:${sitePath}`)
            .get();

        console.log("Site ID:", site.id);

        // Step 2: Get the "Log" list by name
        const listName = "Log";
        const list = await graphClient
            .api(`/sites/${site.id}/lists/${listName}`)
            .get();

        console.log("List ID:", list.id);

        // Step 3: Create a new item in the "Log" list
        const newLog = {
            fields: {
                Title: title,
                date: date,          // Format: MM/DD/YY or YYYY-MM-DD
                time: time,           // Format: HHMM
                name: name,
                message: message,
                action: action,
                company: company,
                timeOut: timeOut      // Default to "n/a" if not provided
            }
        };

        const createdItem = await graphClient
            .api(`/sites/${site.id}/lists/${list.id}/items`)
            .post(newLog);

        console.log("Created Log Item:", createdItem);
        return createdItem; // Returns the newly created log item
    } catch (error) {
        console.error("Error creating log:", error.message);
    }
}


export { regiments, loginAndGetToken,getUserDataFromGraph, getSharePointSiteInformation,getAllLogs,getFilteredLogs, extractFieldsFromLogs, uploadLog, getListOfAdmins, isAdmin };