import React from "react";
import { Link } from "react-router-dom";
import { Icon, Menu } from "semantic-ui-react";

function MenuBar() {
    return (
        <Menu size="large">
            <Menu.Item name="home" as={Link} to="/">
                <Icon name="home" size="large" />
                Home
            </Menu.Item>
            <Menu.Menu position="right">
                <Menu.Item name="student" as={Link} to="/student">
                    <Icon name="student" size="large" />
                    Student
                </Menu.Item>
                <Menu.Item name="setting" as={Link} to="/teacher">
                    <Icon name="setting" size="large" />
                    Teacher
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
}

export default MenuBar;
