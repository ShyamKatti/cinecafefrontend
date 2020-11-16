import React, { Component } from 'react';
import NavBar from './NavBar';
import { getData } from "../common/ApiUtils";
import foodAppConstants from '../common/urls';


class LandingPage extends Component {
    state = {
        bookingId: null,
        isSubmitDisabled: true,
        displayLoading: false,
        loadingStatus: 'Checking booking id...',
        backendError: false
    };

    validateAndInitBookingId = () => {
        getData(foodAppConstants.services.VALIDATE_BOOKING_ID_URL, {
            bookingId: this.state.bookingId
        }).then(response => {
            if (response.data) {
                if (response.data[0]) {
                    localStorage.setItem("vistaBookingId", this.state.bookingId);
                    this.setState({
                        loadingStatus: 'Loading menu...'
                    });

                }
            } else {
                this.setState({
                    backendError: true,
                    displayLoading: false
                });
            }
        }).catch(() => {
            this.setState({
              backendError: true,
              displayLoading: false
            });
        });
    };

    handlePickOrderBtn = (event) => {
        event.preventDefault();

        this.setState({
          displayLoading: true
        });
        this.validateAndInitBookingId();
    };

    updateBookingId = (event) => {
        this.setState({
            bookingId: event.currentTarget.value
        });
        this.areDetailsFilled();
    };

    componentDidMount = () => {
        localStorage.clear();
    };

    areDetailsFilled = () => {
        return this.setState(
          {
            isSubmitDisabled: this.state.bookingId === null || this.state.bookingId.length < 4
          }
        );
    };

    render() {
        return (
            <div className="main-container">
                <NavBar showMenu={false} />
                <div className={!this.state.displayLoading ? "landing-page-body" : "display-none"}>
                    <div className="bookingIdRow">
                        <label className="field-label">Booking ID</label>
                        <input type="text" maxLength="10"
                               className="booking-input" onChange={this.updateBookingId} required />
                    </div>
                    <div className={this.state.backendError ? "show-error" : "display-none"}>
                        <span className="error-text">Please check your booking id</span>
                    </div>
                    <div className="action-options">
                        <div className="action-pickup">
                            <button className="btn pickup"
                                    onClick={this.handlePickOrderBtn}>Pickup Order</button>
                        </div>
                    </div>
                </div>
                <div className={this.state.displayLoading ? "loading-state" : "display-none"}>
                    <div className="loading-text">Loading menu...</div>
                    <div className="spinner-grow" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default LandingPage;