/**
 * The module `animate_graph` provides functions for building and animating graphs.
 * @module animate_graph
 */
import { Animator, Edge, Graph, Node } from '@veehz/animate-graph';
import context from 'js-slang/context';

const animators: Animator[] = [];
context.moduleContexts['animate_graph'].state = { animators };

/**
 * Creates a new Animator for managing graph animation frames.
 * @returns A new Animator instance.
 * @example
 * ```
 * const anim = make_animator();
 * ```
 */
export function make_animator(): Animator {
  const animator = new Animator();
  animators.push(animator);
  return animator;
}

/**
 * Creates a new Graph.
 * @returns A new Graph instance.
 * @example
 * ```
 * const g = make_graph();
 * ```
 */
export function make_graph(): Graph {
  return new Graph('#animate-graph-dummy');
}

/**
 * Creates a new Node.
 * @param id Unique identifier for the node.
 * @param name Display name shown inside the node circle.
 * @param label Label shown above the node.
 * @returns A new Node instance.
 * @example
 * ```
 * const n = make_node('a', 'A', 'root');
 * ```
 */
export function make_node(id: string, name?: string, label?: string): Node {
  return new Node(id, name, label);
}

/**
 * Inserts a node into a graph.
 * @param graph The graph to insert into.
 * @param node The node to insert.
 */
export function insert_node(graph: Graph, node: Node): void {
  graph.insertNode(node);
}

/**
 * Inserts a node after another node, auto-positioning it and creating an edge.
 * @param graph The graph to insert into.
 * @param node The node to insert.
 * @param after The node or node ID to insert after.
 */
export function insert_node_after(graph: Graph, node: Node, after: Node | string): void {
  graph.insertNodeAfter(node, after);
}

/**
 * Inserts an edge between two nodes.
 * @param graph The graph to add the edge to.
 * @param source The source node or node ID.
 * @param target The target node or node ID.
 */
export function insert_edge(graph: Graph, source: Node | string, target: Node | string): void {
  graph.insertEdge(source, target);
}

/**
 * Colors a node or edge. Use colorInt 0 to remove color.
 * @param graph The graph containing the object.
 * @param object The node, edge, or ID to color.
 * @param colorInt Color index (1–5 for colors, 0 to remove).
 */
export function color(graph: Graph, object: Edge | Node | string, colorInt?: number): void {
  graph.color(object, colorInt);
}

/**
 * Captures a snapshot of the current graph state into the animator.
 * @param animator The animator to add the frame to.
 * @param graph The graph to snapshot.
 */
export function snap(animator: Animator, graph: Graph): void {
  animator.snap(graph);
}
