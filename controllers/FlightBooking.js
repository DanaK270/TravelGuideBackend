const { FlightBooking } = require('../models/FlightBooking');
const stripe = require('../config/stripe');

const CreateFlightBooking = async (req, res) => {
  try {
    const { flightNumber, user, date, price, paymentMethodId } = req.body;

    // Create Stripe payment
    const payment = await stripe.paymentIntents.create({
      amount: price * 100, // Stripe expects amounts in cents
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
    });

    if (payment.status === 'succeeded') {
      // Save booking if payment is successful
      const booking = await FlightBooking.create({
        flightNumber,
        user,
        date,
        price,
        paymentInfo: { paymentId: payment.id, status: payment.status },
      });
      res.status(201).send(booking);
    } else {
      res.status(400).send({ msg: 'Payment failed' });
    }
  } catch (error) {
    console.error('Error creating flight booking:', error);
    res.status(500).send('Error creating flight booking');
  }
};

const GetUserFlightBookings = async (req, res) => {
  try {
    const bookings = await FlightBooking.find({ user: req.params.userId });
    res.send(bookings);
  } catch (error) {
    console.error('Error fetching flight bookings:', error);
    res.status(500).send('Error fetching flight bookings');
  }
};

module.exports = { CreateFlightBooking, GetUserFlightBookings };
