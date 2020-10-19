import React, { Component } from 'react';
import NavBar from './NavBar';
import ActionBody from './ActionBody';


class LandingPage extends Component {
    state = {
        showSeatServe: false,
        showPickOrder: false,
        chosenScreen: null,
        bookingId: null,
        screenId: null,
        seatNo: null,
        isSubmitDisabled: true
    };

    handleAuditorium = event => {
        event.preventDefault();

        this.setState({
            chosenScreen: event.target.value
        });
    };

    handlePickOrderBtn = (event) => {
        event.preventDefault();

        this.setState({
            showSeatServe: false,
            showPickOrder: true
        });
    };

    handleSeatServeBtn = (event) => {
        event.preventDefault();

        this.setState({
            showSeatServe: true,
            showPickOrder: false
        })
    };
    handleConfirmBtn = (event) => {
        window.location.href = '/food';
    };

    updateBookingId = (value) => {
        this.setState({
            bookingId: value
        });
        this.areDetailsFilled();
    };

    updateScreenId = (value) => {
        this.setState({
            screenId: value
        });
        this.areDetailsFilled();
    };

    updateSeatNumber = (value) => {
        this.setState({
            seatNo: value
        });
        this.areDetailsFilled();
    };

    setDetails = (event) => {
        event.preventDefault();
        console.log(this.state);
    };

    areDetailsFilled = () => {
        if (this.state.showPickOrder) {
            this.setState({
                isSubmitDisabled: this.state.bookingId === null || this.state.screenId === null
            });
        } else if (this.state.showSeatServe) {
            this.setState({
                isSubmitDisabled: this.state.bookingId === null || this.state.screenId === null ||
                this.state.seatNo === null
            });
        } else {
            return this.setState({ isSubmitDisabled: true });
        }
    };

    render() {
        return (
            <div className="main-container">
                <NavBar />
                <div className={!this.state.showSeatServe && !this.state.showPickOrder ? "landing-page-body" : "landing-page-body-hidden"}>
                    <div className="action-pickup">
                        <button className="btn btn-primary pickup"
                                onClick={this.handlePickOrderBtn}>Pickup Order</button>
                    </div>
                    <div className="action-serve">
                        <button className="btn btn-primary seat-serve"
                                onClick={this.handleSeatServeBtn}>Seat Serve</button>
                    </div>
                </div>
                <div className={this.state.showSeatServe || this.state.showPickOrder ? "selected-action-body" : "selected-action-body-hidden"}>
                    <div className="optionTitleRow">
                        <h2>Order Details</h2>
                    </div>
                    <ActionBody isPickupSelected={ this.state.showPickOrder }
                                isSeatServeSelected={ this.state.showSeatServe }
                                updateBookingIdFn = { this.updateBookingId }
                                updateScreenIdFn = { this.updateScreenId }
                                updateSeatNoFn = { this.updateSeatNumber }
                    />
                    <div className="confirm-btn-row">
                        <button className="btn btn-primary" onClick={this.setDetails}
                            disabled={this.state.isSubmitDisabled}>Continue</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default LandingPage;