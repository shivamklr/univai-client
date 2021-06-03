import React from "react";
import { Link } from "react-router-dom";
import { Card, Container, Header, Loader, Message } from "semantic-ui-react";
import { useFetchTest } from "../utils/hooks";

function Student() {
    const [tests, { isLoading, isError }] = useFetchTest();
    return (
        <Container>
            <Header as="h1" textAlign="left">
                Take a Test
            </Header>
            {isLoading && <Loader active={isLoading} />}
            {!isLoading &&
                tests.map((test) => {
                    // if(visibility){
                    // TODO:ADD CODE FOR visibility
                    // }
                    return (
                        <Card
                            header={test.name}
                            key={test._id}
                            as={Link}
                            to={`/student/${test._id}`}
                        ></Card>
                    );
                })}
            {isError && (
                <Message negative>
                    <Message.Header>Error while fetching</Message.Header>
                </Message>
            )}
        </Container>
    );
}

export default Student;
