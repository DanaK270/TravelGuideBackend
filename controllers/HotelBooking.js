const { HotelBooking } = require('../models/HotelBooking');
const stripe = require('../config/stripe');

const CreateHotelBooking = async (req, res) => {
  try {
    const { hotelName, location, user, date, price, paymentMethodId } = req.body;

    // Create Stripe payment
    const payment = await stripe.paymentIntents.create({
      amount: price * 100, // Stripe expects amounts in cents
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
    });

    if (payment.status === 'succeeded') {
      // Save booking if payment is successful
      const booking = await HotelBooking.create({
        hotelName,
        location,
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
    console.error('Error creating hotel booking:', error);
    res.status(500).send('Error creating hotel booking');
  }
};

const GetUserHotelBookings = async (req, res) => {
  try {
    const bookings = await HotelBooking.find({ user: req.params.userId });
    res.send(bookings);
  } catch (error) {
    console.error('Error fetching hotel bookings:', error);
    res.status(500).send('Error fetching hotel bookings');
  }
};

module.exports = { CreateHotelBooking, GetUserHotelBookings };
