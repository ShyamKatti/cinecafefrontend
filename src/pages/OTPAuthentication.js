import React, {useState, useEffect} from 'react';
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
        return <div />;
    }
}

export default function OTPAuthenticator({phoneNumber, setPhoneNumber}) {
    const [phoneInputDisabled, setPhoneDisabled] = useState(false);
    const [otpInput, setOtpInput] = useState(null);
    const [btnText, setBtnText] = useState('ENTER');
    const [sessionId, setSessionId] = useState(null);
    const [phoneCheckStatus, setPhoneCheckStatus] = useState(null);
    const [otpCheckStatus, setOtpCheckStatus] = useState(null);
    const [errorFeedback, setErrorFeedback] = useState('');
    const [, setCookie] = useCookies(['_sessionId']);
    const [displayLoading, setDisplayLoading] = useState(false);
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
                history.push('/checkout/cart', {
                    phoneNumber: phoneNumber
                });
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

    useEffect(() => {
        localStorage.removeItem("vistaTransId");
        setDisplayLoading(true);
        getData(foodAppConstants.services.INIT_ORDER, {
            "cinemaCode": 2
        }).then(response => {
            if (response.data) {
                localStorage.setItem("vistaTransId", response.data[0]);
                setDisplayLoading(false);
                this.props.history.push("/checkout/cart");
            } else {
                setDisplayLoading(false);
            }
        }).catch(() => {
            setDisplayLoading(false);
        });
    }, []);

    return (
        <CookiesProvider>
            <div className={!displayLoading ? "otp-authentication-section" : "display-none"}>
                <div className="section-header">
                    <div className="bmx-logo">
                        <img src="https://s3.ap-south-1.amazonaws.com/balaji.cinecafe/assets/bmx_logo.png"
                             id="logoIcon" alt="Balaji Logo" />
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
            <div className={displayLoading ? "loading-state" : "display-none"}>
                <div className="loading-text">Starting your order process...</div>
                <div className="spinner-grow" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </CookiesProvider>
    );
}