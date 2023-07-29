import { useState } from "react";
import { useDispatch } from "react-redux";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";
import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';

const defaultFormFields = {
    email: "",
    password: ""
};

const SignInForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart());
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            dispatch(emailSignInStart(email, password));
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case "auth/wrong-password":
                    alert("Incorrect password for email!");
                    break;
                case "auth/user-not-found":
                    alert("No user associated with this email!");
                    break;
                default:
                    console.log(error);
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={email}
                    required />

                <FormInput
                    label="Password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={password}
                    required />

                <ButtonsContainer>
                    <Button type="submit">Sign In</Button>
                    <Button buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Sign In with Google</Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    );
};

export default SignInForm;
