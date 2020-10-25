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

        if (this.state.showPickOrder) {
            localStorage.setItem("deliveryInfo", JSON.stringify({
              bookingId: this.state.bookingId,
              screenId: this.state.screenId
            }));
            this.props.history.push("/food");
        } else if (this.state.showSeatServe) {
            localStorage.setItem("deliveryInfo", JSON.stringify({
              bookingId: this.state.bookingId,
              screenId: this.state.screenId,
              seatNo: this.state.seatNo
            }));
            this.props.history.push("/food");
        } else {
            // No op
        }
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
                <NavBar showMenu={false} />
                <div className={!this.state.showSeatServe && !this.state.showPickOrder ? "landing-page-body" : "landing-page-body-hidden"}>
                    <div className="action-pickup">
                        <button className={!this.state.showPickOrder ?"btn pickup" : "btn pickup-active"}
                                onClick={this.handlePickOrderBtn}>Pickup Order</button>
                    </div>
                    <div className="action-serve">
                        <button className={!this.state.showSeatServe ?   "btn seat-serve" : "btn seat-serve-active"}
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
                        <button className=" btn-confirm" onClick={this.setDetails}
                            disabled={this.state.isSubmitDisabled}>Continue</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default LandingPage;