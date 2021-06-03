import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Container, Card, Message, Button } from "semantic-ui-react";
import { useFetchTest, useForm } from "../utils/hooks";
function Teacher() {
    const initialState = {
        testName: "",
    };
    const [postError, setpostError] = useState(false);
    const [postLoading, setpostLoading] = useState(false);
    const { values, changeHandler, submitHandler } = useForm(
        callback,
        initialState
    );
    const [tests, settest, { isLoading, isError }] = useFetchTest();
    async function callback() {
        try {
            setpostLoading(true);
            const res = await axios.post("/test", {
                name: values.testName,
            });
            const newTest = res.data.data.test;
            settest((prevList) => {
                return [...prevList, { ...newTest }];
            });
            setpostError(false);
        } catch (error) {
            setpostError(true);
        } finally {
            setpostLoading(false);
        }
    }
    return (
        <Container text>
            {!isLoading &&
                tests.map((test) => {
                    return (
                        <Card
                            header={test.name}
                            key={test._id}
                            as={Link}
                            to={`/teacher/${test._id}`}
                        ></Card>
                    );
                })}
            <Form loading={postLoading} noValidate>
                <Form.Input
                    label="Test Name"
                    type="text"
                    placeholder="Enter Test Name"
                    name="testName"
                    value={values.testName}
                    onChange={changeHandler}
                />
                <Button onClick={submitHandler}>Submit</Button>
            </Form>
            {isError && (
                <Message negative>
                    <Message.Header>Error while fetching</Message.Header>
                </Message>
            )}
            {postError && (
                <Message negative>
                    <Message.Header>Error while submitting</Message.Header>
                </Message>
            )}
        </Container>
    );
}

export default Teacher;
