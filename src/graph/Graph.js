export class Graph {
  constructor() {
    this.nodes = [];
    this.adjList = {};
  }

  addNode(node) {
    this.nodes.push(node);
    this.adjList[node] = [];
  }

  addEdge(node1, node2) {
    this.adjList[node1].push(node2);
    this.adjList[node2].push(node1);
  }

  removeNode(node) {
    this.nodes = this.nodes.filter(n => n !== node);
    delete this.adjList[node];
    for (const key in this.adjList) {
      this.adjList[key] = this.adjList[key].filter(n => n !== node);
    }
  }

  searchNode(node) {
    if (!this.nodes.length) return;
    return this.nodes.find(n => n === node);
  }

  printAdjacency(node) {
    if (this.searchNode(node)) {
      console.log(this.adjList[node]);
    }
  }

  printGraph() {
    console.log(this.adjList);
  }
}
