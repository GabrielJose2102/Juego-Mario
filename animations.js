export const createAnimations = (game)=> {
    //Animacion de mario caminando
    game.anims.create({
        key: 'mario-walk',
        frames: game.anims.generateFrameNumbers(
            'mario',
            {start: 3, end: 1}
        ),
        repeat: -1
    })

    //Animacion para cuando se detenga el mario
    game.anims.create({
        key: 'mario-idle',
        frames: [{key: 'mario', frame: 0}]
    })

    //Animacion de salto (mario)
    game.anims.create({
        key: 'mario-jump',
        frames: [{key: 'mario', frame: 5}]
    })

    //Animacion de muerte (mario)
    game.anims.create({
        key: 'mario-dead',
        frames: [{key: 'mario', frame: 4}]
    })
}

