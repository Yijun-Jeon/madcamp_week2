class Pokemon{
    constructor(name,type,imgfront,imgback,imgbattlefront,imgbattleback,skills){
        this.name = name;
        this.type = type;
        this.imgfront = imgfront;
        this.imgback = imgback;
        this.imgbattlefront = imgbattlefront;
        this.imgbattleback = imgbattleback;
        this.skills = skills;
    }

    decrementHealth(damage) {
		this.health -= damage;
        // 다음 포켓몬 등장
		// if (this.health <= 0) {
		// 	if (this.owner == 'player') {
		// 		playerPokemon = this.faint(playerPokemon, playerParty);
		// 	}
		// 	if (this.owner == 'enemy') {
		// 		enemyPokemon = this.faint(enemyPokemon, enemyParty);
		// 	}
		// }
		if (this.health > this.maxhealth) {
			this.health = this.maxhealth;
		}
	}

	attack(target, move) {
		if (move.target == 'self') {
			this.decrementHealth(Math.round(this.maxhealth * move.damage));
		} else {
		target.decrementHealth(move.damage);
		}
	}

	// Faint function will pull the next pokemon in the array into the battle
	// faint(currentPokemon, party) {
	// 	var foundPokemon = false;
	// 	if (this.health <= 0) {
	// 		console.log('fainted!');
	// 		this.alive = false;
	// 		for (var i = 0; i < party.length; i++) {
	// 			if (party[i].alive == true) {
	// 				foundPokemon = true;
	// 				currentPokemon = party[i];
	// 				console.log(currentPokemon.pokename)
	// 				break;
	// 			}
	// 		}
	// 		if (foundPokemon == false) {
	// 			endGame();
	// 		}
	// 		return currentPokemon;
	// 	}
	// }
}

const pokemons = [];
pokemons.push(new Pokemon('피카츄','전기','../../public/images/pikachu.gif','../../public/images/pikachu_back.gif'
            ,'../../public/images/pikachu_battle.gif','../../public/images/pikachu_battle_back.gif'
            ,['몸통박치기','10만 볼트','100만 볼트','꼬리 흔들기']))
  
pokemons.push(new Pokemon('파이리','W불꽃','../../public/images/paili.gif','../../public/images/paili_back.gif'
,'../../public/images/paili_battle.gif','../../public/images/paili_battle_back.gif'
,['몸통박치기','10만 볼트','100만 볼트','꼬리 흔들기']))

pokemons.push(new Pokemon('꼬부기','물','../../public/images/kkobugi.gif','../../public/images/kkobugi_back.gif'
,'../../public/images/kkobugi_battle.gif','../../public/images/kkobugi_battle_back.gif'
,['몸통박치기','10만 볼트','100만 볼트','꼬리 흔들기']))

pokemons.push(new Pokemon('이상해씨','풀','../../public/images/isanghaessi.gif','../../public/images/isanghaessi_back.gif'
,'../../public/images/isanghaessi_battle.gif','../../public/images/isanghaessi_battle_back.gif'
,['몸통박치기','10만 볼트','100만 볼트','꼬리 흔들기']))

pokemons.push(new Pokemon('뮤','에스퍼','../../public/images/myu.gif','../../public/images/myu_back.gif'
,'../../public/images/myu_battle.gif','../../public/images/myu_battle_back.gif'
,['몸통박치기','10만 볼트','100만 볼트','꼬리 흔들기']))

let playerParty = [];
let enemyParty = [];

export {pokemons};
            