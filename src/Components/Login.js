import React from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
export default function Login() {
	const [login, setLogin] = React.useState({});
	const dispatch = useDispatch();


	const handleLogin = (e) => {
		e.preventDefault()
		axios.post('http://localhost:5000/api/login', login).then(resp => {
			console.log(resp.data)
			if (resp.data.success == 1) {
				dispatch({ type: 'AUTH_USER', payload: resp.data.user })
				const auth_user = resp.data.user
				localStorage.setItem("auth_token", JSON.stringify(resp.data.user))
				axios.get('http://localhost:5000/api/fetch/book/', {
					headers: {
						Authorization: `Bearer ${auth_user && auth_user.token ? auth_user.token : null}`
					}
				}).then(resp => {
					console.log("inside app js ", resp.data)
					if (resp.data.books) {
						dispatch({ type: 'ADD_BOOKS', payload: resp.data.books })

					}
				}).catch(err => {
					// console.log("Error occured",err)
				})
			}
		}).catch(err => {
			console.log("Error occured", err)
		})
	}
	return (
		<>
			<h5>email :vivrk22719@gmail.com </h5>
			<h5>password :12345 </h5>

			<form>

				<div className="form-group">
					<label htmlFor="exampleInputEmail1">Email address</label>
					<input onChange={(e) => { setLogin({ ...login, "email": e.target.value }) }} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
					<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
				</div>
				<div className="form-group">
					<label htmlFor="exampleInputPassword1">Password</label>
					<input onChange={(e) => { setLogin({ ...login, "password": e.target.value }) }} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
				</div>
				<button onClick={handleLogin} type="submit" className="btn btn-primary">Submit</button>
			</form>
		</>
	)
}