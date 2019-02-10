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
let imageSection
let total = 0
let restart = 0

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
  if (restart === 1) {
    startValues()
  }
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
  for (let index = 0; index < numberPlayers; index++) {
    imageSection = document.createElement('section')
    if (index === numberPlayers - 1) {
      imageSection.id = 'dealerSection'
      document.querySelector('.ThirdSubSection').appendChild(imageSection)
    } else {
      imageSection.id = 'playerSection' + index
      document.querySelector('.FirstSubSection').appendChild(imageSection)
    }
  }
  displayCards()
  displayFirstCardDealer()
  document.querySelector('.myAd').textContent = 'Lets play!'
  document.querySelector('.startButton').disabled = true
  document.querySelector('.hitButton').disabled = false
  document.querySelector('.standButton').disabled = false
}
// **************************************************************************************
// 4.Hit the deck
const hitDeck = () => {
  // if (playingCards.length === 0) {
  const player = {
    hand: turnPlayer,
    cards: deck[0]
  }
  playingCards.push(player)
  // } else {
  //   playingCards.forEach(function(element) {
  //     if (element.hand === turnPlayer) {
  //       element.addCars(deck[0])
  //     }
  //   })
  // }

  deck.shift()
  displayCards()
}
// **************************************************************************************
// 5. Verifier Bust
const verifierWhoWin = () => {
  total = 0
  let temp = turnPlayer
  temp++
  let typePlayer = turnPlayer < numberPlayers - 1 ? 'Player ' + temp : 'Dealer '

  playingCards.forEach(function(element) {
    if (element.hand === turnPlayer) {
      total += element.cards.valueCard
    }
  })
  console.log(total)
  if (total > 21) {
    document.querySelector('.myAd').textContent = typePlayer + ' BUST!'
    restart = 1
    document.querySelector('.startButton').disabled = false
    document.querySelector('.hitButton').disabled = true
    document.querySelector('.standButton').disabled = true
  } else if (total === 21) {
    document.querySelector('.myAd').textContent = typePlayer + ' WIN!'
    restart = 1
    document.querySelector('.startButton').disabled = false
    document.querySelector('.hitButton').disabled = true
    document.querySelector('.standButton').disabled = true
  }
}

// **************************************************************************************
// 6. Display card
const displayCards = () => {
  playingCards.forEach(function(element) {
    if (element.hand === turnPlayer && element.cards.showCard === 0) {
      let imageRoot = document.createElement('img')
      imageRoot.src = element.cards.imageCard

      if (element.hand < numberPlayers - 1) {
        let temp = 'playerSection' + turnPlayer

        document.getElementById(temp).appendChild(imageRoot)
      } else {
        let temp2 = 'dealerSection'
        document.getElementById(temp2).appendChild(imageRoot)
      }
      element.cards.showCard = 1
    }
  })
  verifierWhoWin()
}
const displayFirstCardDealer = () => {
  let temp = playingCards[2].cards.imageCard
  playingCards[2].cards.showCard = 1
  let visTemp = playingCards[2].cards.showCard
  console.log(temp + ' ' + visTemp)

  let imageRoot = document.createElement('img')
  imageRoot.src = temp
  let temp2 = 'dealerSection'
  document.getElementById(temp2).appendChild(imageRoot)

  let imageBack = document.createElement('img')
  imageBack.src = '/images/back.jpg'
  let temp3 = 'dealerSection'
  document.getElementById(temp3).appendChild(imageBack)
}
// **************************************************************************************
// 7. Stand
const stand = () => {
  turnPlayer++
  displayCards()
  if (turnPlayer === numberPlayers - 1) {
    document.querySelector('.hitButton').disabled = true
    document.querySelector('.standButton').disabled = true

    while (total < 17) {
      hitDeck()
    }
    if (total >= 17 && total < 21) {
      let tempPlayer = turnPlayer - 1
      let tempTotal = 0

      playingCards.forEach(function(element) {
        if (element.hand === tempPlayer) {
          tempTotal += element.cards.valueCard
        }
      })
      console.log('tempPlayer: ' + tempPlayer)
      console.log('total:' + total)
      if (total === tempTotal) {
        document.querySelector('.myAd').textContent = 'PUSH!'
      } else {
        let maxValueCard = Math.max(total, tempTotal)
        console.log('maxValueCard: ' + maxValueCard)
        if (maxValueCard === total) {
          let typePlayer = 'Dealer'
          document.querySelector('.myAd').textContent = typePlayer + ' WIN!'
        } else {
          tempPlayer++
          let typePlayer = 'Player '
          document.querySelector('.myAd').textContent = typePlayer + ' WIN!'
        }
      }

      restart = 1
      document.querySelector('.startButton').disabled = false
      document.querySelector('.hitButton').disabled = true
      document.querySelector('.standButton').disabled = true
    }
  }

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
  for (let index = 0; index < numberPlayers; index++) {
    if (index === numberPlayers - 1) {
      let elementId2 = 'dealerSection'
      let element2 = document.getElementById(elementId2)
      element2.parentNode.removeChild(element2)
    } else {
      let elementId = 'playerSection' + index

      let element = document.getElementById(elementId)
      element.parentNode.removeChild(element)
    }
  }
}
// **************************************************************************************
document.addEventListener('DOMContentLoaded', main)

document.querySelector('.startButton').addEventListener('click', startGame)
document.querySelector('.hitButton').addEventListener('click', hitDeck)
document.querySelector('.standButton').addEventListener('click', stand)
