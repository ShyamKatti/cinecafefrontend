const foodAppConstants = {
    services: {
        PHONE_VALIDATE: "http://api.bmxcinemas.com/phonecheck/<phone_number>",
        OTP_VALIDATE: "http://api.bmxcinemas.com/otpcheck",
        RAZORPAY_ORDER: "http://api.bmxcinemas.com/razorpay/order",
        INIT_ORDER: "http://api.bmxcinemas.com/vista/initorder",
        ADD_ITEM: "http://api.bmxcinemas.com/vista/additemorder",
        EXTEND_TIME: "http://api.bmxcinemas.com/vista/extendtimeout",
        PLACE_ORDER: "http://api.bmxcinemas.com/vista/placeorder",
        DELIVERY_URL: "http://api.bmxcinemas.com/vista/delivery",
        MENU_URL: "https://s3.ap-south-1.amazonaws.com/balaji.cinecafe/assets/menu.csv"
    }
};

export default foodAppConstants;