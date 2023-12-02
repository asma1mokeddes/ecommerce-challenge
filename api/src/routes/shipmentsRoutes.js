export const createShipment = async (req, res) => {
    try {

        const token = "ZGVtby1rZXk6ZGVtby1zZWNyZXQ=";

        const headers = new Headers({
            'Content-Type': 'application/json',
            'Message-Reference': 'd0e7832e-5c98-11ea-bc55-0242ac13',
            'Message-Reference-Date': 'Wed, 21 Oct 2015 07:28:00 GMT',
            'Authorization': `Basic ${token}`,
        });

        // Make a request to the DHL API
        const dhlApiUrl = 'https://api-mock.dhl.com/mydhlapi/shipments';
        const shipmentData = req.body;
        const response = await fetch(dhlApiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(shipmentData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();

        res.status(201).json({
            message: 'Shipment created successfully',
            apiResponse: responseData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'An error occurred while creating the shipment',
        });
    }
};