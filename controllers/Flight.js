const axios = require('axios');
require('dotenv').config();

const GetFlightDetails = async (req, res) => {
  const { flightNumber } = req.query;
  try {
    const response = await axios.get(
      `http://api.aviationstack.com/v1/flights?access_key=${process.env.AVIATION_STACK_API_KEY}&flight_iata=${flightNumber}`
    );

    console.log('Response data:', response.data); // Log the full response
    const flight = response.data?.data?.[0]; // Use optional chaining to safely access data

    if (flight) {
      console.log('Parsed Flight Data:', flight); // Log parsed flight data
      res.send(flight);
    } else {
      console.log('No flight found for:', flightNumber); // Log missing flight
      res.status(404).send({ msg: 'Flight not found' });
    }
  } catch (error) {
    console.error('Error fetching flight data:', error); // Log detailed error
    res.status(500).send('Error fetching flight data');
  }
};

module.exports = { GetFlightDetails };
