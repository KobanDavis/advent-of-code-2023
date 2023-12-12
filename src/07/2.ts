import parseInput from 'lib/parseInput'

const input = await parseInput()

const values = 'J23456789TQKA'

enum HandType {
	HighCard,
	OnePair,
	TwoPair,
	ThreeOfAKind,
	FullHouse,
	FourOfAKind,
	FiveOfAKind,
}

const getHandType = (hand: Record<string, number>) => {
	const values = Object.values(hand)
	switch (values.length) {
		case 1:
			return HandType.FiveOfAKind
		case 2:
			return values.some((value) => value === 4) ? HandType.FourOfAKind : HandType.FullHouse
		case 3:
			return values.some((value) => value === 3) ? HandType.ThreeOfAKind : HandType.TwoPair
		case 4:
			return HandType.OnePair
		case 5:
			return HandType.HighCard
	}
}

const hands = input.map((line) => {
	const [cards, bid] = line.split(' ')
	const hand = cards.split('').reduce<Record<string, number>>((hand, card) => {
		if (card in hand) {
			hand[card]++
		} else {
			hand[card] = 1
		}
		return hand
	}, {})

	if ('J' in hand) {
		const jokers = hand.J
		delete hand.J

		const highestPossibleLabel = Object.entries(hand)
			.sort((a, b) => values.indexOf(b[0]) - values.indexOf(a[0]))
			.sort((a, b) => b[1] - a[1])[0]?.[0]

		// if all jokers, assign highest hand value
		if (highestPossibleLabel === undefined) {
			hand.A = 5
		} else {
			hand[highestPossibleLabel] += jokers
		}
	}

	return {
		cards,
		bid: Number(bid),
		type: getHandType(hand),
	}
})

hands.sort((a, b) => {
	if (a.type === b.type) {
		for (let i = 0; i < a.cards.length; i++) {
			const aValue = values.indexOf(a.cards[i][0])
			const bValue = values.indexOf(b.cards[i][0])
			if (aValue === bValue) continue
			return aValue > bValue ? 1 : -1
		}
	}
	return a.type > b.type ? 1 : -1
})

console.log(hands.reduce((total, hand, i) => total + hand.bid * (i + 1), 0))
