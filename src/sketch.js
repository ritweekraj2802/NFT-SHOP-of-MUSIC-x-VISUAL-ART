

let song; // Contains the song
let img;  // Contains the image
let imageGraphic; // Contains the image canvas
let loadedImages = [];
let visibleImages = []; //The list of visibleImages
let refreshImages = false; //variable to refresh images everytime the image list changes
let alpha = 255;
let varEnableNFT = false;

//Different Components Array
let sky = []
let sol = []
let bandera = []

function preload() {
  // Sound
  song = loadSound('../assets/music/coco.mp3');

  //Sky Component
  sky.push(loadImage('../assets/components/Background1.png', successfulImage, notSuccessfulimage));
  sky.push(loadImage('../assets/components/Background2.png', successfulImage, notSuccessfulimage));
  sky.push(loadImage('../assets/components/Background3.png', successfulImage, notSuccessfulimage));
  sky.push(loadImage('../assets/components/Background4.png', successfulImage, notSuccessfulimage));
  sky.push(loadImage('../assets/components/Background5.png', successfulImage, notSuccessfulimage));

  //Sky Component
  sol.push(loadImage('../assets/components/SolHardcore.png', successfulImage, notSuccessfulimage));
  sol.push(loadImage('../assets/components/SolFeliz.png', successfulImage, notSuccessfulimage));
  sol.push(loadImage('../assets/components/SolChilling.png', successfulImage, notSuccessfulimage));

  //Bandera Component
  bandera.push(loadImage('../assets/components/Bandera.png', successfulImage, notSuccessfulimage));
  bandera.push(loadImage('../assets/components/Bandera2.png', successfulImage, notSuccessfulimage));
  
  //Load Visible Sky
  visibleImages.push(sky[0]);
  visibleImages.push(sol[0]);

  //Load Image Initial List
  visibleImages.push(loadImage('../assets/components/Cloud4.png', successfulImage, notSuccessfulimage))
  visibleImages.push(loadImage('../assets/components/main.png', successfulImage, notSuccessfulimage))
  visibleImages.push(loadImage('../assets/components/Cloud1.png', successfulImage, notSuccessfulimage))
  visibleImages.push(loadImage('../assets/components/Cloud2.png', successfulImage, notSuccessfulimage))
  visibleImages.push(loadImage('../assets/components/Cloud3.png', successfulImage, notSuccessfulimage))
  
  visibleImages.push(loadImage('../assets/components/Ballon.png', successfulImage, notSuccessfulimage))
  visibleImages.push(loadImage('../assets/components/Pajaros.png', successfulImage, notSuccessfulimage))

  // 9 
  visibleImages.push(bandera[0]);

  visibleImages.push(loadImage('../assets/components/Barquito.png', successfulImage, notSuccessfulimage))
  visibleImages.push(loadImage('../assets/components/Piedra1.png', successfulImage, notSuccessfulimage))
  visibleImages.push(loadImage('../assets/components/Piedra2.png', successfulImage, notSuccessfulimage))
  visibleImages.push(loadImage('../assets/components/RocaPlaya.png', successfulImage, notSuccessfulimage))
  visibleImages.push(loadImage('../assets/components/Sombrilla.png', successfulImage, notSuccessfulimage))

  
}

function successfulImage(){
  console.log("success")
}

function notSuccessfulimage(){
  console.log("not success")
}

function setup(){

  //Reposition the Canvas
  let cnv = createCanvas(786, 786)
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height +80);
  cnv.position(x, y);


  //Image Setup
  for(let i = 0; i < visibleImages.length; i++){
    image(visibleImages[i],0,0)
  }

  //Song Setup
  //song.loop();
  //song.playMode("restart");

  if(song){
  // create a new Amplitude analyzer
  analyzer = new p5.Amplitude();

  // Patch the input to an volume analyzer
  analyzer.setInput(song);
  }

  // Frequency
  //fft = new p5.FFT(0.8, 16);
  fft = new p5.FFT();
  

  // let context = getAudioContext();
  // // wire all media elements up to the p5.sound AudioContext
  // for (let elem of selectAll('audio').concat(selectAll('video'))) {
  //   let mediaSource = context.createMediaElementSource(elem.elt);
  //   mediaSource.connect(p5.soundOut);
  // }

  background('rgba(236,236,236, 0.50)')

  
}

function draw(){

  //Draw the visible Images
  if(refreshImages || varEnableNFT){
    clear()
    for(let i = 0; i < visibleImages.length; i++){
      image(visibleImages[i],0,0)
    }
    refreshImages = false
  }

  console.log("draw")
  

  // Get the average (root mean square) amplitude
  //let rms = analyzer.getLevel();
  //console.log("rms", rms)

  //analyze frequency
  let spectrum = fft.analyze();

  //console.log(spectrum)

  // //Sky
  // if(spectrum[0] < 80){
    
  //   visibleImages[0] = sky[4]
  //   refreshImages = true;
  // }

  //Appear images
  for(let i = 0; i < spectrum.length; i++){

    //Sky
    if(spectrum[0] >= 200){
      visibleImages[0] = sky[0]
      refreshImages = true;
    }else if( spectrum[0] > 140 && spectrum[0] < 200){
        visibleImages[0] = sky[1];
        refreshImages = true;
    }
    else if( spectrum[0] > 120 && spectrum[0] < 140){
      visibleImages[0] = sky[2];
      refreshImages = true;
    }else if( spectrum[0] > 80 && spectrum[0] < 120){
        visibleImages[0] = sky[3];
        refreshImages = true;
    }else if( spectrum[0] > 0 && spectrum[0] < 80){
      visibleImages[0] = sky[4]
      refreshImages = true;
    }

    //Sol
    if(spectrum[512] >= 100){
      visibleImages[1] = sol[0]
      refreshImages = true;
    }
    else if( spectrum[512] > 40 && spectrum[512] < 100){
      visibleImages[1] = sol[1];
      refreshImages = true;
    }else if( spectrum[512] > 0 && spectrum[512] < 40){
      visibleImages[1] = sol[2]
      refreshImages = true;
    }

    //Sol
    if(spectrum[512] >= 100){
      visibleImages[1] = sol[0]
      refreshImages = true;
    }
    else if( spectrum[512] > 40 && spectrum[512] < 100){
      visibleImages[1] = sol[1];
      refreshImages = true;
    }else if( spectrum[512] > 0 && spectrum[512] < 40){
      visibleImages[1] = sol[2]
      refreshImages = true;
    }

    //Sombrilla
    if(spectrum[256] >= 100){
      visibleImages[9] = bandera[0]
      refreshImages = true;
    }
    else if( spectrum[256] > 40 && spectrum[256] < 100){
      visibleImages[9] = bandera[1];
      refreshImages = true;
    }
  }

  let waveform = fft.waveform();
  
  if(song && song.isPlaying()){
    noFill();
    beginShape();
    stroke(20);
    for (let i = 0; i < waveform.length; i++){
      let x = map(i, 0, waveform.length, 0, width);
      let y = map( waveform[i], -1, 1, 0, height/2);
      vertex(x,y);
    }
    endShape();
  }else{
    
  }

}

async function enableNFT(){
  console.log("enabling nft")
  varEnableNFT = true
  playSongNow()
}

async function playSongNow(){

  if(song){
    console.log("song", song)
  if(song.isPlaying()){
    song.pause();
    background('rgba(236,236,236, 0.5)');
  }else{
    background('rgba(236,236,236, 0)');
    song.play();
    song.loop();
    song.playMode("restart")
  }
}

    
}

function playAudio(){
  console.log("play audio")
  
  const inputAudio = document.querySelector('#avatar');
  song = loadSound(inputAudio.value)
}
// Load Play Sound https://p5js.org/examples/sound-load-and-play-sound.html
// Play Sound https://p5js.org/examples/sound-play-mode.html
// https://p5js.org/reference/#/p5.FFT

