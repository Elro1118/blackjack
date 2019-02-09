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
  // if (document.querySelector('h1.hello-world')) {
  //   document.querySelector('h1.hello-world').textContent = 'Hello, World!'
  // }
  document.querySelector('.hitButton').disabled = true
  document.querySelector('.standButton').disabled = true
}

// 1. Fill my deck
const fillDeck = () => {
  for (let i = 0; i < ranks.length; i++) {
    for (let j = 0; j < suits.length; j++) {
      const card = {
        imageCard: 'images' + '/' + ranks[i] + '_of_' + suits[j] + '.svg',
        valueCard: findCardValue(ranks[i]),
        suit: suits[j],
        rank: ranks[i],
        showCard: 0
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
  document.querySelector('.myAd').textContent = 'Lets play!'
  document.querySelector('.startButton').disabled = true
  document.querySelector('.hitButton').disabled = false
  document.querySelector('.standButton').disabled = false
}
// **************************************************************************************
// 4.Hit the deck
const hitDeck = () => {
  let total = 0
  let temp = turnPlayer
  temp++
  const player = {
    hand: turnPlayer,
    cards: deck[0]
  }
  playingCards.push(player)
  displayCards(turnPlayer)
  total = verifierWhoWin(turnPlayer)
  if (total > 21) {
    document.querySelector('.myAd').textContent = 'Player ' + temp + ' BUST!'
    startValues()
  } else if (total === 21) {
    document.querySelector('.myAd').textContent = 'Player ' + temp + ' WIN!'
    startValues()
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
  return total
}

// **************************************************************************************
// 6. Display card
const displayCards = whoseHand => {
  playingCards.forEach(function(element) {
    if (element.hand === whoseHand && element.cards.showCard === 0) {
      let imageRoot = document.createElement('img')
      imageRoot.src = element.cards.imageCard
      let imageSection = document.createElement('section')
      imageSection.appendChild(imageRoot)
      if (element.hand < numberPlayers - 1) {
        document.querySelector('.FirstSubSection').appendChild(imageRoot)
      } else {
        document.querySelector('.table2').appendChild(imageRoot)
      }
      element.cards.showCard = 1
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
// 8. Start Values
const startValues = () => {
  turnPlayer = 0
  numberPlayers = 2
  while (playingCards.length) {
    playingCards.pop()
  }
  while (deck.length) {
    deck.pop()
  }
  document.querySelector('.startButton').disabled = false
  document.querySelector('.hitButton').disabled = true
  document.querySelector('.standButton').disabled = true
  // let clearTable = document.querySelector('FirstSubSection')
  // clearTable.childNodes[0]
}
// **************************************************************************************
document.addEventListener('DOMContentLoaded', main)

document.querySelector('.startButton').addEventListener('click', startGame)
document.querySelector('.hitButton').addEventListener('click', hitDeck)
document.querySelector('.standButton').addEventListener('click', stand)
