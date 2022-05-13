const canvas = document.querySelector('canvas');
const can = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

can.fillRect(0, 0, canvas.width, canvas.height)

const gravity =0.5

const background = new Liu({
    position:{
        x:0,
        y:0
    },
    imageSrc: './images/background.png'
})

const shop = new Liu({
    position:{
        x:715,
        y:145
    },
    imageSrc: './images/shop.png',
    scale: 2.6,
    framesMax: 6
})


const player = new Fighter({
    position:{
    x:0,
    y:0
    },
    velocity:{
        x: 0, 
        y: 0
    },
    offset:{
        x:0,
        y:0
    },
   
    scale:2.5,
    offset:{
        x: 120,
        y: 136
    },
     
    lius: {
        idle:{
            imageSrc:'./images/Hero/Idle.png',
            framesMax: 11
        },

        run:{
            imageSrc:'./images/Hero/Run.png',
            framesMax: 8
        },

        run1:{
            imageSrc:'./images/Hero/Run1.png',
            framesMax: 8
        },

        jump:{
            imageSrc:'./images/Hero/Jump.png',
            framesMax: 3
        },

        fall:{
            imageSrc:'./images/Hero/Fall.png',
            framesMax: 3
        },

        strike1:{
            imageSrc:'./images/Hero/Strike1.png',
            framesMax: 7
        },

        takehit:{
            imageSrc:'./images/Hero/Take Hit.png',
            framesMax: 4
        },

        death:{
            imageSrc:'./images/Hero/Death.png',
            framesMax: 11
        }
    },

    attackBox:{
        offset:{
            x: 100,
            y:50
        },
        width: 100,
        height:50
    }
})


const foe = new Fighter({
    position:{
    x:700,
    y: 100
    },
    velocity:{
        x: 0, 
        y: 0
    },
    scale: 3,
    offset:{
        x: 120,
        y: 143
    },
    imageSrc:'./images/Huntress/Idle.png',
    framesMax: 8,
    lius: {
        idle:{
            imageSrc:'./images/Huntress/Idle.png',
            framesMax:8
        },

        run:{
            imageSrc:'./images/Huntress/Run.png',
            framesMax: 8
        },
        run1:{
            imageSrc:'./images/Huntress/Run1.png',
            framesMax: 8
        },

        jump:{
            imageSrc:'./images/Huntress/Jump.png',
            framesMax: 2
        },

        fall:{
            imageSrc:'./images/Huntress/Fall.png',
            framesMax: 2
        },

        strike1:{
            imageSrc:'./images/Huntress/Strike1.png',
            framesMax: 5
        },

        takehit:{
            imageSrc:'./images/Huntress/Take hit.png',
            framesMax: 3
        },

        death:{
            imageSrc:'./images/Huntress/Death.png',
            framesMax: 8
        }
    },
    attackBox:{
        offset:{
            x:-50,
            y: 50
        },
        width: 100,
        height:50
    }
    
})

const keys ={
    a:{
        pressed:false
    },
    d:{
        pressed:false
    },
    w:{
        pressed: false
    },

    ArrowLeft:{
        pressed: false
    },

    ArrowRight:{
        pressed: false
    },

    ArrowUp:{
        pressed: false
    },
}



function animate()
{   
    can.fillStyle ="black"
    window.requestAnimationFrame(animate)
    can.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
    can.fillStyle= 'rgba(255, 255, 255, 0.1)'
    can.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    foe.update()

    player.velocity.x = 0

    //player movement
    if(keys.a.pressed && player.lastKey ==='a'){
        player.velocity.x= -5
        player.switchLes('run1')
        
    }else if(keys.d.pressed && player.lastKey==='d')
    {
        player.switchLes('run')
        player.velocity.x=5
    }else{
        player.switchLes('idle')
    }


    // player jump
    if(player.velocity.y <0){
        player.switchLes('jump')
    }else if(player.velocity.y >0)
    {
        player.switchLes('fall')
    }


    //foe movement
     foe.velocity.x =0
     if(keys.ArrowLeft.pressed && foe.lastKey ==='ArrowLeft'){
        foe.velocity.x= -5
        foe.switchLes('run')
    }else if(keys.ArrowRight.pressed && foe.lastKey==='ArrowRight')
    {
        foe.velocity.x=5
        foe.switchLes('run1')
    }else{
        foe.switchLes('idle')
    }

    // foe jump
    if(foe.velocity.y <0){
        foe.switchLes('jump')
    }else if(foe.velocity.y >0)
    {
        foe.switchLes('fall')
    }

    //collision & hit
    if( collision({
        ob1: player, 
        ob2: foe
    }) && player.isAttacking && player.framesCurrent === 4)
    {   
        foe.takehit()
        player.isAttacking= false
        gsap.to('#foe-health', {
            width: foe.health + '%'
        })
        
    }

    //miss
    if(player.isAttacking && player.framesCurrent ===4){
        player.isAttacking= false
    }

    if( collision({
        ob1: foe, 
        ob2: player
    }) && foe.isAttacking && foe.framesCurrent === 2)
    {
        player.takehit()
        foe.isAttacking= false
        gsap.to('#player-health', {
            width: player.health + '%'
        })
    }

    //miss
    if(foe.isAttacking && foe.framesCurrent === 2){
        foe.isAttacking= false
    }

    //end game on hp
    if(foe.health <= 0 || player.health <=0) {
        judge({player, foe, timerLeftID})
    }
}
animate()

window.addEventListener('keydown',(event)=>{
    if(!player.dead){

    switch(event.key){
        case 'd':
            keys.d.pressed =true
            player.lastKey='d'
            break

        case 'a':
            keys.a.pressed= true
            player.lastKey='a'
            break

        case 'w':
            player.velocity.y =-20
            break
        
        case ' ':
            player.attack()
            break

        

    }
}
    if(!foe.dead){
    switch(event.key){
        case 'ArrowLeft':
            keys.ArrowLeft.pressed =true
            foe.lastKey= 'ArrowLeft'
            break
    
        case 'ArrowRight':
            keys.ArrowRight.pressed= true
            foe.lastKey ='ArrowRight'
            break
    
        case 'ArrowUp':
            foe.velocity.y =-20
            break
        
        case 'ArrowDown':
            foe.attack()
            break
    }
}
    
})
window.addEventListener('keyup',(event)=>{
    switch(event.key){
        case 'd':
            keys.d.pressed= false
            break

        case 'a':
            keys.a.pressed= false
            break

        case 'w':
            keys.w.pressed =false 


        //for foe
        case 'ArrowLeft':
            keys.ArrowLeft.pressed= false
            break
    
        case 'ArrowRight':
            keys.ArrowRight.pressed= false
            break

        case 'ArrowUp':
            keys.ArrowDown.pressed =false         
    }
    console.log(event.key)
})