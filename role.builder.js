var roleBuilder = {

    creep: null

    /** @param {Creep} creep **/
    run: function(creep) {
      this.creep = creep

	    if (spentAllEnergy()) {
            creep.memory.building = false;
            creep.say('harvesting');
	    }

	    if (obtainedMaxEnergy()) {
	        creep.memory.building = true;
	        creep.say('building');
	    }

	    if (creep.memory.building) {
	        buildOrMoveToSite()
	    }
	    else {
	        moveToSource()
	    }
	  }

    spentAllEnergy: function() {
      return this.creep.memory.building && this.creep.carry.energy == 0
    }

    obtainedMaxEnergy: function() {
      return !this.creep.memory.building && creep.carry.energy == this.creep.carryCapacity
    }

    buildOrMoveToSite: function() {
      var targets = this.creep.room.find(FIND_CONSTRUCTION_SITES);
        if(targets.length) {
            if(this.creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(targets[0]);
            }
        }
    }

    moveToSource: function() {
      var sources = this.creep.room.find(FIND_SOURCES);
        if(this.creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(sources[1]);
        }
    }
};

module.exports = roleBuilder;
