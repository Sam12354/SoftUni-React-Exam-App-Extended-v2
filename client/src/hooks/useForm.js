import { useEffect, useState } from 'react';

export const useForm = (initialValues, onSubmitHandler) => {
    const [values, setValues] = useState(initialValues);

    useEffect(() => {
        setValues(initialValues)
    }, [initialValues])
    // vseki put kato useEffect [initialValues] se smeni useEffect 6te se triggerne

    const changeHandler = (e) => {
        setValues(state => ({...state, [e.target.name]: e.target.value}));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        onSubmitHandler(values);
    };

    const changeValues = (newValues) => {
        
        setValues(newValues);
    };

    return {
        values,
        changeHandler,
        onSubmit,
        changeValues,
    };
};