import prisma from "../../../prisma/index.js";
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

class PaymentController {
  paymentInitiate = async (req, res) => {
    const payload = req.body;
    const { amount } = req.body;


    try {
      const response = await axios.post(
        'https://a.khalti.com/api/v2/epayment/initiate/', payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `key ${process.env.KHALTI_SECRET_KEY}`
        }
      });

      // const {payment_url} = response.data
      // console.log(payment_url)
      res.json(response.data);

      // const payment = await prisma.payment.create({
      //   data: {
      //     paymentAmount: parseFloat(amount)
      //   },
      // });

      // console.log(`this is payment url: ${payment_url}`)
    } catch (error) {
      console.error(error);
    }
  }
  savePayment = async (req, res, next) => {
    const { amount } = req.body;
    const total_amount = parseFloat(amount)
    const userId = req.user.userId;
    try {
      const response = await prisma.payment.create({
        data: {
          paymentAmount: total_amount,
          ownerId: userId
        }
      })
      console.log(response)
    } catch (error) {
      next(error)
    }

  }

  getAllPayment = async (req, res) => {
    try {
        const allPayments = await prisma.payment.findMany({
            include: {
                owner: {
                    select: {
                        username: true,
                        email: true,
                        phoneNumber: true
                    }
                }
            }
        });
        console.log(allPayments);
        res.status(200).json(allPayments); // Send the payments as JSON response
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' }); // Send error response if any
    }
};


}

export const paymentController = new PaymentController();