import React from 'react';
import Search from './Search'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
export default function Books() {
	const books = useSelector((state) => state.books)
	const user = useSelector((state) => state.auth_user)
	console.log("auth user in book", user, typeof (user))
	console.log(books)



	return (
		<>
			<h5 className="text-center">Welcome {user ? user.name : "user"}</h5>
			<table className="table">
				<thead>
					<tr>
						<th scope="col">sno</th>
						<th scope="col">Name</th>
						<th scope="col">Price</th>
						<th scope="col">Add to cart</th>
					</tr>
				</thead>
				<tbody>
					{books.map((book, ind) => (
						<tr key={ind}>
							<th scope="row">{ind + 1}</th>
							<td>{book.title}</td>
							<td>{book.price}</td>
							<td><Link to={`/order/book/${book._id}`}>🛒</Link></td>
						</tr>
					))}


				</tbody>
			</table>
			<Search />
		</>

	)
}