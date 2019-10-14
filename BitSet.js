function BitSet(value) {
	this.value = value || 0;
	this.at = function(index){
		return (this.value & Math.pow(2, index)) > 0;
	}
	this.set = function(index){
		this.value |= Math.pow(2, index);
	}
	this.reset = function(index){
		this.value &= ~(Math.pow(2, index));
	}
	this.flip = function(index){
		this.value ^= Math.pow(2, index);
	}
	this.log2 = function(){
		return this.value === 0 || Math.log2(this.value) === parseInt(Math.log2(this.value));
	}
}
