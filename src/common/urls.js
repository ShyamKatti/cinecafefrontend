const foodAppConstants = {
    services: {
        PHONE_VALIDATE: "http://localhost:3000/phonecheck/<phone_number>",
        OTP_VALIDATE: "http://localhost:3000/otpcheck",
        RAZORPAY_ORDER: "http://localhost:3000/razorpay/order"
    }
};

export default foodAppConstants;