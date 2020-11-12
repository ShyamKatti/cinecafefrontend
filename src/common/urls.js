const foodAppConstants = {
    services: {
        PHONE_VALIDATE: "https://cinecafebackend-dev.ap-south-1.elasticbeanstalk.com/phonecheck/<phone_number>",
        OTP_VALIDATE: "https://cinecafebackend-dev.ap-south-1.elasticbeanstalk.com/otpcheck",
        RAZORPAY_ORDER: "https://cinecafebackend-dev.ap-south-1.elasticbeanstalk.com/razorpay/order",
        INIT_ORDER: "https://cinecafebackend-dev.ap-south-1.elasticbeanstalk.com/vista/initorder",
        ADD_ITEM: "https://cinecafebackend-dev.ap-south-1.elasticbeanstalk.com/vista/additemorder",
        EXTEND_TIME: "https://cinecafebackend-dev.ap-south-1.elasticbeanstalk.com/vista/extendtimeout",
        PLACE_ORDER: "https://cinecafebackend-dev.ap-south-1.elasticbeanstalk.com/vista/placeorder",
        DELIVERY_URL: "https://cinecafebackend-dev.ap-south-1.elasticbeanstalk.com/vista/delivery",
        VALIDATE_BOOKING_ID_URL: "https://cinecafebackend-dev.ap-south-1.elasticbeanstalk.com/vista/validate",
        MENU_URL: "https://s3.ap-south-1.amazonaws.com/balaji.cinecafe/assets/menu.csv"
    }
};

export default foodAppConstants;