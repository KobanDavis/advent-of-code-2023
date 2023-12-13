export function gcd(a: number, b: number): number {
	return b == 0 ? a : gcd(b, a % b)
}

export function lcm(a: number, b: number) {
	return (a / gcd(a, b)) * b
}
