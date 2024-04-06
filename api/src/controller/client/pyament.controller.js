import prisma from "../../../prisma/index.js";
import axios from 'axios';

class PaymentController{
 paymentRequestInitiate = async (formData, req, res) => {
    try {
        const headers = {
          Authorization: `test_secret_key_56cfab56a18f4102b40d66dcb038b71e`,
          "Content-Type": "application/json",
        };
        console.log(headers);
        const response = await axios.post(
          "https://a.khalti.com/api/v2/epayment/initiate/",
          formData,
          {
            headers,
          }
        );
        console.log(response.data);
        console.log(response.data.payment_url);
        res.json({
          message: "khalti success",
          payment_method: "khalti",
          data: response.data,
        });
      } catch (err) {
        console.log(err);
        return res.status(400).json({ error: err?.message });
      }
    }; catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Payment failed' });
    }

    handleKhaltiCallback = async (req, res, next) => {
        try {
          const { pidx, amount, purchase_order_id, transaction_id, message } =
            req.query;
          if (message) {
            return res
              .status(400)
              .json({ error: message || "Error Processing Khalti" });
          }
      
          const headers = {
            Authorization: `Key ${process.env.secretKey}`,
            "Content-Type": "application/json",
          };
          const response = await axios.post("https://a.khalti.com/api/v2/epayment/lookup/", { pidx },{headers});
      
          console.log(response.data);
          if (response.data.status !== "Completed") {
            return res.status(400).json({ error: "Payment not completed" });
          }
      
          console.log(purchase_order_id,pidx);
          req.transaction_uuid = purchase_order_id;
          req.transaction_code = pidx;
          next();
        } catch (err) {
          console.log(err);
          return res
            .status(400)
            .json({ error: err?.message || "Error Processing Khalti" });
        }
      };
  }

export const paymentController = new PaymentController()