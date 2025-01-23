const express = require('express');
const app = express();

// Define the status codes and their corresponding messages
const statusMessages = {
    200: "OK: The request has succeeded. The meaning of this status depends on the HTTP method used.",
    201: "Created: The request has been fulfilled and has resulted in a new resource being created.",
    204: "No Content: The server has successfully processed the request, but there is no content to send in the response.",
    400: "Bad Request: The server cannot process the request due to client-side errors (e.g., malformed syntax).",
    401: "Unauthorized: The client must authenticate itself to get the requested response.",
    403: "Forbidden: The server understood the request but refuses to authorize it.",
    404: "Not Found: The server has not found anything matching the request URI. This is often caused by a missing page or resource.",
    405: "Method Not Allowed: The request method is known by the server but is not supported by the target resource.",
    429: "Too Many Requests: The user has sent too many requests in a given amount of time ('rate limiting').",
    500: "Internal Server Error: The server encountered an unexpected condition that prevented it from fulfilling the request.",
    502: "Bad Gateway: The server was acting as a gateway or proxy and received an invalid response from the upstream server.",
    503: "Service Unavailable: The server is not ready to handle the request. Common causes are server overload or maintenance.",
    504: "Gateway Timeout: The server was acting as a gateway or proxy and did not receive a timely response from the upstream server."
};

// Create the GET endpoint
app.get('/status-info', (req, res) => {
    const code = parseInt(req.query.code, 10); // Get the 'code' query parameter and parse it as an integer

    if (!code || !statusMessages[code]) {
        // Respond with a 400 error if the code is invalid or not supported
        return res.status(400).json({
            status: 400,
            message: "Bad Request: Please provide a valid HTTP status code as the 'code' query parameter."
        });
    }

    // Respond with the status code and its corresponding message
    res.json({
        status: code,
        message: statusMessages[code]
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Status Code API is running on http://localhost:${PORT}`);
});
