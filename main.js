const score = document.querySelector('.score')
const start = document.querySelector('.start')
const gameArea = document.querySelector('.gameArea')
const car = document.createElement('div')
const music = document.createElement('embed')

// music.src = './Skindred - Nobody Underground.mp3'
// music.type = 'audio/mp3'
// music.classList.add('.music')


car.classList.add('car')
 
const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
}

const setting = {
    start: false,
    score: 0,
    speed: 3,
    traffic: 3
}

function getQuantityElements(heightElement){
    return document.documentElement.clientHeight / heightElement + 1
}
console.log(document.documentElement.clientHeight);

function startGame(e){

    if (e.target.classList.contains('start')){
        return;
    } 
    if (e.target.classList.contains('easy')){
        setting.speed = 3
        setting.traffic = 3
    }
    if (e.target.classList.contains('medium')){
        setting.speed = 5
        setting.traffic = 3
    }
    if (e.target.classList.contains('hard')){
        setting.speed = 7
        setting.traffic = 2
    }

    start.classList.add('hide')
    gameArea.innerHTML = ''
    
    for (let i = 0; i < getQuantityElements(100); i++){
        const line = document.createElement('div')
        line.classList.add('line')
        line.style.top = (i * 100) + 'px'
        line.y = i * 100
        gameArea.appendChild(line)
    }
    for (let i = 0; i < getQuantityElements(100 * setting.traffic); i++ ) {
        const enemy = document.createElement('div')
        let enemyImg = Math.ceil(Math.random() * 2)
        console.log(enemyImg);
        enemy.classList.add('enemy')
        enemy.y = -100 * setting.traffic * (i + 1)
        enemy.style.left = Math.floor((Math.random() * (gameArea.offsetWidth - 50))) + 'px'
        enemy.style.top = enemy.y + 'px'
        enemy.style.background = `transparent url(./image/enemy${enemyImg}.png) center / cover no-repeat`
        gameArea.appendChild(enemy)
    }
    setting.score = 0
    setting.start = true
    gameArea.appendChild(car)
    car.style.left = '125px'
    car.style.bottom = '10px'
    gameArea.appendChild(music)
    // music.autoplay =  true
    // music.src = './Skindred - Nobody Underground.mp3'
    setting.x = car.offsetLeft
    setting.y = car.offsetTop
    requestAnimationFrame(playGame)

}

function startRun(e){
    
    e.preventDefault()
    if(keys.hasOwnProperty(e.key)){
        keys[e.key] = true
    }
    
}

function playGame(){
  if(setting.start === true){
    setting.score += setting.speed
    score.innerHTML = 'SCORE<br>' + setting.score
    moveRoad()
    moveEnemy()
      if(keys.ArrowLeft && setting.x > 0 ){
          setting.x -= setting.speed
      }
      if(keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)){
        setting.x += setting.speed
    }
    if(keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)){
        setting.y += setting.speed
    }
    if(keys.ArrowUp && setting.y > 0 ){
        setting.y -= setting.speed
    }
    car.style.left = setting.x + 'px'
    car.style.top = setting.y + 'px'
      requestAnimationFrame(playGame) 
  } 
  
}

function stopRun(e){
    e.preventDefault()
    if(keys.hasOwnProperty(e.key)){
        keys[e.key] = false
    }
}

   
function moveRoad(){
    let lines = document.querySelectorAll('.line')
    lines.forEach((line) => {
        line.y += setting.speed 
        line.style.top = line.y + 'px'

        if(line.y > gameArea.offsetHeight){
            line.y = -100
        }
    })
}
function moveEnemy(){
    let enemy = document.querySelectorAll('.enemy')
    enemy.forEach(function(item){
        let carRect = car.getBoundingClientRect()
        let enemyRect = item.getBoundingClientRect()
        if(carRect.top <= enemyRect.bottom &&
            carRect.right >= enemyRect.left &&
            carRect.left <= enemyRect.right &&
            carRect.bottom >= enemyRect.top){
            start.classList.remove('hide')
            score.style.top = start.offsetHeight
            setting.start = false
            music.remove()
        }
        
        item.y += setting.speed /2
        item.style.top = item.y + 'px'
        if(item.y >= gameArea.offsetHeight) {
            let enemyImg = Math.ceil(Math.random() * 2)
            item.y = -100 * setting.traffic
            item.style.left = Math.floor((Math.random() * (gameArea.offsetWidth - 50))) + 'px'
            item.style.background = `transparent url(./image/enemy${enemyImg}.png) center / cover no-repeat`
        }
    })

    
}

document.addEventListener('keydown', startRun)
document.addEventListener('keyup', stopRun)
start.addEventListener('click', startGame)



