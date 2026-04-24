const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

// --- Q1 & Q2: MENU DATA (Catalog with Image URLs) ---
const menu = [
  { id: 1, name: 'Biryani', price: 500, category: 'Desi', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400' },
  { id: 2, name: 'Burger', price: 450, category: 'Fast Food', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400' },
];

// --- Q1: GET MENU ENDPOINT ---
// Jab koi browser mein http://localhost:5050/get-menu kholay ga to usay ye nazar ayega
app.get('/get-menu', (req, res) => {
  console.log("Someone visited the Menu Catalog!");
  res.status(200).json(menu);
});


// --- Q3: ORDER LOGGER ENDPOINT (Tumhara Purana Kaam) ---
app.post('/place-order', (req, res) => {
  const { orderId, itemsList, totalBill, deliveryLocation } = req.body;

  console.log("\n********** NEW ORDER RECEIVED **********");
  console.log(`Order ID:  ${orderId}`);
  console.log(`Items:     ${itemsList}`);
  console.log(`Total:     Rs. ${totalBill}`);
  console.log(`Address:   ${deliveryLocation}`);
  console.log("****************************************\n");

  res.status(200).send({ message: "Success", status: "Order Received by Manager" });
});

// Server Start
app.listen(PORT, () => {
  console.log(`-------------------------------------------`);
  console.log(`Server chal raha hai: http://localhost:${PORT}`);
  console.log(`Check Menu Catalog: http://localhost:${PORT}/get-menu`);
  console.log(`Waiting for orders...`);
  console.log(`-------------------------------------------`);
});