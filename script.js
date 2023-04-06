const musicCountainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress-bar')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')
const volume = document.querySelector('#volume')
// const filetype = document.querySelector('')

// Song titles
const songs = ['Wisp - candlegrove', "Bakground - First Time", 'Sewerslvt - inlove', 'Rchetype - Hiraita', 'Mrs Jynx - Martian']
const musicType = ['.mp3', '.flac', '.ogg', '.wav', '.aiff']
// Keep track of songs
let songIndex = 0

// Initially load song info DOM
loadSong(songs[songIndex])

//Update song details
function loadSong(song) {
    title.innerText = song
    for (let i = 0; i < musicType.length; i++) {
        if (checkFileExists(`muse/${song}${musicType[i]}`) == true) {
            audio.src = `muse/${song}${musicType[i]}`
            if (checkFileExists(`cove/${song}${musicType[i]} Cover Art.jpg`) == true) {
                cover.src = `cove/${song}${musicType[i]} Cover Art.jpg`
                break;
            } else {
                cover.src = `cove/ellsee.gif`
            }
            break;
        } else {
            audio.src = `muse/Wisp - candlegrove.mp3`
        }
    }
}

function checkFileExists(urlToFile) {
    var ftc = new XMLHttpRequest();
    ftc.open('HEAD', urlToFile, false);
    ftc.send();

    if (ftc.status == "404") {
        return false;
    } else {
        return true;
    }
}

// Play and pause song by pressing play and pause button
function playSong() {
    musicCountainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

    audio.play()
}

function pauseSong() {
    musicCountainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')

    audio.pause()
}

// Open volume menu, disappears when clicked off
function pressVol() {
    volume.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')
}

// Go to previous song
function prevSong() {
    songIndex--

    if(songIndex < 0) {
        songIndex = songs.length - 1
    }

    loadSong(songs[songIndex])
    playSong()
}

// Go to next song
function nextSong() {
    songIndex++

    if(songIndex > songs.length - 1) {
        songIndex = 0
    }

    loadSong(songs[songIndex])
    playSong()
}

// Realtime update progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}

// Set new time on progress bar to seek to different parts of track
function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}

// Event Listeners !!
// Play button
playBtn.addEventListener('click', () => {
    const isPlaying = musicCountainer.classList.contains('play')

    if(isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})

// Change song
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

// Progress Bar
audio.addEventListener('timeupdate', updateProgress)
progressContainer.addEventListener('click', setProgress)

// Volume
volume.addEventListener('click', pressVol)