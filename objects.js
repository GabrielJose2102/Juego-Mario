export const createFloor = (game, start, height, name, x, y)=> {
    game.floor.create(start, height, name)
    .setOrigin(x, y)
    .refreshBody()
}

export const createCloud1 = (game, start, height, name, x, y, z)=> {
    game.add.image(start, height, name)
    .setOrigin(x, y)
    .setScale(z)
}