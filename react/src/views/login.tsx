import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import axiosClient from "../axios-client";
import {useStateContext} from "../contexts/contextProvider";

export default function Login() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [errors, setErrors] = useState<any>(null)

    const {setUser, setToken} = useStateContext();

    const onSubmit = (ev: any) => {
        ev.preventDefault();

        const payload = {
            email: emailRef.current?.value,
            password: passwordRef.current?.value,
        }

        setErrors(null);
        axiosClient.post('/login', payload)
            .then(({data}) => {
                setToken(data.token);
                setUser(data.user);
            }).catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
                if (response.data.errors) {
                    setErrors(response.data.errors);
                } else{
                    setErrors({email: [response.data.message]})
                }
            }
        })
    }

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">
                        Login in to your account
                    </h1>
                    {errors && <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                    }
                    <input ref={emailRef} type="email" placeholder="Email"/>
                    <input ref={passwordRef} type="password" placeholder="Password"/>
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Not registered? <Link to="/register">Register</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
