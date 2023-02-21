import {useEffect, useState} from "react";
import axiosClient from "../axios-client";
import {Link, useNavigate, useParams} from "react-router-dom";
import {User} from "../entities/user";
import {useStateContext} from "../contexts/contextProvider";

export default function UserForm() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState<User>()
    const [loading, setLoading] = useState<boolean>(false)
    const [errors, setErrors] = useState(null)
    const {setNotification} = useStateContext()

    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient.get(`/users/${id}`)
                .then(({data}) => {
                    setLoading(false);
                    setUser(data);
                })
                .catch(() => {
                    setLoading(false);
                })
        }, [])
    }

    const onSubmit = (ev: any) => {
        ev.preventDefault();
        if (user?.id) {
            axiosClient.put(`/users/${user.id}`, user)
                .then(() => {
                    setNotification('User was successfully updated')
                    navigate('/users');
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                })
        } else {
            axiosClient.post(`/users`, user)
                .then(() => {
                    setNotification('User was successfully created')
                    navigate('/users');
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                })
        }
    }

    return (
        <>
            {user?.id &&
                <h1> Update User: {user.name}</h1>
            }
            {!user?.id && <h1>New User</h1>}
            <div className="card animated fadeInDown">
                {loading && (
                    <div className="text-center">Loading...</div>
                )}
                {errors && <div className="alert">
                    {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
                }
                {!loading &&
                    <form onSubmit={onSubmit}>
                        <input value={user?.name} onChange={ev => setUser({...user, name: ev.target.value})} placeholder="Name"/>
                        <input type="email" value={user?.email} onChange={ev => setUser({...user, email: ev.target.value})} placeholder="Email"/>
                        <input type="password" placeholder="Password" onChange={ev => setUser({...user, password: ev.target.value})}/>
                        <input type="password" placeholder="Password confirmation" onChange={ev => setUser({...user, password_confirmation: ev.target.value})}/>
                        <button className="btn">Save</button>
                    </form>
                }
            </div>
        </>
    )
}
