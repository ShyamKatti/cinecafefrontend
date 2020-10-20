import React, {useState} from 'react';
import {getData} from '../common/ApiUtils';
import foodAppConstants from '../common/urls';
import {useCookies, CookiesProvider} from 'react-cookie';
import {useHistory} from 'react-router-dom';

import '../css/otpauth.scss';

function Feedback({phoneCheckStatus, otpCheckStatus, errorFeedback}) {
    if (phoneCheckStatus === 'Success' && otpCheckStatus === 'Success') {
        return <div className="success-phone-validation">Validation Successful!</div>;
    } else if (phoneCheckStatus === 'Error' || otpCheckStatus === 'Error'){
        return <div className="error-phone-validation">{errorFeedback}</div>;
    } else {
        return<div />;
    }
}

export default function OTPAuthenticator() {
    const [phoneInputDisabled, setPhoneDisabled] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [otpInput, setOtpInput] = useState(null);
    const [btnText, setBtnText] = useState('ENTER');
    const [sessionId, setSessionId] = useState(null);
    const [phoneCheckStatus, setPhoneCheckStatus] = useState(null);
    const [otpCheckStatus, setOtpCheckStatus] = useState(null);
    const [errorFeedback, setErrorFeedback] = useState('');
    const [, setCookie] = useCookies(['_sessionId']);
    let history = useHistory();

    const handleChange = (event) => {
        event.preventDefault();
        if (event.target.id === 'contact-phone') {
            setPhoneNumber(event.target.value);
        } else {
            setOtpInput(event.target.value);
        }
    };

    const onSubmit = (event) => {
        event.preventDefault();

        if (otpInput !== null && phoneNumber !== null) {
            getData(foodAppConstants.services.OTP_VALIDATE, {
                sessionId: sessionId,
                otpCode: otpInput
            }).then(function(response) {
                const responseData = response.data[0];
                setOtpCheckStatus(responseData.Status);
                setCookie('_sessionId', 'phoneChecked', {
                    path: '/',
                    sameSite: 'strict',
                    maxAge: 60 * 60
                });
                history.push('/checkout/cart')
            }).catch(function(response) {
                setOtpCheckStatus('Error');
                setErrorFeedback('Invalid OTP number provided');
            });
        }
        if (otpInput === null && phoneNumber !== null) {
            getData(
                foodAppConstants.services.PHONE_VALIDATE.replace('<phone_number>', phoneNumber))
                .then(function(response) {
                    const responseData = response.data[0];
                    setSessionId(responseData.Details);
                    setPhoneCheckStatus(responseData.Status);
                    setPhoneDisabled(responseData.Status === 'Success');
                    setBtnText('Verify');
                }).catch(function() {
                    setPhoneCheckStatus('Error');
                    setErrorFeedback('Invalid phone number provided');
                });
        }
    };

    return (
        <CookiesProvider>
            <div className="otp-authentication-section">
                <div className="section-header">
                    <div className="bmx-logo">
                        <img src="/assets/images/bmx_logo.png" id="logoIcon" alt="Balaji Logo" />
                    </div>
                    <div className="section-title">
                        Login
                    </div>
                    <div className="section-subtitle">
                        Enter your phone number to continue
                    </div>
                </div>
                <div className="section-body">
                    <form>
                        <fieldset>
                            <legend>Phone Number</legend>
                            <input type="number" id="contact-phone" name="contact-phone"
                                   pattern="[0-9]{10}" disabled={phoneInputDisabled}
                                   onChange={handleChange} required/>
                        </fieldset>
                        <fieldset className={phoneInputDisabled ? 'otp-fieldset-show' : 'otp-fieldset-hidden'}>
                            <legend>OTP</legend>
                            <input type="password" name="otpcode" id="otpcode" onChange={handleChange} />
                        </fieldset>
                        <button type="submit" className="btn btn-primary contact-cta-button"
                                onClick={onSubmit}>{btnText}</button>
                    </form>
                    <Feedback phoneCheckStatus={phoneCheckStatus} otpCheckStatus={otpCheckStatus} errorFeedback={errorFeedback} />
                </div>
            </div>
        </CookiesProvider>
    );
}