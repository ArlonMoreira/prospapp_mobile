import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetErrorMessage } from '../slices/registerPointSlice';

export default function useReduxAlert(errorMessage) {
    const dispatch = useDispatch();
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (errorMessage) {
            setShowAlert(true);
        } else {
            setShowAlert(false);
        }

    }, [errorMessage]);

    useEffect(() => {
        if (!showAlert) {
            dispatch(resetErrorMessage());
        } else {
            const timeout = setTimeout(() => {
                dispatch(resetErrorMessage());
            }, 6000);

            return () => clearTimeout(timeout);
        }

    }, [showAlert]);

    return [showAlert, setShowAlert];

};
