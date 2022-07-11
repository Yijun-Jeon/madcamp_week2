let skills = {
    '몸통박치기': {
        name: '몸통박치기',
		type: '공격',
        damage: 30,
        target: 'enemy',
		skilltype: '노말',
    },
    '10만 볼트': {
        name: '10만 볼트',
		type: '공격',
        damage: 25,
        target: 'enemy',
		skilltype: '전기',
	},
	'100만 볼트': {
		name: '100만 볼트',
		type: '공격',
		damage: 50,
		target: 'enemy',
		skilltype: '전기',
	},
	'꼬리 흔들기': {
		name: '꼬리 흔들기',
		type: '방디버프',
		damage: 10,
		target: 'enemy',
		skilltype: '노말',
	},
	'울음소리': {
		name: '울음소리',
		type: '공디버프',
		damage: 10,
		target: 'enemy',
		skilltype: '노말',
	},
	'화염방사': {
		name: '화염방사',
		type: '공격',
		damage: 50,
		target: 'enemy',
		skilltype: '불꽃',
	},
	'불대문자': {
		name: '불대문자',
		type: '공격',
		damage: 100,
		target: 'enemy',
		skilltype: '불꽃',
	},
	'물대포': {
		name: '물대포',
		type: '공격',
		damage: 30,
		target: 'enemy',
		skilltype: '물',
	},
	'아쿠아테일': {
		name: '아쿠아테일',
		type: '공격',
		damage: 50,
		target: 'enemy',
		skilltype: '물',
	},
	'하이드로펌프': {
		name: '하이드로펌프',
		type: '공격',
		damage: 100,
		target: 'enemy',
		skilltype: '물',
	},
	'매지컬리프': {
		name: '매지컬리프',
		type: '공격',
		damage: 50,
		target: 'enemy',
		skilltype: '풀',
	},
	'지진': {
		name: '지진',
		type: '공격',
		damage: 100,
		target: 'enemy',
		skilltype: '땅',
	},
	'사이코키네시스': {
		name: '사이코키네시스',
		type: '공격',
		damage: 50,
		target: 'enemy',
		skilltype: '에스퍼',
	},
	'빛의 장막': {
		name: '빛의 장막',
		type: '방버프',
		damage: 10,
		target: 'self',
		skilltype: '노말',
	},
	'수면': {
		name: '수면',
		type: '힐',
		damage: 100,
		target: 'self',
		skilltype: '노말',
	}
};

function checkType(type1, type2){
	if(type1 == '노말' || type2 == '노말')
		return 1;
	switch(type1){
		case '불꽃':
			switch(type2){
				case '불꽃':
				case '물':
					return 0.5;
				case '풀':
					return 2;
				default:
					return 1;
			}
		case '물':
			switch(type2){
				case '물':
				case '풀':
					return 0.5;
				case '불꽃':
					return 2;
				default:
					return 1;
			}
		case '풀':
			switch(type2){
				case '불꽃':
				case '풀':
					return 0.5;
				case '물':
					return 2;
				default:
					return 1;
			}
		case '에스퍼':
			switch(type2){
				case '에스퍼':
					return 0.5;
				default:
					return 1;
			}
		case '전기':
			switch(type2){
				case '전기':
				case '풀':
					return 0.5;
				case '물':
					return 2;
				default:
					return 1;
			}
		case '땅':
			switch(type2){
				case '풀':
					return 0.5;
				case '불꽃':
				case '전기':
					return 2;
				default:
					return 1;
			}
	}
}

export {skills, checkType};