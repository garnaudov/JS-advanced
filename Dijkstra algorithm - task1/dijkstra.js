const fs = require("fs");

class PriorityQueue {
  constructor() {
    this.items = []
  }

  enqueue(element){
    if (this.isEmpty()){ 
      this.items.push(element);
    } else {
      let added = false;
      for (let i = 1; i <= this.items.length; i++){
        if (element[1] < this.items[i-1][1]){ 
          this.items.splice(i-1, 0, element);
          added = true;
          break;
        }
      }
      if (!added){
          this.items.push(element);
      }
    }
  }

  dequeue() {
    let value = this.items.shift();
    return value;
  }

  isEmpty() {
    return (this.items.length === 0) 
  }
}

class Node {
  constructor() {
    this.paths = {}
  }
}

class Graph {
  constructor() {
    this.nodes = {}
  }

  addNode(name) {
    if (!this.nodes[name]) {
      this.nodes[name] = new Node();
    }
  }

  addPath(from, to, distance) {
    const fromNode = this.nodes[from];
    fromNode.paths[to] = distance;
    const toNode = this.nodes[to];
    toNode.paths[from] = distance;
  }

  //Dijkstra's algorithm
  getShortestPath(from, to) {
    const distances = {};
    const previous = {};
    const queue = new PriorityQueue();


    // Set distances to all nodes to be infinite except "from" node
    distances[from] = 0;

    Object.keys(this.nodes).forEach(node => {
      if (node !== from) {
        distances[node] = Infinity;
      }
    });

    queue.enqueue([from, 0]);

    while (!queue.isEmpty()) {
      let shortestStep = queue.dequeue();
      let currentNode = this.nodes[shortestStep[0]];

      // check node paths
      Object.keys(currentNode.paths).forEach(path => {
        let time = distances[shortestStep[0]] + currentNode.paths[path];

        if (time < distances[path]) {
          distances[path] = time;
          previous[path] = shortestStep[0];
          queue.enqueue([path, time]);
        }
      })
   }

   let path = [to];
   let lastStep = to;
   while(lastStep !== from) {
     path.unshift(previous[lastStep])
     lastStep = previous[lastStep]
   }

   return `Shortest path from ${from} to ${to} is ${path} and distance is ${distances[to]}`
  }
}

const inputData = fs.readFileSync("./input.txt", "utf8");
const lines = inputData.split("\n");
const graph = new Graph();

lines.map(line => {
  const [from, to, distance] = line.split(" ");
  graph.addNode(from);
  graph.addNode(to);
  graph.addPath(from, to, parseInt(distance));
});

console.dir(graph, { depth: null, colors: true });

console.log(graph.getShortestPath("A", "E"))