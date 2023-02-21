import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import axiosClient from "../axios-client";
import {useStateContext} from "../contexts/contextProvider";

export default function Register() {
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmationRef = useRef<HTMLInputElement>(null);
    const [errors, setErrors] = useState(null)

    const {setUser, setToken} = useStateContext();

    const onSubmit = (ev: any) => {
        ev.preventDefault();
        const payload = {
            name: nameRef.current?.value,
            email: emailRef.current?.value,
            password: passwordRef.current?.value,
            password_confirmation: passwordConfirmationRef.current?.value,
        }

        axiosClient.post('/register', payload)
            .then(({data}) => {
            setToken(data.token);
            setUser(data.user);
        }).catch(err => {
            const response = err.response;
            if(response && response.status === 422){
                setErrors(response.data.errors);
            }
        })
    }

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">
                        Register for free
                    </h1>
                    {errors && <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                    }

                    <input ref={nameRef} type="text" placeholder="Full name"/>
                    <input ref={emailRef} type="email" placeholder="Email address"/>
                    <input ref={passwordRef} type="password" placeholder="Password"/>
                    <input ref={passwordConfirmationRef} type="password" placeholder="Password Confirmation"/>
                    <button className="btn btn-block">Register</button>
                    <p className="message">
                        Already registered? <Link to="/login">Log in</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
