import prisma from "../../../prisma/index.js";
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();  

class PaymentController {
  paymentInitiate = async (req, res) => {
    const payload = req.body;
    // console.log(payload)
    
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
      // console.log(`this is payment url: ${payment_url}`)
    } catch (error) {
      console.error(error); 
    }
  }
//   confirmTransaction = async (publicKey, token, confirmationCode, transactionPin)=> {
//     try {
        
//         const confirmResponse = await axios.post('https://khalti.com/api/v2/payment/confirm/', {
//             public_key: publicKey,
//             token: token,
//             confirmation_code: confirmationCode,
//             transaction_pin: transactionPin
//         });

//         console.log('Confirm Transaction Response:', confirmResponse.data);
//         return confirmResponse.data; // Return the confirmation response
//     } catch (error) {
//         console.error('Error confirming transaction:', error.response.data);
//         throw error; // Propagate the error to be caught by the calling function
//     }
// }
}

export const paymentController = new PaymentController();
