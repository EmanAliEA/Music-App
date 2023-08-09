let audioName = []
var audios = [] 
var isMusicPaused = 0;
let selectedFile;
let audioCount = 0;
let audioPlay  = 0
let musicIndex = 0
var musicduration
var musicCurrent
let index = 0
function playPause(){
    if(isMusicPaused === 0)  {
        isMusicPaused = 1       
        document.getElementById("play").src = 'Images/pause (1).png';
        document.getElementById("main-audio").play()
    }
    else{
        isMusicPaused = 0;
        document.getElementById("play").src = 'Images/play-button (2).png';
        document.getElementById("main-audio").pause()
    }
}
function addMusic(){
    isMusicPaused=0
    document.getElementById("play").src = 'Images/play-button (2).png';
    document.querySelector('ul').innerHTML = ''
    audios.length = 0
    audioName.length = 0
    audioCount = 0
    document.getElementById("file1").click();
    document.getElementById("file1").onchange = ({target}) =>{
        audios.length = 0
        audioName.length = 0
        selectedFile = [...document.getElementById("file1").files];
        for(const file of selectedFile){
            var audio=new Audio();
            audio.src = `Images/${file.name}`;
            audioName[audioCount] = file.name.replace(".mp3", "")
            audios[audioCount] = audio
            audioCount++;
        }
        for(var i = 0 ; i < audioCount ; i++){
            var li = document.createElement('li')
            var div = document.createElement('div')
            var spanLi = document.createElement('span')
            var span = document.createElement('span')
            li.appendChild(div)
            li.appendChild(spanLi)
            div.appendChild(span)
            div.classList.add('row')
            span.classList.add('audio-duration')
            document.querySelector('ul').appendChild(li)
            span.innerHTML = audioName[i]
            li.setAttribute("onclick","clickedSong(this)")
            li.setAttribute("li-index",i)
        }
        document.getElementById("name").innerText = `${audioName[audioPlay]}`
        document.getElementById("main-audio").src = audios[audioPlay].src
        
        audioDetail()
        document.getElementById("prograss_area").addEventListener("click",(e)=>{
            let prograssWidthval = document.getElementById("prograss_area").clientWidth 
            let clickedoffsetX =  e.offsetX;
            let songDuration = document.getElementById("main-audio").duration
            document.getElementById("main-audio").currentTime = (clickedoffsetX/prograssWidthval) * songDuration 
        })
        isMusicPaused =0
        playPause()
    }
       
}
function audioDetail(){
    document.getElementById("main-audio").addEventListener("loadeddata",()=>{
        //update song total duration
       let audioDuration = document.getElementById("main-audio").duration
       let totalMin = Math.floor(audioDuration/60)
       let totalSec = Math.floor(audioDuration%60)
       if(totalSec <10){
           totalSec = `0${totalSec}`
        }
       musicduration.innerHTML = ` ${totalMin}:${totalSec}`
    })
    
    document.getElementById("main-audio").addEventListener("timeupdate",(e)=>{
        const currentTime = e.target.currentTime
        const duration = e.target.duration
        let prograssWidth = (currentTime/duration)*100
        document.getElementById("prograss_bar").style.width =  `${prograssWidth}%`
         musicCurrent = document.querySelector(".current_time")
         musicduration = document.querySelector(".max_time")

        //update playing song current time
        let currentMin = Math.floor(currentTime/60)
        let currentSec = Math.floor(currentTime%60)
        if(currentSec <10){
            currentSec = `0${currentSec}`
        }
        musicCurrent.innerHTML = `${currentMin}:${currentSec}`
    });
    
}
function backAudio(){
    index--;
    if(index >= 0){
        document.getElementById("name").innerText = `${audioName[index]}`
        document.getElementById("main-audio").src = audios[index].src
        if(isMusicPaused === 1 ){
            document.getElementById("prograss_bar").style.width = "0%"
            document.getElementById("main-audio").play()
        }
        else{
            document.getElementById("prograss_bar").style.width = "0%"
            document.getElementById("main-audio").pause()
        }
    }
}

function nextAudio(){
    index++;
    if(index < audioCount){
        document.getElementById("name").innerText = `${audioName[index]}`
        document.getElementById("main-audio").src = audios[index].src
        if(isMusicPaused === 1 ){
            document.getElementById("prograss_bar").style.width = "0%"
            document.getElementById("main-audio").play()
        }
        else{
            document.getElementById("prograss_bar").style.width = "0%"
            document.getElementById("main-audio").pause()
        }
}
}

let repeat = 0
function Repeat(){
    if(repeat === 2)
    repeat = 0
else
repeat++
if(repeat === 0){
    document.querySelector(".repeat").src = 'Images/repeat1.png'
        document.querySelector(".repeat").setAttribute("title","playlist looped")
    }
    else if(repeat === 1){
        document.querySelector(".repeat").src = 'Images/repeat-once.png'
        document.querySelector(".repeat").setAttribute("title","Song looped")
    }
    else{
        document.querySelector(".repeat").src = 'Images/shuffle.png'
        document.querySelector(".repeat").setAttribute("title","playlist shuffle")
    }
}

//after song ended
document.getElementById("main-audio").addEventListener("ended",()=>{
    if(document.querySelector(".repeat").getAttribute("title") === "playlist looped"){
           nextAudio() 
        }
        else if (document.querySelector(".repeat").getAttribute("title") === "Song looped"){
            document.getElementById("main-audio") = 0
        }
    })


function clickedSong(element){
    index = element.getAttribute("li-index")
    document.getElementById("name").innerText = `${audioName[index]}`
    document.getElementById("main-audio").src = audios[index].src
    audioDetail()
    document.getElementById("prograss_bar").style.width = "0%"
    isMusicPaused = 0
    playPause()
}