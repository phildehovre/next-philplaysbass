const CIRCLE_RADIUS = 30;
const CIRCLE_CANVAS = 50;
const TAIL_LENGTH = 25;

export const CLOCKFACE_DIMENSIONS = {
	CIRCLE_RADIUS,
	CIRCLE_CANVAS,
	TAIL_LENGTH,
	get radius() {
		return CIRCLE_RADIUS;
	},
	get bonusRadius() {
		return CIRCLE_RADIUS + 8;
	},
	get cx() {
		return CIRCLE_CANVAS;
	},
	get cy() {
		return CIRCLE_CANVAS;
	},
};
