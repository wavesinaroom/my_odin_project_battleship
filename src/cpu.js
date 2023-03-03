import Missile from './missile';
import {coordinate, shipOrientation} from './gameboard'
import {shipType} from './ship';
export {cpu};

const cpu = {

  hits : [],

  getRandomShot(input){
    if(this.hits.length===0){
      this.hits.push([input]);
      return;
    }
    this.hits.forEach(hit=>{
      if(!this.updateMoves(hit, input)){
        if(hit.length ===1){
          const temp = this.generateMoves(hit[0], input);
          hit.splice(0,1)
          hit.push(...temp) ;
        }
        else{
          this.hits.push([input])
        }
      }
    });

    try{
      return this.getRandomCoordinate();
    }catch{
      return this.getRandomCoordinate();
    }
  },

  updateMoves(moves, input){
    let isUpdated = false;
    for(let i = 0; i<moves.length; ++i){
      if(input.coordinate.x === moves[i].coordinate.x && input.coordinate.y === moves[i].coordinate.y) {
        moves[i].hit = true;
        isUpdated = true;
      }
    }
    return isUpdated;
  },

  getRandomCoordinate(){
    let randomSet = Math.floor(Math.random()*this.hits.length);
    let randomMove = Math.floor(Math.random()*this.hits[randomSet].length);
    console.log(randomSet,randomMove)
    if(!this.hits[randomSet][randomMove].hit&&this.hits[randomSet].length>1)
      return this.hits[randomSet][randomMove].coordinate;
  },

  generateMoves(existing, incoming){
    const shift = 2;
    let orientation, distance, start, end, first; 
    let moves = [];

    if(existing.coordinate.x-incoming.coordinate.x === 0 && Math.abs(existing.coordinate.y-incoming.coordinate.y)<4)
      orientation = shipOrientation.VERTICAL;
    else if(existing.coordinate.y-incoming.coordinate.y === 0 && Math.abs(existing.coordinate.x-incoming.coordinate.x)<4)
      orientation = shipOrientation.HORIZONTAL;
    else{
      this.hits.push([incoming]);
      return;
    }

    if(orientation === shipOrientation.VERTICAL){
      distance = Math.abs(existing.coordinate.y-incoming.coordinate.y)-1;
      if(existing.coordinate.y < incoming.coordinate.y){
        first = existing;
        start = existing.coordinate.y-(shift-distance);
        end = incoming.coordinate.y+(shift-distance); 
      }else{
        first = incoming;
        start = incoming.coordinate.y-(shift-distance);
        end = existing.coordinate.y+(shift-distance); 
      } 
    }else{
      distance = Math.abs(existing.coordinate.x-incoming.coordinate.x)-1;
      if(existing.coordinate.x < incoming.coordinate.x){
        first = existing;
        start = existing.coordinate.x-(shift-distance);
        end = incoming.coordinate.x+(shift-distance); 
      }else{
        first = incoming;
        start = incoming.coordinate.x-(shift-distance);
        end = existing.coordinate.x+(shift-distance); 
      } 
    }

    for(let i = start; i <= end; ++i){
      try{
        if(orientation === shipOrientation.VERTICAL)
          moves.push(Missile(coordinate(first.coordinate.x, i)));
        else
          moves.push(Missile(coordinate(i, first.coordinate.y))); 
      }catch{
        continue;
      } 
    }

    moves.forEach(move=>{
      if(move.coordinate.x === existing.coordinate.x && move.coordinate.y === existing.coordinate.y)
        move.hit = true;
      else if(move.coordinate.x === incoming.coordinate.x && move.coordinate.y === incoming.coordinate.y)
        move.hit = true;
    });
    return moves;
  },

  randomCoordinate(){
    return coordinate(Math.floor(Math.random()*10),Math.floor(Math.random()*10));
  },

  randomShipType(){
    switch(Math.floor((Math.random()*4))){
      case 0:
        return shipType.DESTROYER;
      case 1:
        return shipType.CARRIER;
      case 2:
        return shipType.CRUISER;
      case 3:
        return shipType.BATTLESHIP;
    }
  },

  randomOrientation(){
    if(Math.floor(Math.random()*2))
      return shipOrientation.HORIZONTAL;
    return shipOrientation.VERTICAL;
  },
}
