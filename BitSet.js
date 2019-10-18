class BitSet{
	constructor(value){	//default value is 0
		this.value = value || 0;
	}
	bit(index){	//only bit at index is 1
		return 1 << index;
	}
	at(index){	//true if bit at index is 1, false if it is 0
		return (this.value & this.bit(index)) > 0;
	}
	set(index){	//set bit at index to 1 regardless of current value
		this.value |= this.bit(index);
	}
	reset(index){	//set bit at index to 0 regardless of current value
		this.value &= ~(this.bit(index));
	}
	flip(index){	//flip bit at index. 1->0, 0->1
		this.value ^= this.bit(index);
	}
	log2(){	//true if value is 0 or value is a power of 2
		let log = Math.log2(this.value);
		return this.value === 0 || log === parseInt(log);
	}
}
