const body  = document.querySelector('body')

const nav = document.querySelector('nav')
const aboutButton = document.querySelector('#aboutButton')
const peopleButton = document.querySelector('#peopleButton')
const childrenButton = document.querySelector('#childrenButton')
const interiorsButton = document.querySelector('#interiorsButton')
const manipulationButton = document.querySelector('#manipulationButton')
const retouchButton = document.querySelector('#retouchButton')
const restorationButton = document.querySelector('#restorationButton')

const masonry  = document.querySelector('.masonry')
const aboutInfo  = document.querySelector('.about')

const carosel = document.querySelector('.carosel')
const closeButton = document.querySelector('.close')
const arrow_left = document.querySelector('.arrow_left')
const arrow_right = document.querySelector('.arrow_right')

const imgprev = document.querySelector('#imgprev')
const imgcur = document.querySelector('#imgcur')
const imgnext = document.querySelector('#imgnext')
const imgWrapperPrev = document.querySelector('#imgwrapperprev')
const imgWrapperCur = document.querySelector('#imgwrappercur')
const imgWrapperNext = document.querySelector('#imgwrappernext')

const burgermenu = document.querySelector('.burgermenu')
const xmenu = document.querySelector('.xmenu')
const openMenuBtn = document.querySelector('.open_menu_btn')


//  массивы с фотками по категориям ------>>>

const about =['about']

const people = [
   
]
const children = [
    
]
const interiors = [
    
]
const manipulation = [
   
]
const retouch = [

    [
        './photos/thumbnails_retouch/1.jpg',
        './retouch/1.jpg'
    ],
  
  
    
  
    
]
const restoration = [
    [
        './photos/thumbnails_restoration/001t.jpg',

        ''
    ],
    [
        './photos/thumbnails_restoration/002t.jpg',

        ''
    ],
    [
        './photos/thumbnails_restoration/003t.jpg',

        ''
    ],
    [
        './photos/thumbnails_restoration/004t.jpg',

        ''
    ],
    [
        './photos/thumbnails_restoration/005t.jpg',

        ''
    ],
    [
        './photos/thumbnails_restoration/006t.jpg',

        ''
    ],
    [
        './photos/thumbnails_restoration/007t.jpg',

        ''
    ],
    [
        './photos/thumbnails_restoration/008t.jpg',

        ''
    ],
   
]



// <<<----------массивы с фотками по категориям


// анимация навигации при скролле  ------>>>
window.addEventListener('scroll', function() {
    if(window.scrollY>200){
        nav.classList.add('nav_close')
    }else if(window.scrollY<200){
        nav.classList.remove('nav_close')
    }
});

// <<<--------   анимация навигации при скролле 

let curArr = [...about]
let curId = 0

// свитчер бургерменю моб версия ------>>>

const burgerOn = () => nav.classList.add('nav_burger')
const burgerOff = () => nav.classList.remove('nav_burger')
burgermenu.addEventListener('click',() => burgerOn())
openMenuBtn.addEventListener('click',() => burgerOn())
xmenu.addEventListener('click',() => burgerOff())

// <<<------- свитчер бургерменю моб версия

// кликаем кнопки меню --------->>

const navMenuButtonsHandler = (tempArr , avtiveBtn) => {
    curArr = [...tempArr]
    render()
    burgerOff()

    aboutButton.classList.remove('active_nav_button')
    peopleButton.classList.remove('active_nav_button')
    childrenButton.classList.remove('active_nav_button')
    interiorsButton.classList.remove('active_nav_button')
    manipulationButton.classList.remove('active_nav_button')
    retouchButton.classList.remove('active_nav_button')
    restorationButton.classList.remove('active_nav_button')

    avtiveBtn.classList.add('active_nav_button')
}

aboutButton.addEventListener('click',()=> navMenuButtonsHandler(about , aboutButton))
peopleButton.addEventListener('click',()=> navMenuButtonsHandler(people , peopleButton ))
childrenButton.addEventListener('click',()=> navMenuButtonsHandler(children , childrenButton))
interiorsButton.addEventListener('click',()=> navMenuButtonsHandler(interiors , interiorsButton))
manipulationButton.addEventListener('click',()=> navMenuButtonsHandler(manipulation , manipulationButton))
retouchButton.addEventListener('click',()=> navMenuButtonsHandler(retouch , retouchButton))
restorationButton.addEventListener('click',()=> navMenuButtonsHandler(restoration , restorationButton))

// << ---------    кликаем кнопки меню 

// modal window handler ----------------------------------------->>>>>>>>>>
const openModal = (index) => () => {
    curId = index
    carosel.classList.add('carosel_active')
    imgcur.setAttribute('src',`${curArr[curId][1]}`)
}

const closeModal = (e) => {
    if(e.target == e.currentTarget){
        carosel.classList.remove('carosel_active')
    }
}

const animatedPhoto = (direction) => {
    const swapId = (direction === 'next') 
    ? (curId+1)%curArr.length 
    : (curId-1+curArr.length)%curArr.length ;

    if(direction === 'next'){
        imgnext.src =curArr[swapId][1]
        imgWrapperCur.classList.add('cur_animate_left')
        imgWrapperNext.classList.add('next_animate')
    }else{
        imgprev.src =curArr[swapId][1]
        imgWrapperCur.classList.add('cur_animate_rigth')
        imgWrapperPrev.classList.add('prev_animate')
    }

    setTimeout(() => {
        imgcur.src = curArr[swapId][1]
        imgnext.src = ''
        imgprev.src = ''
        imgWrapperCur.classList.remove('cur_animate_left')
        imgWrapperNext.classList.remove('next_animate')
        imgWrapperCur.classList.remove('cur_animate_rigth')
        imgWrapperPrev.classList.remove('prev_animate')
        curId = swapId
    }, 250)

    
}

const nextPhoto = () => {
    animatedPhoto('next')
}

const prevPhoto = () => {
    animatedPhoto('prev')
}

let startX = 0

imgcur.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX
    // console.log(startX)
})

imgcur.addEventListener('touchend', (e) => {
    let diff = e.changedTouches[0].clientX - startX
    if (Math.abs(diff) > 50){
       diff>0? prevPhoto() : nextPhoto()
    } 
     
})

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevPhoto()
    } else if (e.key === 'ArrowRight') {
        nextPhoto()
    } else if (e.key === 'Escape') {
        carosel.classList.remove('carosel_active')
      }
  });


closeButton.addEventListener('click',closeModal )
imgWrapperCur.addEventListener('click',closeModal )
carosel.addEventListener('click',closeModal )
arrow_right.addEventListener('click',nextPhoto)
arrow_left.addEventListener('click',prevPhoto)


//<<<<<<<<-------------------------------- modal window handler




const render = async () => {
    masonry.innerHTML = ''

    if(curArr[0] === 'about'){
        aboutInfo.classList.remove('about_hidden')
    }else{
        aboutInfo.classList.add('about_hidden')
        const masonryBlock1 = document.createElement('div')
        const masonryBlock2 = document.createElement('div')
        const masonryBlock3 = document.createElement('div')
        masonryBlock1.classList.add('masonry_block')
        masonryBlock2.classList.add('masonry_block')
        masonryBlock3.classList.add('masonry_block')
        masonry.append(masonryBlock1)
        masonry.append(masonryBlock2)
        masonry.append(masonryBlock3)

          const loadImage = (src) => {
            return new Promise((resolve, reject) => {
            const img =  document.createElement('img')
            img.setAttribute('src',`${src}`)
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`download not success ${src}`));
            });
        };
        for(let i = 0; i < curArr.length; i++){
            const ph = curArr[i];

            let newPhoto
            // newPhoto.setAttribute('src',`${ph[0]}`)
            try {
                newPhoto = await loadImage(ph[0]); // ждем загрузки
                newPhoto.classList.add('photo');
            } catch(e) {
                console.warn(e);
                continue; // если не загрузилась — пропускаем
            }
            

            const hiddenPhoto = document.createElement('img')
            hiddenPhoto.setAttribute('src',`${ph[1]}`)
            hiddenPhoto.setAttribute('class',`hidden_photo`)


            if(masonryBlock1.offsetHeight<=masonryBlock2.offsetHeight && masonryBlock1.offsetHeight<=masonryBlock3.offsetHeight){
                masonryBlock1.append(newPhoto)
                masonryBlock1.append(hiddenPhoto)
            }else if(masonryBlock2.offsetHeight<=masonryBlock3.offsetHeight){
                masonryBlock2.append(newPhoto)
                masonryBlock2.append(hiddenPhoto)
            }else{
               masonryBlock3.append(newPhoto)
               masonryBlock3.append(hiddenPhoto)
            }
        
            
        
            newPhoto.addEventListener('click',openModal(i) )
        
        }
       
    }
}

render()
aboutButton.classList.add('active_nav_button')

