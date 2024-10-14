const axios = require('axios');

const MAX_HP = 300;

let playerHP = MAX_HP;
let botHP = MAX_HP;

// Function to get a Pokémon from the API by its name or ID
async function getPokemon(pokemonName) {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        return null;
    }
}

// Function to choose 5 random moves for the Pokémon
function getRandomMoves(moves) {
    let selectedMoves = [];
    while (selectedMoves.length < 5 && moves.length > 0) {
        let randomIndex = Math.floor(Math.random() * moves.length);
        let move = moves[randomIndex].move;
        selectedMoves.push(move);
        moves.splice(randomIndex, 1); // Remove selected move to avoid duplicates
    }
    return selectedMoves;
}

// Function to get move details from the API
async function getMoveDetails(moveUrl) {
    try {
        const response = await axios.get(moveUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching move data:', error);
        return null;
    }
}

// Function to calculate damage (simplified)
function calculateDamage(power) {
    return Math.floor(power / 10); // Damage calculation based on move power
}

// Function to check if a move hits (based on accuracy)
function moveHits(accuracy) {
    let chance = Math.random() * 100;
    return chance <= accuracy;
}

// Simulate a turn
async function playTurn(playerMove, botMove) {
    // Player attacks bot
    const playerMoveDetails = await getMoveDetails(playerMove.url);
    if (moveHits(playerMoveDetails.accuracy)) {
        let damage = calculateDamage(playerMoveDetails.power);
        botHP -= damage;
        console.log(`Player's ${playerMove.name} hits! Bot loses ${damage} HP (Bot HP: ${botHP})`);
    } else {
        console.log(`Player's ${playerMove.name} missed!`);
    }

    // Bot attacks player
    const botMoveDetails = await getMoveDetails(botMove.url);
    if (moveHits(botMoveDetails.accuracy)) {
        let damage = calculateDamage(botMoveDetails.power);
        playerHP -= damage;
        console.log(`Bot's ${botMove.name} hits! Player loses ${damage} HP (Player HP: ${playerHP})`);
    } else {
        console.log(`Bot's ${botMove.name} missed!`);
    }
}

// Main game loop
async function startGame(playerPokemonName) {
    // Player chooses a Pokémon
    const playerPokemon = await getPokemon(playerPokemonName);
    if (!playerPokemon) return;

    // Bot randomly selects a Pokémon
    const randomPokemonId = Math.floor(Math.random() * 898) + 1; // Get a random Pokémon ID (up to Gen 8)
    const botPokemon = await getPokemon(randomPokemonId);
    if (!botPokemon) return;

    console.log(`Player chose ${playerPokemon.name}!`);
    console.log(`Bot chose ${botPokemon.name}!`);

    // Player and Bot choose 5 random moves
    const playerMoves = getRandomMoves(playerPokemon.moves);
    const botMoves = getRandomMoves(botPokemon.moves);

    // Show player moves
    console.log('Your available moves:');
    playerMoves.forEach((move, index) => console.log(`${index + 1}: ${move.name}`));

    // Game loop
    while (playerHP > 0 && botHP > 0) {
        // Player selects a move (for simplicity, we randomly pick a move here)
        const playerMove = playerMoves[Math.floor(Math.random() * playerMoves.length)];

        // Bot selects a random move
        const botMove = botMoves[Math.floor(Math.random() * botMoves.length)];

        // Play one turn
        await playTurn(playerMove, botMove);

        // Check if game over
        if (playerHP <= 0) {
            console.log('You lost! Better luck next time.');
            return;
        } else if (botHP <= 0) {
            console.log('You won! Congratulations!');
            return;
        }
    }
}

// Start the game
startGame('pikachu');  // Player chooses 'Pikachu'
