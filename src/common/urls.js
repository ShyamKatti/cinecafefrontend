const foodAppConstants = {
    services: {
        PHONE_VALIDATE: "https://api.bmxcinemas.com/phonecheck/<phone_number>",
        OTP_VALIDATE: "https://api.bmxcinemas.com/otpcheck",
        RAZORPAY_ORDER: "https://api.bmxcinemas.com/razorpay/order",
        INIT_ORDER: "https://api.bmxcinemas.com/vista/initorder",
        ADD_ITEM: "https://api.bmxcinemas.com/vista/additemorder",
        EXTEND_TIME: "https://api.bmxcinemas.com/vista/extendtimeout",
        PLACE_ORDER: "https://api.bmxcinemas.com/vista/placeorder",
        DELIVERY_URL: "https://api.bmxcinemas.com/vista/delivery",
        VALIDATE_BOOKING_ID_URL: "https://api.bmxcinemas.com/vista/validate",
        NOTIFY_VENDOR_URL: "https://api.bmxcinemas.com/order/notify",
        MENU_URL: "https://s3.ap-south-1.amazonaws.com/balaji.cinecafe/assets/menu.csv"
    }
};

export default foodAppConstants;