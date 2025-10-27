import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const AnimatedNumber = ({ data }: { data: number | Date | string }) => {
	const [displayed, setDisplayed] = useState(data);

	useEffect(() => {
		setDisplayed(data);
	}, [data]);

	return (
		<div className="relative h-8 overflow-hidden flex justify-center w-full text-center">
			<AnimatePresence initial={false}>
				<motion.span
					key={`${data}`}
					initial={{ y: 32, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: -32, opacity: 0 }}
					transition={{ duration: 0.3 }}
					className="absolute mx-auto"
				>
					{data.toLocaleString()}
				</motion.span>
			</AnimatePresence>
		</div>
	);
};

export default AnimatedNumber;
