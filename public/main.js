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
let suits = ['spades', 'hearts', 'clubs', 'diamonds']
let deck = []
let playingCards = []
let numberPlayers = 2
let turnPlayer = 0

const main = () => {
  if (document.querySelector('h1.hello-world')) {
    document.querySelector('h1.hello-world').textContent = 'Hello, World!'
  }
}

// 1. Fill my deck
const fillDeck = () => {
  for (let i = 0; i < ranks.length; i++) {
    for (let j = 0; j < suits.length; j++) {
      const card = {
        imageCard: 'images' + '/' + ranks[i] + '_of_' + suits[j] + '.svg',
        valueCard: findCardValue(ranks[i]),
        suit: suits[j],
        rank: ranks[i]
      }
      deck.push(card)
    }
  }
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
}
// **************************************************************************************
// 3.Start the Game
const startGame = () => {
  fillDeck()
  ShuffleDeck()
  for (let i = 0; i < numberPlayers; i++) {
    for (let j = 0; j < 2; j++) {
      const player = {
        hand: i,
        cards: deck[0]
      }
      playingCards.push(player)
      deck.shift()
    }
  }

  displayCards(turnPlayer)
  document.querySelector('.startButton').disabled = true
}
// **************************************************************************************
// 4.Hit the deck
const hitDeck = () => {
  let total = 0
  const player = {
    hand: turnPlayer,
    cards: deck[0]
  }
  playingCards.push(player)
  total = verifierWhoWin(turnPlayer)
  if (total > 21) {
    return 'BUST!'
  } else if (total === 21) {
    return 'WIN!'
  }

  deck.shift()
}
// **************************************************************************************
// 5. Verifier Bust
const verifierWhoWin = whoseHand => {
  let total = 0
  playingCards.forEach(function(element) {
    if (element.hand === whoseHand) {
      console.log(element)
      total += element.cards.valueCard
    }
  })
  // for (let index = 0; index < playingCards.length; index++) {
  //   if (playingCards[index].hand === whoseHand) {
  //     console.log(playingCards[index].cards)
  //     total += 0
  //   }
  // }
  return total
}

// **************************************************************************************
// 6. Display card
const displayCards = whoseHand => {
  playingCards.forEach(function(element) {
    if (element.hand === whoseHand) {
      let imageRoot = document.createElement('img')
      imageRoot.src = element.cards.imageCard
      let imageSection = document.createElement('section')
      imageSection.appendChild(imageRoot)
      if (element.hand < numberPlayers - 1) {
        document.querySelector('.FirstSubSection').appendChild(imageRoot)
      } else {
        document.querySelector('.table2').appendChild(imageRoot)
      }
    }
  })
}
// **************************************************************************************
// 7. Stand
const stand = () => {
  turnPlayer++
  hitDeck(turnPlayer)
  displayCards(turnPlayer)
  document.querySelector('.startButton').disabled = false
}
// **************************************************************************************
document.addEventListener('DOMContentLoaded', main)

document.querySelector('.startButton').addEventListener('click', startGame)
// document
//   .querySelector('.hitButton')
//   .addEventListener('click', hitDeck(turnPlayer))
document.querySelector('.standButton').addEventListener('click', stand)
