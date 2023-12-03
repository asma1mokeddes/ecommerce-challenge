export const createShipment = async (req, res) => {
    try {
      // Extract necessary information from the request body
      const shipmentData = req.body;
      console.log(process.env.SHIPPO_TOKEN, "| Hey")
      // Call the Shippo API to create a shipment
      const response = await fetch('https://api.goshippo.com/transactions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `ShippoToken ${process.env.SHIPPO_TOKEN}`,
        },
        body: JSON.stringify(shipmentData),
      });
  
      const shipment = await response.json();
  
      // Respond with the created shipment
      return res.status(201).json(shipment);
    } catch (error) {
      console.error('Error creating shipment:', error);
      res.status(500).json({
        error: `An error occurred while creating shipment: ${error.message || error}`,
      });
    }
  }
  
  export const trackShipment = async (req, res) => {
    try {
      // Extract necessary information from the request parameters
      const { id } = req.params;
  
      // Call the Shippo API to track the shipment status
      const trackingResponse = await fetch(`https://api.goshippo.com/tracks/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `ShippoToken ${process.env.SHIPPO_TOKEN}`,
        },
      });
  
      const trackingStatus = await trackingResponse.json();
  
      // Respond with the shipment tracking status
      return res.json(trackingStatus);
    } catch (error) {
      console.error('Error tracking shipment:', error);
      res.status(500).json({
        error: `An error occurred while tracking shipment: ${error.message || error}`,
      });
    }
  }
  