import { useMemo, useState } from 'react';
import styles from './App.module.css';

const initBoard = [...new Array(9)].map((value) => (value = 0));
const PATTERNS_WIN = [
	[true, true, true, false, false, false, false, false, false],
	[false, false, false, true, true, true, false, false, false],
	[false, false, false, false, false, false, true, true, true],

	[true, false, false, true, false, false, true, false, false],
	[false, true, false, false, true, false, false, true, false],
	[false, false, true, false, false, true, false, false, true],

	[true, false, false, false, true, false, false, false, true],
	[false, false, true, false, true, false, true, false, false],
];

function App() {
	const [board, setBoard] = useState(initBoard);
	const [player, setPlayer] = useState(1);
	const [winningPlayer, setWinningPlayer] = useState(0);

	const isDraw = useMemo(() => {
		return board.every((value) => value !== 0);
	}, [board]);

	const reset = () => {
		setBoard(initBoard);
		setPlayer(1);
		setWinningPlayer(0);
	};

	const checkWin = (playerValue, pattern) => {
		return pattern.some((arr) => {
			for (let i = 0; i < arr.length; i++) {
				if (arr[i] && !playerValue[i]) {
					return false;
				}
			}

			return true;
		});
	};

	const tick = (index) => {
		if (winningPlayer) {
			reset();
			return;
		}

		const newBoard = [
			...board.slice(0, index),
			player,
			...board.slice(index + 1, board.length),
		];
		const playerValue = newBoard.map((value) => value === player);
		const isWinGame = checkWin(playerValue, PATTERNS_WIN);

		if (isWinGame) {
			setWinningPlayer(player);
		}

		setPlayer((prePlayer) => (prePlayer === 1 ? 2 : 1));
		setBoard(newBoard);
	};

	return (
		<div className={styles.App}>
			<div className={styles.info}>
				{winningPlayer !== 0 && `Player ${winningPlayer} won`}
				{isDraw && !winningPlayer && `Draw game`}
				{!winningPlayer && !isDraw && 'Tic Tac Toe'}
			</div>

			<div className={styles.board}>
				{board.map((value, index) => (
					<button
						key={index}
						onClick={() => tick(index)}
						disabled={value !== 0}
					>
						{value === 0 ? '' : value === 1 ? 'X' : 'O'}
					</button>
				))}
			</div>

			<button className={styles.reset} onClick={reset}>
				Reset
			</button>
		</div>
	);
}

export default App;
