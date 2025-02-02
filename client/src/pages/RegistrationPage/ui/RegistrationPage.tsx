import React from "react";
import {RegistrationForm} from "features/Registration";
import {useNavigate} from "react-router-dom";

const RegistrationPage = () => {
    const navigate = useNavigate();

    const onToggle = () => {
        //navigate(RoutePath.main);
    }

    return (
        <div>
            <RegistrationForm
                onSuccess={onToggle}
            />
        </div>
    );
}

export default RegistrationPage;
