import React from 'react';
import '../css/pickup-form.scss';
import '../css/seat-serve-form.scss';
import Select from 'react-select';


function PickUpBody({updateBookingIdFn, updateSeatIdFn}) {
    const onBookingIdChange = (event) => {
        event.preventDefault();
        updateBookingIdFn(event.target.value);
    };

    const onScreenIdChange = (event) => {
        event.preventDefault();
        updateSeatIdFn(event.target.value);
    };

    return (
        <div className="pickUpBody">
            <div className="bookingIdRow">
                <label className="field-label">Booking ID</label>
                <input type="text" maxLength="10"
                       className="booking-input" onChange={onBookingIdChange} required />
            </div>
            <div className="screen-id-row">
                <label className="field-label">Screen No</label>
                <input type="text" maxLength="2"
                       className="screen-input" onChange={onScreenIdChange} required />
            </div>
        </div>
    )
};

function SeatServeBody({updateBookingIdCb, updateScreenIdCb, updateSeatNoCb}) {

    const screenList = [
        {value: 'screen1', label: 'Screen 1'},
        {value: 'screen2', label: 'Screen 2'},
        {value: 'screen3', label: 'Screen 3'},
        {value: 'screen4', label: 'Screen 4'}
    ];

    const updateBookingId = (event) => {
        event.preventDefault();
        updateBookingIdCb(event.target.value);
    };

    const updateScreenId = (event) => {
        updateScreenIdCb(event.value);
    };

    const updateSeatNo = (event) => {
        event.preventDefault();
        updateSeatNoCb(event.target.value);
    };

    return (
        <div className="seat-serve-body">
            <div className="bookingIdRow">
                <label className="field-label">Booking ID</label>
                <input type="text" maxLength="10"
                       className="booking-input" onChange={updateBookingId} required/>
            </div>
            <div className="screen-selector-row">
                <label className="field-label">Screen Number</label>
                <Select className="select-box" options={screenList}
                        onChange={updateScreenId} />
            </div>
            <div className="seat-id-row">
                <label className="field-label">Seat Number</label>
                <input type="text" maxLength="3"
                        className="seat-input-field" onChange={updateSeatNo} required/>
            </div>
        </div>
    )
};

function ActionBody(props) {
    if (props.isPickupSelected) {
        return (
                <PickUpBody updateBookingIdFn={props.updateBookingIdFn}
                            updateSeatIdFn={props.updateScreenIdFn}
                />
        );
    } else if (props.isSeatServeSelected) {
        return (
                <SeatServeBody updateBookingIdCb={props.updateBookingIdFn}
                            updateScreenIdCb={props.updateScreenIdFn}
                            updateSeatNoCb={props.updateSeatNoFn}
                />
        );
    } else {
        return null;
    }
};

export default ActionBody;