window.onload = function() {
    let bslink  = document.createElement('link');
    bslink.rel  = 'stylesheet';
    bslink.href = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css';
    document.head.appendChild(bslink);

    var bsscript1 = document.createElement('script');
    bsscript1.setAttribute('src','https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js');
    document.head.appendChild(bsscript1);

    var bsscript2 = document.createElement('script');
    bsscript2.setAttribute('src','https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js');
    document.head.appendChild(bsscript2);

    userAction();
};

let doc=document.querySelector('.pcwidget')

let head  = document.getElementsByTagName('head')[0];
let link  = document.createElement('link');
link.rel  = 'stylesheet';
link.type = 'text/css';
// link.href = 'pcwidget.css';
link.href = 'https://cdn.jsdelivr.net/gh/Mahendramahii/pcwidget/pcwidget.css'
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

    let assetdiv=`<div class="container">
        <div id="myCarousel" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner" style="height:500px;text-align:center;width:100%;">`     
    for(let i=0;i<jsondata.length;i++){
        let divdata=''
        if(i==0) divdata=`<div class="item active" style="height:100%;width:100%;">`
        else divdata=`<div class="item" style="height:100%;">`
        divdata+=`<img src=${jsondata[i].media[1].media_src} alt="No Image" style="height:100%;width:100%;object-fit:contain;">
                <div class="carousel-caption">
                    <h3>${jsondata[i].name}</h3>
                    <p>${jsondata[i].platform.name}</p>
                </div>
            </div>`
        assetdiv+=divdata 
    }
    assetdiv+=`</div>
            <a class="left carousel-control" href="#myCarousel" data-slide="prev">
            <span class="glyphicon glyphicon-chevron-left"></span>
            <span class="sr-only">Previous</span>
            </a>
            <a class="right carousel-control" href="#myCarousel" data-slide="next">
            <span class="glyphicon glyphicon-chevron-right"></span>
            <span class="sr-only">Next</span>
            </a>
        </div>
    </div>`
    doc.innerHTML=assetdiv
}