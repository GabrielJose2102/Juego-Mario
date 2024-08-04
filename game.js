/* global phaser */

import { createAnimations } from "./animations.js";
import { createFloor, createCloud1 } from "./objects.js";

const config = {
    type: Phaser.AUTO,
    width: 400,
    height: 400,
    backgroundColor: '#049cd8',
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug: false
        }
    },
    scene: {
        preload, // se ejecuta para precargar recursos
        create, // se ejecuta cuando el juego comienza
        update // se ejecuta en cada frame
    }
}

new Phaser.Game(config);

//Pre-cargar
function preload() {
// this --> game --> el juego que estamos construyendo

    //Imagenes 
    this.load.image(
        'cloud1',
        'assets/scenery/overworld/cloud1.png'
    );

    this.load.image(
        'floorbricks',
        'assets/scenery/overworld/floorbricks.png'
    );

    //Sprites
    //personaje mario
    this.load.spritesheet(
        'mario',
        'assets/entities/mario.png',
        {frameWidth: 18, frameHeight: 16}
    )

    //blocks $
    this.load.spritesheet(
        'mistery-block',
        'assets/blocks/overworld/misteryBlock.png',
        {frameWidth: 48, frameHeight: 16}
    )

    //audios
    //Muerte de mario
    this.load.audio('gameover', "assets/sound/music/gameover.mp3")

    //audio de salto
    this.load.audio('jump', "assets/sound/effects/jump.mp3")
    
}

//Crear funciones
function create() {
    // image(x, y, id-del-asset(imagen))

    //Nubes
    createCloud1(this, 30, 50, 'cloud1', 0, 0, 0.15)
    createCloud1(this, 150, 40, 'cloud1', 0, 0, 0.15)
    createCloud1(this, 250, 70, 'cloud1', 0, 0, 0.15)
    createCloud1(this, 360, 50, 'cloud1', 0, 0, 0.15)

    //Agrupar los elementos que crean el suelo para agragar las fisicas en general
    this.floor = this.physics.add.staticGroup()

    //Suelo de ladrillo naranja
    /* this.floor.create(0, config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
    .refreshBody() */
    createFloor(this, 0, config.height - 16, 'floorbricks', 0, 0.5)

    /* this.floor.create(128, config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
    .refreshBody() */
    createFloor(this, 128, config.height - 16, 'floorbricks', 0, 0.5)

    createFloor(this, 256, config.height - 16, 'floorbricks', 0, 0.5)

    createFloor(this, 384, config.height - 16, 'floorbricks', 0, 0.5)

    createFloor(this, 542, config.height - 16, 'floorbricks', 0, 0.5)

    createFloor(this, 670, config.height - 16, 'floorbricks', 0, 0.5)

    createFloor(this, 828, config.height - 16, 'floorbricks', 0, 0.5)
    

    // image(x, y, id-del-asset(sprite))

    //mario credo sin fisicas
    //this.mario = this.add.sprite(80, 552, 'mario')

    //mario creado con las fisicas agregadas
    this.mario = this.physics.add.sprite(50, 150, 'mario')
    .setOrigin(0, 1)
    .setCollideWorldBounds(true)
    .setGravityY(500)

    //crear mistery-blocks
    this.misteryBlock = this.physics.add.sprite(150, 900, 'mistery-block')


    //Espacio del mundo (ancho)
    this.physics.world.setBounds(0, 0, 2000, config.height)

    //Creando colision del mario con el suelo
    this.physics.add.collider(this.mario, this.floor)

    //configuracion de camara
    this.cameras.main.setBounds(0, 0, 2000, config.height)
    this.cameras.main.startFollow(this.mario)

    createAnimations(this)

    // Para visualizar las teclas
    this.keys = this.input.keyboard.createCursorKeys()

    
}

//Actualizar funciones
function update() {
    // Frenar animaciones cuando mario esta muerto
    if (this.mario.isDead) return

    // Mover el mario
    if (this.keys.left.isDown) {
        this.mario.anims.play('mario-walk', true)
        this.mario.x -= 2
        this.mario.flipX = true
    } else if (this.keys.right.isDown) {
        this.mario.anims.play('mario-walk', true)
        this.mario.x += 2
        this.mario.flipX = false
    } else {
        this.mario.anims.play('mario-idle', true)
    }

    // Salto de mario
    if(this.keys.up.isDown && this.mario.body.touching.down) {
        this.mario.setVelocityY(-300)
        this.mario.anims.play('mario-jump', true)
        this.sound.play('jump')
    }

    // Muerte de mario
    if (this.mario.y >= config.height) {
        this.mario.isDead = true
        this.mario.anims.play('mario-dead')
        this.mario.setCollideWorldBounds(false)
        this.sound.play('gameover', {volumen: 0.2})

        setTimeout(()=> {
            this.mario.setVelocityY(-350)
        }, 100)

        setTimeout(()=> {
            this.scene.restart()
        }, 2000)
    }
}