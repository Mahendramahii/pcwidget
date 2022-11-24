slideIndex=[]
interval=[]
doc=[]

head  = document.getElementsByTagName('head')[0];
link  = document.createElement('link');
link.rel  = 'stylesheet';
link.type = 'text/css';
//link.href = 'pcwidget2.css';
link.href = 'https://cdn.jsdelivr.net/gh/Mahendramahii/pcwidget/pcwidget2.css'
link.media = 'all';
head.appendChild(link);

console.log(document.getElementsByClassName('pcscript').length)
scripts = document.getElementsByClassName('pcscript')
console.log(scripts)
for(let i=0;i<scripts.length;i++){
    slideIndex[i]=1
    doc[i]=document.getElementById(document.getElementsByClassName('pcscript')[i].attributes.pid.value)
    console.log('iiiiiiiii',i)
    userAction(i);
}

async function userAction(val){
    let pid = scripts[val].attributes.pid.value;
    console.log('pid',pid)
    let response = await fetch('https://consumer-dev.pricingculture.com/api/assets/quick_search?columns=id,name,asset_url,platform,platform_asset_id,asset_type,security_type,security_sub_type,asset_status,media&page_size=10&platform_id=in:'+pid, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'api-key':'4b8e8a9c-665c-4bd6-ab4e-a0207d2142b4',
        'secret':'KrN$TttZdl2acg$80rm*'
      }
    });
    console.log(val,slideIndex)
    let myJson = await response.json(); //extract JSON from the http response
    let jsondata=myJson.objects
    console.log('called'+val,myJson.objects)

    let assetdiv=`<div class="slideshow-container" style="height:100%">
                    <div style="font-size:20px;text-align:center;">Header</div>`     
    for(let i=0;i<jsondata.length;i++){
    let divdata=`<div class="mySlides${val} fade" id="slide${i+1}" style="text-align:center;">
                <div>${i+1}/${jsondata.length}</div>
                <div style="height:200px;">
                    <img src=${jsondata[i].media[1].media_src} alt="No Image" style="height:100%;width:100%;object-fit:contain;">
                </div>
                <div class="text">
                    <div style="font-size:16px;padding-bottom:10px;color:red;padding:0px 10%;">${jsondata[i].name}</div>
                    <div>${jsondata[i].platform.name}</div>
                </div>
            </div>`
        assetdiv+=divdata 
    }
    assetdiv+=`
        <div class="prev" onclick="leftSlide(${val})">&#10094;</div>
        <div class="next" onclick="rightSlide(${val})">&#10095;</div>
    </div>
    <div style="text-align:right;font-size:12px;">
        <img src="https://uploads-ssl.webflow.com/6075c46185f1280c00292db7/6123c611051bfe023c5b7dd0_Asset%202.png" loading="lazy" alt="no logo" style="height:20px;">
    </div>`
    doc[val].innerHTML=assetdiv
    //autoSlides(val)
    changeSlide(val)
    //interval[val]= setInterval(autoSlides(val), 2000)
}

function resetInterval(val) {
    clearInterval(interval[val])
    interval[val] = setInterval(autoSlides(val), 2000)
}

function rightSlide(val){
    slideIndex[val]++
    changeSlide(val)
    //resetInterval(val)
}

function leftSlide(val){
    slideIndex[val]--
    changeSlide(val)
    //resetInterval(val)
}

function changeSlide(val) {
  var i;
  var slides = document.getElementsByClassName("mySlides"+val);
  if (slideIndex[val] > slides.length) {slideIndex[val] = 1} 
  if (slideIndex[val] < 1) {slideIndex[val] = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
      //document.getElementById('slide'+(i+1)).setAttribute('class','mySlides') 
  }
  //console.log(val,slideIndex,slideIndex[val], slides[slideIndex[val]-1])
  //console.log(slides)
  slides[slideIndex[val]-1].style.display = "block";
  //console.log('slide'+slideIndex[val])
  //document.getElementById('slide'+slideIndex[val]).setAttribute('class','mySlides slideOut')
  //document.getElementById('slide'+(slideIndex[val]+1)).setAttribute('class','mySlides slideIn')
}

function autoSlides(val) {
    slideIndex[val]++
    console.log(slideIndex[val],slideIndex)
    changeSlide(val)
}