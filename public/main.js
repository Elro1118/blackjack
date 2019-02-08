let ranks = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'Jack',
  'Queen',
  'King',
  'Ace'
]
let suits = ['spades', 'heart', ' clubs', 'diamonds']
let deck = []
let playingCards = []
let numberPlayers = 5

const main = () => {
  if (document.querySelector('h1.hello-world')) {
    document.querySelector('h1.hello-world').textContent = 'Hello, World!'
  }
  fillDeck()
  ShuffleDeck()
  startGame()
}
// 1. Fill my deck
const fillDeck = () => {
  for (let i = 0; i < ranks.length; i++) {
    for (let j = 0; j < suits.length; j++) {
      const card = {
        image: 'images' + '/' + ranks[i] + '_of_' + suits[j] + '.svg',
        value: findCardValue(ranks[i]),
        suit: suits[j],
        rank: ranks[i]
      }
      deck.push(card)
    }
  }
  console.log(deck)
}

const findCardValue = valueCard => {
  let letterCard = valueCard
  let temp = letterCard.charAt(0) + letterCard.charAt(1)
  switch (temp) {
    case '2':
      return 2
      break
    case '3':
      return 3
      break
    case '4':
      return 4
      break
    case '5':
      return 5
      break
    case '6':
      return 6
      break
    case '7':
      return 7
      break
    case '8':
      return 8
      break
    case '9':
      return 9
      break
    case '10':
      return 10
      break
    case 'Ja':
      return 10
      break
    case 'Qu':
      return 10
      break
    case 'Ki':
      return 10
      break
    case 'Ac':
      return 11
      break
  }
}
// **************************************************************************************
// 2.Shuffle my deck
const ShuffleDeck = () => {
  let temp = 0
  let j = 0

  for (let i = deck.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * i)
    temp = deck[j]
    deck[j] = deck[i]
    deck[i] = temp
  }
  console.log(deck)
}
// **************************************************************************************
// 3.Start the Game
const startGame = () => {
  for (let i = 0; i < numberPlayers; i++) {
    for (let j = 0; j < 2; j++) {
      const player = {
        type: i < numberPlayers - 1 ? 'p' : 'd',
        order: i,
        cards: deck[0]
      }

      playingCards.push(player)
      deck.shift()
    }
  }

  console.log(playingCards)
}
// **************************************************************************************
// 4.Hit the deck
// **************************************************************************************

document.addEventListener('DOMContentLoaded', main)
