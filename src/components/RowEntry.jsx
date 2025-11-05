const RowEntry = ({ title, year, numOfEditions }) => {
	// This component returns a single table row. The parent list should
	// provide a `key` prop on the <RowEntry /> element when used inside a map().
	return (
		<tr>
			<td className="title-cell" data-label="Title">
				{title}
			</td>
			<td className="year-cell" data-label="First Published Year">
				{year}
			</td>
			<td className="editions-cell" data-label="Number of Editions">
				{numOfEditions}
			</td>
		</tr>
	);
};

export default RowEntry;
