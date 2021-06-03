import axios from "axios";
import React, { useState } from "react";
function Teacher() {
    const initialState = {
        testName: "",
    };
    const [postError, setpostError] = useState(false);
    const [postLoading, setpostLoading] = useState(false);
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
        </Container>
    );
export default Teacher;
