const express = require("express");
const cors = require("cors");
const { faker } = require("@faker-js/faker");

const app = express();
app.use(cors());
app.use(express.json());

function generateBillingData(count = 20) {
  const data = [];
  for (let i = 1; i <= count; i++) {
    const billing_id = `B${String(i).padStart(3, "0")}`;
    const patient_id = `P${String(i).padStart(3, "0")}`;
    const admission_id = `A${String(i).padStart(3, "0")}`;
    const hospital_id = faker.helpers.arrayElement(["H001", "H002"]);

    const service = faker.helpers.arrayElement([
      "General Consultation",
      "Cardiology",
      "Neurology",
      "Orthopedic Surgery",
      "Chemotherapy",
      "Maternity",
      "Dialysis",
      "ENT Checkup",
      "Dental Cleaning",
      "Physiotherapy"
    ]);

    const amount = faker.number.int({ min: 5000, max: 80000 });
    const tax = amount * 0.05;
    const total = amount + tax;

    data.push({
      billing_id,
      patient_id,
      admission_id,
      hospital_id,
      service_description: service,
      amount,
      tax,
      total_amount: total,
      payment_status: faker.helpers.arrayElement(["Paid", "Pending", "Partially Paid"]),
      payment_method: faker.helpers.arrayElement(["UPI", "Credit Card", "Cash", "Net Banking"]),
      billing_date: faker.date.recent({ days: 30 }).toISOString()
    });
  }
  return data;
}

app.get("/api/billing", (req, res) => {
  const billingData = generateBillingData(40);
  res.json(billingData);
});

app.get("/", (req, res) => {
  res.send("💳 Billing API is running successfully with random data!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
