import {useRef, useEffect} from 'react';

export function useFinalItemAmount(quantity, price, setTotalFinalPrice) {
    const prevRef = useRef(price * quantity / 100);

    useEffect(() => {
        const previousState = prevRef.current;
        const currentState = (price * quantity) / 100;
        if (previousState === currentState) {
            setTotalFinalPrice((previousState) => previousState + currentState);
        } else {
            setTotalFinalPrice((prevState) => prevState - previousState + currentState);
        }
        prevRef.current = currentState;
    }, [quantity, price, setTotalFinalPrice]);

    return price * quantity / 100;
};