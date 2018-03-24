var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');

module.exports.loop = function () {

    if (Game.time % 10 == 0) {
        respawnDeadCreeps()
    }

    processRoles()
}

var processRoles = function () {
  for (var name in Game.creeps) {
      var creep = Game.creeps[name];
      switch(creep.memory.role) {
          case 'builder':
              roleBuilder.run(creep);
              break;
          case 'harvester':
              roleHarvester.run(creep);
              break;
          case 'repairer':
              roleRepairer.run(creep);
              break;
          case 'upgrader':
              roleUpgrader.run(creep);
              break;
          default:
              console.log('Role unknown: ' + creep.memory.role + creep.name)
              roleHarvester.run(creep);
      }
  }
}

var respawnDeadCreeps () {
  for(var name in Memory.creeps) {
      if(!Game.creeps[name]) {
          Game.spawns['Carthage'].spawnCreep([WORK, CARRY, MOVE], name, {
              memory: {role: Memory.creeps[name].role}
          });
          console.log('Recreating creep:', name);
      }
  }
}
