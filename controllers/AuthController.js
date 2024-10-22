const { User } = require('../models/User');
const middleware = require('../middleware');

// Register a new user
const Register = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    // Check if user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('A user with that email has already been registered!');
    }

    // Hash the password
    let passwordDigest = await middleware.hashPassword(password);

    // Create a new user
    const user = await User.create({
      name,
      email,
      passwordDigest,
      role: role || 'user', // Default role is 'user'
    });

    res.status(201).send(user); // Send newly created user as response
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 'Error', msg: 'Registration failed!' });
  }
};

// Login an existing user
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send('User does not exist!');
    }

    // Compare the provided password with the stored password digest
    let matched = await middleware.comparePassword(user.passwordDigest, password);
    if (matched) {
      // Create payload and JWT token if passwords match
      let payload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };
      let token = middleware.createToken(payload);

      return res.send({ user: payload, token });
    }

    res.status(401).send({ status: 'Error', msg: 'Unauthorized' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 'Error', msg: 'Login failed!' });
  }
};

// Update the user's password
const UpdatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // Find the user by ID
    let user = await User.findById(req.params.user_id);
    if (!user) {
      return res.status(404).send({ status: 'Error', msg: 'User not found!' });
    }

    // Compare the provided old password with the stored password digest
    let matched = await middleware.comparePassword(user.passwordDigest, oldPassword);
    if (matched) {
      // Hash the new password and update the user in the database
      let passwordDigest = await middleware.hashPassword(newPassword);
      await User.findByIdAndUpdate(req.params.user_id, { passwordDigest });

      let payload = { id: user.id, email: user.email };

      return res.send({ status: 'Password Updated!', user: payload });
    }

    res.status(401).send({ status: 'Error', msg: 'Old Password did not match!' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 'Error', msg: 'Password update failed!' });
  }
};

// Check the current user's session
const CheckSession = async (req, res) => {
  const { payload } = res.locals;
  res.send(payload); // Send the decoded JWT payload
};

// Verify if the user has admin privileges
const verifyAdmin = (req, res, next) => {
  const { role } = res.locals.payload;

  if (role === 'admin') {
    return next(); // Allow if the user is an admin
  }

  res.status(403).send({ status: 'Error', msg: 'Forbidden: Admins only' }); // Block if not an admin
};

module.exports = {
  Register,
  Login,
  UpdatePassword,
  CheckSession,
  verifyAdmin,
};
