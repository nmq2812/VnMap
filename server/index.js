const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');



const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Tài khoản mẫu
const sampleAccount = {
  username: 'kkknnn',
  password: 'kkknnn'
};

// POST endpoint to handle user login
app.post('/api/v1/auth/token', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Thông tin đăng nhập hợp lệ, trả về token
    const tokenResponse = {
      access_token: 'your_access_token',
      token_type: 'Bearer',
      ok: username !== sampleAccount.username || password !== sampleAccount.password
    };

    // Trả về token
    res.json(tokenResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET endpoint to fetch user data
app.get('/api/v1/auth/users/me', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    // Sử dụng token để lấy dữ liệu người dùng
    const userResponse = {
      // Replace this with actual user data fetched using the token
      username: 'example_user',
      email: 'example@example.com'
    };

    // Trả về dữ liệu người dùng
    res.json(userResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
