import '../App.css';
import { Link } from "react-router-dom";
export default function Success(argument) {
	return (
		<div className="text-center pt-3">
			<img src="https://cdn.pixabay.com/photo/2013/07/12/17/00/approved-151676__340.png" className="imganime" width="200px" />
			<h3 className="text-success">Your order details saved successfully</h3>
			<Link to="/">Back to home</Link>
		</div>
	)
}