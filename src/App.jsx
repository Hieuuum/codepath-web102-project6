import { useState, useEffect } from "react";
import "./App.css";
import shakespeareWorks from "./data/shakespeare";
import RowEntry from "./components/RowEntry";

function App() {
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
			console.log(json);
		};
		fetchBookData().catch(console.error);
		console.log(shakespeareWorks);
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
							<tr>
								<th>Title</th>
								<th>First Published Year</th>
								<th>Number of Editions</th>
							</tr>
						</thead>
						<tbody>
							{searchInput.length > 0
								? // what happens if we have search input? what list do we use to display coins?
								  filteredResults.map((work) => (
										<RowEntry
											key={work.key}
											title={work.title}
											numOfEditions={work.editions?.numFound ?? "N/A"}
											year={work.first_publish_year ?? "N/A"}
										/>
								  ))
								: list.docs.map((work) => (
										<RowEntry
											key={work.key}
											title={work.title}
											numOfEditions={work.editions?.numFound ?? "N/A"}
											year={work.first_publish_year ?? "N/A"}
										/>
								  ))}
						</tbody>
					</table>
				</div>
			)}
		</>
	);
}

export default App;
