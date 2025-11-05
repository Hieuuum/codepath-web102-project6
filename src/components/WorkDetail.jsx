import { useEffect, useState } from "react";
import { useParams } from "react-router";

const WorkDetail = () => {
	const { title } = useParams();
	const [fullDetails, setFullDetails] = useState(null);

	useEffect(() => {
		const getWorkDetail = async () => {
			const res = await fetch(
				`https://openlibrary.org/search.json?title=${title}&fields=*`
			);
			const json = await res.json();
			// console.log(detailsJson);
			json.docs = json.docs.filter((work, i) => i < 1);
			setFullDetails(json);
		};
		getWorkDetail().catch(console.error);
	}, [title]);

	// console.log(fullDetails);

	return (
		<div>
			<h1>{fullDetails?.docs[0]?.title}</h1>
			{/* description could go here: fullDetails?.textData?.[symbol].Description */}
			<h2 className="coin-algo">
				Made By: {fullDetails?.docs[0]?.author_name}
			</h2>
			<table className="coin-table">
				<tbody>
					<tr>
						<th>First Published year </th>
						<td>{fullDetails?.docs[0]?.first_publish_year} </td>
					</tr>
					<tr>
						<th>Number of Editions </th>
						<td>{fullDetails?.docs[0]?.edition_count} </td>
					</tr>
					<tr>
						<th>Number of Available Languages </th>
						<td>{fullDetails?.docs[0]?.language.length} </td>
					</tr>
					<tr>
						<th>Number of Pages Median </th>
						<td>{fullDetails?.docs[0]?.number_of_pages_median} </td>
					</tr>
					<tr>
						<th>Average Rating </th>
						<td>
							{Math.round(fullDetails?.docs[0]?.ratings_average * 100) / 100}
						</td>
					</tr>
				</tbody>
			</table>
			{/* <CoinChart
				symbol={symbol}
				market={fullDetails?.numbers[symbol].USD.MARKET}
			/> */}
		</div>
	);
};

export default WorkDetail;
