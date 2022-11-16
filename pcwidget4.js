window.onload = function() {
    let bslink  = document.createElement('link');
    bslink.rel  = 'stylesheet';
    bslink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css';
    document.head.appendChild(bslink);
    userAction();
};

let slideIndex = 0;
let interval

let doc=document.querySelector('.pcwidget')

let head  = document.getElementsByTagName('head')[0];
let link  = document.createElement('link');
link.rel  = 'stylesheet';
link.type = 'text/css';
 link.href = 'pcwidget.css';
//link.href = 'https://cdn.jsdelivr.net/gh/Mahendramahii/pcwidget/pcwidget.css'
link.media = 'all';
head.appendChild(link);


const userAction = async () => {
    const response = await fetch('https://consumer-dev.pricingculture.com/api/assets/quick_search?columns=id,name,asset_url,platform,platform_asset_id,asset_type,security_type,security_sub_type,asset_status,media&page_size=10&platform_id=in:6', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'api-key':'4b8e8a9c-665c-4bd6-ab4e-a0207d2142b4',
        'secret':'KrN$TttZdl2acg$80rm*'
      }
    });
    const myJson = await response.json(); //extract JSON from the http response
    let jsondata=myJson.objects
    console.log(myJson.objects)

    let assetdiv=`<div class="slideshow-container" style="height:100%">
                    <div style="font-size:20px;text-align:center;">Header</div>`     
    for(let i=0;i<jsondata.length;i++){
        divdata=`<div class="mySlides fade" id="slide${i+1}" style="text-align:center;">
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
        <div class="prev" onclick="leftSlide()">&#10094;</div>
        <div class="next" onclick="rightSlide()">&#10095;</div>
    </div>
    <div style="text-align:right;font-size:12px;">
        <img src="https://uploads-ssl.webflow.com/6075c46185f1280c00292db7/6123c611051bfe023c5b7dd0_Asset%202.png" loading="lazy" alt="no logo" style="height:20px;">
    </div>`
    doc.innerHTML=assetdiv
    autoSlides()
    interval= setInterval(autoSlides, 2000)
}

function resetInterval() {
    clearInterval(interval)
    interval = setInterval(autoSlides, 2000)
}

function rightSlide(){
    slideIndex++
    changeSlide()
    resetInterval()
}

function leftSlide(){
    slideIndex--
    changeSlide()
    resetInterval()
}

function changeSlide() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  if (slideIndex > slides.length) {slideIndex = 1} 
  if (slideIndex < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
      //document.getElementById('slide'+(i+1)).setAttribute('class','mySlides') 
  }
  slides[slideIndex-1].style.display = "block";
  //console.log('slide'+slideIndex)
  //document.getElementById('slide'+slideIndex).setAttribute('class','mySlides slideOut')
  //document.getElementById('slide'+(slideIndex+1)).setAttribute('class','mySlides slideIn')
}

function autoSlides() {
    slideIndex++
    changeSlide()
}

