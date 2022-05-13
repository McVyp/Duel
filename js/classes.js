class Liu{
    constructor({
            position, 
            imageSrc, 
            scale = 1, 
            framesMax= 1, 
            framesCurrent=0, 
            framesEllapsed=0, 
            framesHold= 8, 
            offset ={x:0, y:0}
        }){
        this.position = position
        this.width= 50
        this.height =150
        this.image = new Image()
        this.image.src= imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = framesCurrent
        this.framesEllapsed = framesEllapsed
        this.framesHold = framesHold
        this.offset= offset
    }

    draw(){
        can.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            
            this.position.x -this.offset.x, 
            this.position.y -this.offset.y, 
            (this.image.width / this.framesMax) * this.scale, 
            this.image.height * this.scale
        )
    }

    animateFrames(){
        this.framesEllapsed++

        if(this.framesEllapsed % this.framesHold ===0)
        {
        if(this.framesCurrent < this.framesMax -1){
            this.framesCurrent++
        }else {
            this.framesCurrent = 0
        }
        }
    }
    update(){
        this.draw()
        this.animateFrames()
    }
}

class Fighter extends Liu{
    constructor({
        position, 
        velocity, 
        color, 
        imageSrc, 
        scale = 1, 
        framesMax= 1, 
        framesCurrent=0, 
        framesEllapsed=0, 
        framesHold= 8, 
        offset ={x:0, y:0},
        lius,
        attackBox ={ offset:{}, width: undefined, height: undefined}
    }
        
        ){
        super({
            imageSrc,
            scale,
            framesMax,
            framesCurrent,
            framesHold,
            framesEllapsed,
            position,
            offset,
        })
        this.velocity = velocity
        this.width= 50
        this.height =150
        this.lastKey
        this.attackBox ={
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
        }
        this.color= color
        this.isAttacking
        this.health =100
        this.lius = lius
        this.dead = false

        for(let les in this.lius){
            lius[les].image = new Image()
            lius[les].image.src = lius[les].imageSrc  
        }
        console.log(this.lius);
    }

    update(){
        this.draw()
        if(!this.dead) this.animateFrames()
       
        this.attackBox.position.x= this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y +this.attackBox.offset.y

        // draw attack box
        // can.fillRect(
        //     this.attackBox.position.x, 
        //     this.attackBox.position.y, 
        //     this.attackBox.width, 
        //     this.attackBox.height
        //     )

        this.position.x+=this.velocity.x
        this.position.y += this.velocity.y

        //gravity
        if(this.position.y + this.height +this.velocity.y>= canvas.height -96){
            this.velocity.y = 0;
            this.position.y = 330
        }else{
            this.velocity.y += gravity
        } 
        
    }
    attack(){
        this.switchLes('strike1')
        this.isAttacking = true
    }

    takehit(){
        this.health -=10
        if(this.health <=0){
            this.switchLes('death')
        }else this.switchLes('takehit')
        
    }

    switchLes(les){

        if(this.image === this.lius.death.image){
            if(this.framesCurrent === this.lius.death.framesMax-1) 
                this.dead = true 
            return
        }
        //overide all animations with the attack animation
        if(this.image === this.lius.strike1.image && this.framesCurrent <this.lius.strike1.framesMax-1)
        reutrn

        //override when fighter gets hit

        if(this.image === this.lius.takehit.image && this.framesCurrent < this.lius.takehit.framesMax-1)
        return
        switch(les) {
            case 'idle':
                if(this.image !== this.lius.idle.image){
                    this.image = this.lius.idle.image
                    this.framesMax = this.lius.idle.framesMax
                    this.framesCurrent =0
                }
                break
            
            case 'run':
                if(this.image!== this.lius.run.image){
                    this.image = this.lius.run.image
                    this.framesMax = this.lius.run.framesMax
                    this.framesCurrent =0
                }
                break

                case 'run1':
                    if(this.image!== this.lius.run1.image){
                        this.image = this.lius.run1.image
                        this.framesMax = this.lius.run1.framesMax
                        this.framesCurrent =0
                    }
                    break    

            case 'jump':
                if(this.image!== this.lius.jump.image){
                this.image = this.lius.jump.image
                this.framesMax = this.lius.jump.framesMax
                this.framesCurrent=0
                }
                break 
            
            case 'fall':
                if(this.image!== this.lius.fall.image){
                this.image = this.lius.fall.image
                this.framesMax = this.lius.fall.framesMax
                this.framesCurrent=0
                }
                break 

            case 'strike1':
                if(this.image!== this.lius.strike1.image){
                this.image = this.lius.strike1.image
                this.framesMax = this.lius.strike1.framesMax
                this.framesCurrent=0
                }
                break 

            case 'takehit':
                if(this.image!== this.lius.takehit.image){
                this.image = this.lius.takehit.image
                this.framesMax = this.lius.takehit.framesMax
                this.framesCurrent=0
                }
                break 

            case 'death':
                if(this.image!== this.lius.death.image){
                this.image = this.lius.death.image
                this.framesMax = this.lius.death.framesMax
                this.framesCurrent=0
                }
                break 
        }
    }
}

