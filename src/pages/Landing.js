import React, { Component } from 'react';
import NavBar from './NavBar';
import { getData } from "../common/ApiUtils";
import foodAppConstants from '../common/urls';


class LandingPage extends Component {
    state = {
        bookingId: null,
        isSubmitDisabled: true,
        isInitOrderReady: false,
        displayLoading: false,
        isSubmitClicked: false
    };

    handlePickOrderBtn = (event) => {
        event.preventDefault();

        this.props.setSeatDelivery(false);
        this.setState({
          displayLoading: !this.state.isInitOrderReady && !this.state.isSubmitDisabled,
          isSubmitClicked: true
        });
    };

    handleSeatServeBtn = (event) => {
        event.preventDefault();

        this.props.setSeatDelivery(true);
        this.setState({
          displayLoading: !this.state.isInitOrderReady && !this.state.isSubmitDisabled,
          isSubmitClicked: true
        });
    };

    updateBookingId = (value) => {
        this.setState({
            bookingId: value
        });
        this.areDetailsFilled();
    };

    componentDidUpdate = () => {
        if (!this.state.displayLoading && this.state.isSubmitClicked) {
            this.props.history.push("/food");
        }
    };

    componentDidMount = () => {
        localStorage.clear();
        getData(foodAppConstants.services.INIT_ORDER, {
            "cinemaCode": 2
        }).then(response => {
            if (response.data) {
              localStorage.setItem("vistaTransId", response.data[0]);
              this.setState({
                isInitOrderReady: true,
                displayLoading: false
              });
            }
        });
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
                    <div className="action-options">
                        <div className="action-pickup">
                            <button className="btn pickup"
                                    onClick={this.handlePickOrderBtn}>Pickup Order</button>
                        </div>
                        <div className="action-serve">
                            <button className="btn seat-serve"
                                    onClick={this.handleSeatServeBtn}>Seat Serve</button>
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