// lib/mock-payment.js

export const processMockPayment = (amount) => {
  return new Promise((resolve, reject) => {
    console.log(`Processing payment of ₦${amount}...`);

    // 1. Simulate Network Delay (2 seconds)
    setTimeout(() => {
      // 2. Simulate Success/Failure
      // We'll make it succeed 90% of the time to teach error handling
      const isSuccessful = Math.random() > 0.1; 

      if (isSuccessful) {
        resolve({
          status: 'success',
          transactionId: `TRX-${Date.now()}`,
          message: 'Payment verified successfully.'
        });
      } else {
        reject({
          status: 'error',
          message: 'Card declined. Please try again.'
        });
      }
    }, 2000); 
  });
};
