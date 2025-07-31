'use strict'

// ******************Tab Component******************
// ******************Tab Component******************
const tabsContainer = document.querySelector('.tab-container');
const tabs = document.querySelectorAll('.tab');
const tabContents= document.querySelectorAll('.content');

tabsContainer.addEventListener('click',function(e){
    const clicked =e.target;
    if(clicked.classList.contains('tab')){
        //handle tabs
        tabs.forEach(t=>t.classList.remove('tab--active'));
        clicked.classList.add('tab--active');
        //handle content
        tabContents.forEach(c=>c.classList.remove('content--active'));
        document.querySelector(`.content--${clicked.dataset.tab}`).classList.add('content--active');
    }
})


// ******************fade out navitation******************
// ******************fade out navitation******************
const nav = document.querySelector('.main-nav');

const handler = function(e){
     if(e.target.classList.contains('main-nav-link'))
        { const navLink = e.target;
          const siblings = navLink.closest('.main-nav').querySelectorAll('.main-nav-link');
          siblings.forEach(ele=>{if(ele!==navLink) ele.style.opacity=this;}) 
       }
}

nav.addEventListener('mouseover',handler.bind(0.5));
nav.addEventListener('mouseout',handler.bind(1));


// ***************  Slider  *********************
// **********************************************
const slider = function()
{
const slides = document.querySelectorAll('.slide');
const btn_left = document.querySelector('.slider_btn--left');
const btn_right = document.querySelector('.slider_btn--right');
const dotContainer = document.querySelector('.dots');

let currentSlide =0; //pointer
const maxSlide = slides.length;

//--------------- Functions
const goToSlide = function(slide){
    slides.forEach((s,i)=>{
        s.style.transform=`translateX(${100*(i-slide)}%)`
    })
};

// activate dot
const activateDot = function(slide) {
    document.querySelectorAll('.dot').forEach(d=>d.classList.remove('dot--active'));
    document.querySelector(`.dot[data-slide="${slide}"]`).classList.add('dot--active');
}

//create dots for each slide
const createDots = function(){
    slides.forEach(function(_,i){
        dotContainer.insertAdjacentHTML('beforeend',
        `<button class="dot" data-slide="${i}">&nbsp;</button>
        `)
    })
}

//--next slide
const nextSlide = function(){
    if(currentSlide === maxSlide-1) {
        currentSlide=0;
    }else{currentSlide++;}
   
    goToSlide(currentSlide); 
    activateDot(currentSlide);
};
//--previous slide
const prevSlide =function(){
    if(currentSlide===0){
        currentSlide=maxSlide -1 
    }else{currentSlide--;}
    
    goToSlide(currentSlide);
    activateDot(currentSlide);
}

// (1)---------- initialize
const init = function(){
    goToSlide(0);
    createDots();//first crated dot,only then the next func can be called
    activateDot(0);
}
init();


// (2)   ---------Eventlistener
btn_right.addEventListener('click',nextSlide);

btn_left.addEventListener('click',prevSlide);

 //keyboard arrow to scroll
document.addEventListener('keydown',function(e){
    if(e.key === 'ArrowLeft') prevSlide();
    if(e.key === 'ArrowRight') nextSlide();
})


dotContainer.addEventListener('click',function(e){
    if(e.target.classList.contains('dot')){
        const slide = e.target.dataset.slide;
        //或者const {slide} = e.target.dataset;
        goToSlide(slide);
        activateDot(slide);
   }
})
};

slider();

// ********************* Map part***********************
//-------------- leaflet   
const map = L.map('map',{scrollWheelZoom:false}).setView([51.505, -0.09], 4);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const myCurrentPosition =[51.433334,6.883333,];
L.marker(myCurrentPosition).addTo(map)
    .bindPopup()
    .setPopupContent(`<img src="img/popup-muelheim.png" alt="mulheim"><p>📌My current location,I live in Mülheim an der Ruhr, a very beatiful city!😀</p>`).openPopup();
 

// -------------------sidebar--------
class Location{
    id;
    coords;
    description;
    constructor(id,coords,description){
        this.id =id;
        this.coords=coords;
        this.description=description;
    }
}

//visited loc
const bangkok = new Location('Bangkok',[13.736717,100.523186],`Bangkok(Thailand) <br> I've been there with my family.We visited the grand palace and had a great time in Pataya beach.`);
const taipei = new Location('Taipei',[25.105497,121.597366],`Taipei(Taiwan) <br> I love this modern costal city. The food were so delicious, and the people are also friendly!`);
const singa = new Location('Singapore',[1.290270,103.851959],`Singapore <br> 'klein, aber fein!' I'll never forget me and my family spent days there,and suggest you travel there for at least once~!`);
const kuala = new Location('Kuala Lumpur',[3.140853,101.693207],`Kuala Lumpur(Malaysia)<br>Not just the Petronas Twin Towers,I loved everything about malaysia,especially the climate.`);
const fran = new Location('Frankfurt',[50.110924,8.682127],`Frankfurt(Germany)<br> I enjoyed the view of main river,and also visited Römerberg, Goethe-Haus.`);
const bonn = new Location('Bonn',[50.733334,7.100000],`Bonn(Germany)<br> My friends and I visited there in winter,we came for the 'Schloss Drachenburg', wonderful castle!`);
//plan loc
const sey = new Location('Seychelles',[-4.186000,55.435999],`Vallée de Mai(Seychelles)<br>It is literally the Eden Garden on earth. I have to be there someday.`);
const dubai = new Location('Dubai',[25.276987,55.296249],`Dubai(UAE)<br> The tallest tower of the world,definitely worth a visit.You can get the view of desert and sea at the same time.`);
const agra = new Location('Agra',[27.176670,78.008072],`Agra(India)<br> The legendary 'Taj Mahal' is attractive to me, and I also like indian culture.`);
const cairo = new Location('Cairo',[30.033333,31.233334],`Cairo(Egypt) <br> One word:Pyramid~! `);
const mauri = new Location('Mauritius',[-20.244959,57.561768],`Mauritius <br>Marvelous beach scenery and many rare animals.`);
// location-arr
const visitedLoc =[bangkok, taipei, singa, kuala, fran, bonn];
const travelPlan =[sey, dubai, agra, cairo, mauri];
const visitedCon = document.querySelector('.visited-loc');
const planCon = document.querySelector('.travel-plan');

//display list in sidebar
const displayList = function(locArr,locContainer){
    locArr.forEach(loc=>{
        const html =` <li data-id="${loc.id}">${loc.id}</li>`;
        locContainer.insertAdjacentHTML('beforeend',html)
    })
};
displayList(visitedLoc,visitedCon);
displayList(travelPlan,planCon)


// click list item to show Popup on map
const renderPopup = function(locArr,container){
    container.addEventListener('click',function(e){
        const clicked = e.target.closest('li');
        if(!clicked) return;
        const loc = locArr.find(loc=>loc.id===clicked.dataset.id)
        map.setView(loc.coords,4,{
                    animate:true,
                    pan:{duration:1}})        
        //make a marker at this place
        L.marker(loc.coords).addTo(map)
        .bindPopup(L.popup({ maxWidth:300,minWidth:200,className:`${container.className}-popup`})).setPopupContent(`<img src="img/popup-${loc.id[0].toLowerCase()}${loc.id.slice(1)}.png" alt="${loc.id}"> <p>${loc.description}</p>`).openPopup();})
};
renderPopup(visitedLoc,visitedCon);
renderPopup(travelPlan,planCon);

// ****************smooth scroll
const nav_item = document.querySelector('nav li');
nav.addEventListener('click',function(e){    
    const secId=e.target.name;
    document.getElementById(secId).scrollIntoView({behavior:'smooth'})
});

const contact_btn = document.querySelector('.section-hero .btn');
contact_btn.addEventListener('click',function(){    
    document.querySelector('.contact-form').scrollIntoView({behavior:'smooth'})
});


//******************Form submission
const subBtn= document.getElementById('form');
form.addEventListener('submit',function(e){
    e.preventDefault();
    const paras={
        name:document.getElementById('name').value,
        email:document.getElementById('email').value,
        topic:document.getElementById('topic').value,
        message:document.getElementById('message').value,
    }


   const servideID = "service_as7zufn";
   const templateID="template_7xzo9ad";

   emailjs.send(servideID,templateID,paras).then(
      res=>{
        document.getElementById('name').value='';
        document.getElementById('email').value='';
        document.getElementById('topic').value='';
        document.getElementById('message').value='';
        alert('Your message has been sent successfully.🎉✨')
    }).catch((err)=>console.log(err));
})



 
