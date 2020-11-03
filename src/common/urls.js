const foodAppConstants = {
    services: {
        PHONE_VALIDATE: "http://cinecafebackend-dev.ap-south-1.elasticbeanstalk.com/phonecheck/<phone_number>",
        OTP_VALIDATE: "http://cinecafebackend-dev.ap-south-1.elasticbeanstalk.com/otpcheck",
        RAZORPAY_ORDER: "http://cinecafebackend-dev.ap-south-1.elasticbeanstalk.com/razorpay/order",
        INIT_ORDER: "http://cinecafebackend-dev.ap-south-1.elasticbeanstalk.com/vista/initorder",
        ADD_ITEM: "http://cinecafebackend-dev.ap-south-1.elasticbeanstalk.com/vista/additemorder",
        EXTEND_TIME: "http://cinecafebackend-dev.ap-south-1.elasticbeanstalk.com/vista/extendtimeout",
        PLACE_ORDER: "http://cinecafebackend-dev.ap-south-1.elasticbeanstalk.com/vista/placeorder",
        DELIVERY_URL: "http://cinecafebackend-dev.ap-south-1.elasticbeanstalk.com/vista/delivery",
        MENU_URL: "https://s3.ap-south-1.amazonaws.com/balaji.cinecafe/assets/menu.csv"
    }
};

export default foodAppConstants;