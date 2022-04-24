import React from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
export default function Order() {
	const [userDetail, setUserDetail] = React.useState();
	const params = useParams();
	const history = useNavigate();
	const auth_user = useSelector((state) => state.auth_user)
	console.log(params)
	const handleCheckout = (e) => {
		e.preventDefault()
		axios.post('http://localhost:5000/api/save/payment', { ...userDetail, email: auth_user.email }, {
			headers: {
				Authorization: `Bearer ${auth_user && auth_user.token ? auth_user.token : null}`
			}
		}).then(resp => {
			if (resp.data.success == 1) {
				// dispatch({type:'ADD_BOOKS',payload:resp.data.books})
				history('/order/success/')
			}
		}).catch(err => {
			console.log("Error occured", err)
		})
	}
	return (
		<>
			<div className="form-group px-sm-2">
				<h4 className="text-center">Order book</h4>
				<form>
					<div className="form-group">
						<label htmlFor="exampleInputEmail2">Email</label>
						<input onChange={(e) => setUserDetail({ ...userDetail, "email": e.target.value })} value={auth_user ? auth_user.email : null} type="text" className="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" placeholder="Enter Mobile" disabled />
					</div>
					<div className="form-group">
						<label htmlFor="exampleInputEmail1">Enter Mobile</label>
						<input onChange={(e) => setUserDetail({ ...userDetail, "phone": e.target.value })} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Mobile" />
					</div>
					<div className="form-group">
						<label htmlFor="exampleInputPassword1">Enter Address</label>
						<input onChange={(e) => setUserDetail({ ...userDetail, "address": e.target.value })} type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Address" />
					</div>

					<button onClick={handleCheckout} type="submit" className="btn btn-primary">Order</button>
				</form>
			</div>
		</>

	)
}