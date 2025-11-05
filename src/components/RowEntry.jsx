import { Link } from "react-router";

const RowEntry = ({ title, year, numOfEditions }) => {
	// This component returns a single table row. The parent list should
	// provide a `key` prop on the <RowEntry /> element when used inside a map().
	return (
		<tr>
			<td data-label="Title">
				<Link style={{ color: "Black" }} to={`works/${title}`} key={title}>
					{title}
				</Link>
			</td>

			<td data-label="First Published Year">{year}</td>
			<td data-label="Number of Editions">{numOfEditions}</td>
		</tr>
	);
};

export default RowEntry;
