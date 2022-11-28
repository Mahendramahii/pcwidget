widgets=[]

head  = document.getElementsByTagName('head')[0];
link  = document.createElement('link');
link.rel  = 'stylesheet';
link.type = 'text/css';
//link.href = 'pcwidget2.css';
link.href = 'https://cdn.jsdelivr.net/gh/Mahendramahii/pcwidget/pcwidget2.css'
link.media = 'all';
head.appendChild(link);

//console.log(document.getElementsByClassName('pcscript').length)
//scripts = document.getElementsByClassName('pcscript')
scripts=document.getElementsByClassName('pcscript')
//console.log(scripts)
for(let i=0;i<scripts.length;i++){
    let x={
        id:scripts[i].attributes.pid.value,
        widgetdetails:[],
        selected:1,
        interval:null,
        doc:document.getElementById(document.getElementsByClassName('pcscript')[i].attributes.pid.value),
        query:null
    }
    this.widgets[i]=x
    userAction(i);
}

async function userAction(val){
    let url='https://consumer-dev.pricingculture.com/api/assets/quick_search?columns=id,name,asset_url,platform,platform_asset_id,asset_type,security_type,security_sub_type,asset_status,media,price&page_size=10'
    // if(this.widgets[val].id) url+='&platform_id=in:'+this.widgets[val].id
    // if(this.widgets[val].query) url+='&query='+this.widgets[val].query
    if(this.widgets[val].id && !isNaN(this.widgets[val].id)) url+='&platform_id=in:'+this.widgets[val].id
    if(isNaN(this.widgets[val].id)) url+='&query='+this.widgets[val].id
    let response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'api-key':'4b8e8a9c-665c-4bd6-ab4e-a0207d2142b4',
        'secret':'KrN$TttZdl2acg$80rm*'
      }
    });
    let myJson = await response.json(); //extract JSON from the http response
    this.widgets[val].widgetdetails=myJson.objects
    console.log('called'+val,myJson.objects)

    let assetdiv=`<div class="slideshow-container" style="height:100%;height:420px;">
                    <div style="font-size:20px;text-align:center;">PC WIDGET ${val+1}</div>`     
    for(let i=0;i<widgets[val].widgetdetails.length;i++){
        let divdata=`<div class="mySlides${val}" id="slide${val}${i}" style="text-align:center;display:none;">
                 <div>${i+1}/${widgets[val].widgetdetails.length}</div>
                <div style="height:200px;">
                    <img src=${widgets[val].widgetdetails[i].media[0].media_src} alt="No Image" style="height:100%;width:100%;object-fit:contain;">
                </div>
                <div class="text">
                    <div style="font-size:16px;padding-bottom:10px;color:red;padding:0px 10%;">${widgets[val].widgetdetails[i].name}</div>
                    <div style="color:blue;">${widgets[val].widgetdetails[i].platform.name}</div>
                    <div style="color:green;">$${((parseFloat(widgets[val].widgetdetails[i].price)).toFixed(2))}</div>
                </div>
            </div>`
        assetdiv+=divdata 
    }
    assetdiv+=`
        <div class="prev" onclick="change(${val},'minus')">&#10094;</div>
        <div class="next" onclick="change(${val},'add')">&#10095;</div>
    </div>`
    widgets[val].doc.innerHTML=assetdiv
    //slideAuto(widgets[val])
    widgets[val].interval=setInterval(()=>slideAuto(val),2000)
}

function slideAuto(val){
    change(val,'add')
  }
  
function resetSlide(val){
    clearInterval(widgets[val].interval)
    widgets[val].interval=setInterval(()=>slideAuto(val),2000)
  }
  
function change(index,type){
    let widget=this.widgets[index]
    if(type=='add') widget.selected=widget.selected+1
    if(type=='minus') widget.selected=widget.selected-1
    //console.log(widget,widget.widgetdetails.length,widget.selected > widget.widgetdetails.length)
    if(widget.selected > widget.widgetdetails.length) widget.selected=1
    if(widget.selected < 1) widget.selected=widget.widgetdetails.length
    var slides = document.getElementsByClassName("mySlides"+index);
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    //console.log(widget.selected)
    slides[widget.selected-1].style.display = "block";
    resetSlide(index)
  }

