export const getAngleAndMagnitude = (x, y) => {
    const angle = (Math.atan2(y, x) * 180) / Math.PI;
    const magnitude = Math.min(1, Math.sqrt(x * x + y * y));
    return { angle, magnitude };
};