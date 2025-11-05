import { useState, useEffect } from "react";
import RowEntry from "./RowEntry";
import {
	ResponsiveContainer,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
} from "recharts";

function Dashboard() {
	const [list, setList] = useState(null);
	const [filteredResults, setFilteredResults] = useState([]);
	const [searchInput, setSearchInput] = useState("");

	const searchItems = (searchValue) => {
		setSearchInput(searchValue);
		if (searchValue !== "") {
			const filteredData = list.docs.filter((item) =>
				Object.values(item)
					.join("")
					.toLowerCase()
					.includes(searchValue.toLowerCase())
			);
			setFilteredResults(filteredData);
			console.log(filteredData);
		} else {
			setFilteredResults(list.docs);
		}
	};

	useEffect(() => {
		const fetchBookData = async () => {
			const response = await fetch(
				"https://openlibrary.org/search.json?q=author%3A%22William+Shakespeare%22&mode=everything&sort=rating&fields=key,title,author_name,editions,first_publish_year"
			);
			let json = await response.json();
			json.docs = json.docs.filter((work, i) => i < 19);
			setList(json);
			// initialize filteredResults with the loaded docs so charts render without a search
			setFilteredResults(json.docs || []);
			console.log(json);
		};
		fetchBookData().catch(console.error);
	}, []);

	return (
		<>
			<h1>William Shakespeare's Works</h1>
			<h2>
				Shakespeare's works include 38 plays, 154 sonnets, 2 long narrative
				poems, and several other poems.
			</h2>

			<input
				type="text"
				placeholder="Search for Title..."
				onChange={(inputTitle) => searchItems(inputTitle.target.value)}
			/>

			<span></span>

			<input
				type="text"
				placeholder="Search for First Published Year..."
				onChange={(inputYear) => searchItems(inputYear.target.value)}
			/>
			<span></span>

			{list && (
				<div className="table-wrap">
					<table className="works-table">
						<thead>
							<tr className="header-row">
								<th>Title</th>
								<th>First Published Year</th>
								<th>Number of Editions</th>
							</tr>
						</thead>
						<tbody>
							{(searchInput.length > 0 ? filteredResults : list.docs).map((work, i) => (
								<RowEntry
									key={work.key ?? `${work.title}-${i}`}
									id={work.key}
									title={work.title}
									numOfEditions={work.editions?.numFound ?? work.edition_count ?? "N/A"}
									year={work.first_publish_year ?? "N/A"}
								/>
							))}
						</tbody>
					</table>
				</div>
			)}

			{/* Charts section - publish years and editions for the first 19 works */}
			{list && (
				<div className="charts">
					{/* prepare data for charts */}
					{(() => {
						const base = (searchInput.length > 0 ? filteredResults : list.docs).slice(0, 19);
						const chartData = base.map((w, idx) => ({
							short: w.title.length > 18 ? w.title.slice(0, 15) + "..." : w.title,
							title: w.title,
							year: typeof w.first_publish_year === "number" ? w.first_publish_year : null,
							editions: Number(w.editions?.numFound ?? w.edition_count ?? 0),
							index: idx,
						}));
						const yearData = chartData.filter((d) => d.year !== null);
						const editionsData = chartData; // editions numeric (0 if missing)
						return (
							<>
								<div className="chart-box">
									<h3>Publish Year (per work)</h3>
									<ResponsiveContainer width="100%" height={260}>
										<BarChart data={yearData} margin={{ top: 10, right: 12, left: 0, bottom: 30 }}>
											<CartesianGrid strokeDasharray="3 3" />
											<XAxis dataKey="short" angle={-30} textAnchor="end" interval={0} height={50} />
											<YAxis />
											<Tooltip formatter={(value, name) => [value, name]} />
											<Bar dataKey="year" fill="#8884d8" />
										</BarChart>
									</ResponsiveContainer>
								</div>
								<div className="chart-box">
									<h3>Number of Editions</h3>
									<ResponsiveContainer width="100%" height={260}>
										<BarChart data={editionsData} margin={{ top: 10, right: 12, left: 0, bottom: 30 }}>
											<CartesianGrid strokeDasharray="3 3" />
											<XAxis dataKey="short" angle={-30} textAnchor="end" interval={0} height={50} />
											<YAxis />
											<Tooltip formatter={(value, name) => [value, name]} />
											<Bar dataKey="editions" fill="#82ca9d" />
										</BarChart>
									</ResponsiveContainer>
								</div>
							</>
						);
					})()}
				</div>
			)}
		</>
	);
}

export default Dashboard;
