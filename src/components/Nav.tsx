import { NavType } from "../types/main";

const Nav = ({ selected, selectHandler}: NavType) => {
	return ( 
			<div id="Nav">
			<hr id="rule" />
			<nav id="main_container">
					<div className={selected === "spot" ? "selector selected" : "selector"} onClick={() => selectHandler("spot")}>
						<h1>SPOTIFY</h1>
					</div>
					<div className={selected === "yt" ? "selector selected" : "selector"} onClick={() => selectHandler("yt")}>
						<h1 >YOUTUBE</h1>
					</div>

					<div className={selected === "queue" ? "selector selected" : "selector"} onClick={() => selectHandler("queue")}>
						<h1>QUEUE</h1>
					</div>
			</nav>
			</div>
	)

}

export default Nav;
