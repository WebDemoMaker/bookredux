import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

export default function Search() {
	const [search, setSearch] = React.useState();
	const dispatch = useDispatch();
	const auth_user = useSelector((state) => state.auth_user)
	const handleSearch = () => {
		console.log(search)
		axios.get(`http://localhost:5000/api/fetch/book/${search}`, {
			headers: {
				Authorization: `Bearer ${auth_user && auth_user.token ? auth_user.token : null}`
			}
		}).then(resp => {
			if (resp.data.books) {
				dispatch({ type: 'ADD_BOOKS', payload: resp.data.books })
			}
			else {
				dispatch({ type: 'ADD_BOOKS', payload: [] })
			}
		}).catch(err => {
			console.log("Error occured", err)
		})
	}
	return (
		<>
			<div className="form-group px-sm-2">
				<label htmlFor="exampleInputSearch" className="font-weight-bold">Search Book by name</label>
				<input onChange={(e) => setSearch(e.target.value)} type="text" className="form-control" id="exampleInputSearch" placeholder="Search by name" />
				<button onClick={handleSearch} className="btn btn-sm btn-outline-primary mt-3">Search</button>

			</div>
		</>

	)
}