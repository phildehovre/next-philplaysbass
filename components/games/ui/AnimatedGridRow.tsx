"use client";
import React, {
	useRef,
	useState,
	useLayoutEffect,
	useEffect,
	useCallback,
} from "react";
import { cn } from "@/lib/utils";

type AnimatedGridRowProps = {
	active: boolean;
	children: React.ReactNode;
	className?: string;
};

const HIDE_DELAY = 500;
const TRANSITION_PROP = "height";

const AnimatedGridRow: React.FC<AnimatedGridRowProps> = ({
	active,
	children,
	className,
}) => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const contentRef = useRef<HTMLDivElement | null>(null);

	// height can be a px number or 'auto'
	const [height, setHeight] = useState<number | "auto">(active ? "auto" : 0);
	const [hidden, setHidden] = useState(!active);

	const hideTimeoutRef = useRef<number | null>(null);
	const rafRef = useRef<number | null>(null);

	const clearTimers = useCallback(() => {
		if (hideTimeoutRef.current) {
			window.clearTimeout(hideTimeoutRef.current);
			hideTimeoutRef.current = null;
		}
		if (rafRef.current) {
			cancelAnimationFrame(rafRef.current);
			rafRef.current = null;
		}
	}, []);

	// handle expand / collapse measurements
	useLayoutEffect(() => {
		clearTimers();

		const contentEl = contentRef.current;
		const containerEl = containerRef.current;

		if (active) {
			// Ensure element is visible immediately (remove display:none)
			setHidden(false);

			// measure in next frame to give the browser time to lay out children
			rafRef.current = requestAnimationFrame(() => {
				if (!contentEl) return;
				const measured = contentEl.scrollHeight || contentEl.offsetHeight || 0;
				// set px height to animate from current (0 or previous) -> measured
				setHeight(measured);

				// after the expand transition completes we switch to "auto" (handled in transitionend)
			});
		} else {
			// collapse: start from current content height so the transition has a starting px value
			if (contentEl && containerEl) {
				const currently = contentEl.scrollHeight || contentEl.offsetHeight || 0;
				// set the starting px height (in case it was 'auto')
				setHeight(currently);

				// next frame, set to zero to trigger transition
				rafRef.current = requestAnimationFrame(() => {
					setHeight(0);
				});
			} else {
				setHeight(0);
			}

			// apply hidden after a short delay (you requested 250ms)
			hideTimeoutRef.current = window.setTimeout(() => {
				setHidden(true);
			}, HIDE_DELAY);
		}

		return () => {
			clearTimers();
		};
	}, [active, children, clearTimers]);

	// transitionend: when expanding we set 'auto' so content can grow/shrink naturally
	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;

		const onTransitionEnd = (ev: TransitionEvent) => {
			// only react to height transitions
			if (ev.propertyName !== TRANSITION_PROP) return;

			if (active) {
				// expansion finished: remove inline px height so the element can adjust naturally
				setHeight("auto");
			}
			// when collapsing we already set `hidden` with a timeout; nothing else to do here
		};

		el.addEventListener("transitionend", onTransitionEnd as EventListener);
		return () =>
			el.removeEventListener("transitionend", onTransitionEnd as EventListener);
	}, [active]);

	// style value: undefined when 'auto' to avoid inline px
	const style =
		height === "auto"
			? undefined
			: ({ height: `${height}px` } as React.CSSProperties);

	return (
		<div
			ref={containerRef}
			className={cn(
				"overflow-hidden w-full transition-[height] duration-500 ease-in-out",
				className,
				hidden ? "hidden" : ""
			)}
			style={style}
		>
			<div ref={contentRef} className="h-auto flex justify-center items-center">
				{children}
			</div>
		</div>
	);
};

export default AnimatedGridRow;
