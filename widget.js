window.onload = function() {
    userAction();
};

let doc=document.querySelector('.widget')
// doc.textContent='Heading'
// doc.style.cssText="color:red;background-color:black;"

const userAction = async () => {
    const response = await fetch('https://consumer-dev.pricingculture.com/api/assets/quick_search?columns=id,name,asset_url,platform,platform_asset_id,asset_type,security_type,security_sub_type,asset_status,media&page_size=5', {
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
    let assetdiv=''
    for(let i=0;i<jsondata.length;i++){
        var divdata=`<div style=margin-bottom:25px;text-align:center;>
        <img src=${jsondata[i].media[1].media_src} alt=not found>
        <div style=padding-top:10px;color:red;>${jsondata[i].name}</div>
        </div>`
        assetdiv+=divdata
        // var newLink = document.createElement('div');
        // newLink.innerHTML = `<div>
        // <img src=${jsondata[i].media[0].media_src}>
        // <div>${jsondata[i].name}</div>
        // </div>`
        // assetdiv.appendChild(newLink);
    }
    doc.innerHTML=assetdiv
}
