const axios = require('axios');
require('dotenv').config();

const GetFlightDetails = async (req, res) => {
  const { flightNumber } = req.query;
  try {
    const response = await axios.get(
      `http://api.aviationstack.com/v1/flights?access_key=${process.env.AVIATION_STACK_API_KEY}&flight_iata=${flightNumber}`
    );

    const flight = response.data.data[0]; // Take the first result
    if (flight) {
      res.send(flight);
    } else {
      res.status(404).send({ msg: 'Flight not found' });
    }
  } catch (error) {
    console.error('Error fetching flight data:', error);
    res.status(500).send('Error fetching flight data');
  }
};

module.exports = { GetFlightDetails };
