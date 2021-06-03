import { useState, useEffect } from "react";
import axios from "axios";

export const useForm = (callback, initialState = {}) => {
    const [values, setValues] = useState(initialState);
    const changeHandler = (e) => {
        setValues((prevValues) => {
            return { ...prevValues, [e.target.name]: e.target.value };
        });
    };
    const submitHandler = (event) => {
        event.preventDefault();
        callback();
    };
    return { values, changeHandler, submitHandler };
};

export const useFetchTest = (testId) => {
    const [test, settest] = useState([]);
    const [isError, setisError] = useState(false);
    const [isLoading, setisLoading] = useState(true);
    const url = testId ? `/test/?testId=${testId}` : "/tests";
    useEffect(() => {
        async function fetchData() {
            try {
                setisLoading(true);
                setisError(false);
                const res = await axios.get(url);
                testId
                    ? settest(() => res.data.data.test)
                    : settest(() => res.data.data.tests);
            } catch (error) {
                setisError(true);
                console.log(error);
            } finally {
                setisLoading(false);
            }
        }
        fetchData();
    }, [testId, url]);
    return [test, { isError, isLoading }, settest];
};
