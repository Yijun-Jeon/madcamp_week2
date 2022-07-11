import {skills} from './Skills.js';

class Pokemon{
    constructor(name,type,health,imgfront,imgback,imgbattlefront,imgbattleback,skills){
        this.name = name;
        this.type = type;
		this.health = health;
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
pokemons.push(new Pokemon('피카츄','전기',330,require('../../public/images/pikachu.gif'),require('../../public/images/pikachu_back.gif')
            ,require('../../public/images/pikachu_battle.gif'),require('../../public/images/pikachu_battle_back.gif')
            ,[skills['몸통박치기'],skills['꼬리 흔들기'],skills['10만 볼트'],skills['100만 볼트']]))
  
pokemons.push(new Pokemon('파이리','불꽃',330,require('../../public/images/paili.gif'),require('../../public/images/paili_back.gif')
,require('../../public/images/paili_battle.gif'),require('../../public/images/paili_battle_back.gif')
,[skills['몸통박치기'],skills['울음소리'],skills['화염방사'],skills['불대문자']]))

pokemons.push(new Pokemon('꼬부기','물',300,require('../../public/images/kkobugi.gif'),require('../../public/images/kkobugi_back.gif')
,require('../../public/images/kkobugi_battle.gif'),require('../../public/images/kkobugi_battle_back.gif')
,[skills['몸통박치기'],skills['물대포'],skills['아쿠아테일'],skills['하이드로펌프']]))

pokemons.push(new Pokemon('이상해씨','풀',350,require('../../public/images/isanghaessi.gif'),require('../../public/images/isanghaessi_back.gif')
,require('../../public/images/isanghaessi_battle.gif'),require('../../public/images/isanghaessi_battle_back.gif')
,[skills['몸통박치기'],skills['꼬리 흔들기'],skills['매지컬리프'],skills['지진']]))

pokemons.push(new Pokemon('뮤','에스퍼',280,require('../../public/images/myu.gif'),require('../../public/images/myu_back.gif')
,require('../../public/images/myu_battle.gif'),require('../../public/images/myu_battle_back.gif')
,[skills['몸통박치기'],skills['빛의 장막'],skills['사이코키네시스'],skills['수면']]))

let playerParty = [];
let enemyParty = [];

export {pokemons};
            