import type { Animator, Graph } from '@veehz/animate-graph';
import React from 'react';
import type { DebuggerContext } from '@sourceacademy/modules-lib/types/index';

const ANIMATE_GRAPH_CSS = `:root{--ag-node-radius: 30px;--ag-node-gap: 15px;--ag-level-width: 120px;--ag-arrow-length: 10px;--ag-arrow-offset: 2px}.g_node{cursor:pointer}.g_node circle{fill:#e0e0e0;stroke:#000;stroke-width:3px}.g_node text{font-family:sans-serif;font-size:16px;font-weight:400;pointer-events:none;alignment-baseline:middle;fill:#000;stroke:none}.g_node text.node-name{text-anchor:middle}.g_node text.node-label{text-anchor:middle}.g_edge_hitarea{stroke:transparent;stroke-width:10px;fill:none;cursor:pointer}.g_edge{color:#999;stroke:currentColor;stroke-opacity:.6;stroke-width:1.5px}.g_edge_label{font-family:sans-serif;font-size:14px;font-weight:400;pointer-events:none;alignment-baseline:middle;text-anchor:middle;fill:#000;stroke:#fff;stroke-width:3px;paint-order:stroke}.g_node.color-1 circle{stroke:#e65100;fill:#ff9800}.g_edge.color-1{color:#ff9800;stroke-opacity:1;stroke-width:3px}.g_node.color-2 circle{stroke:#388e3c;fill:#4caf50}.g_edge.color-2{color:#4caf50;stroke-opacity:1;stroke-width:3px}.g_node.color-3 circle{stroke:#1976d2;fill:#2196f3}.g_edge.color-3{color:#2196f3;stroke-opacity:1;stroke-width:3px}.g_node.color-4 circle{stroke:#d32f2f;fill:#f44336}.g_edge.color-4{color:#f44336;stroke-opacity:1;stroke-width:3px}.g_node.color-5 circle{stroke:#7b1fa2;fill:#9c27b0}.g_edge.color-5{stroke:#9c27b0;stroke-opacity:1;stroke-width:3px}`;

function injectCSS() {
  if (document.getElementById('animate-graph-styles')) return;
  const style = document.createElement('style');
  style.id = 'animate-graph-styles';
  style.textContent = ANIMATE_GRAPH_CSS;
  document.head.appendChild(style);
}

type AnimatorDisplayProps = {
  animator: Animator;
  index: number;
};

type AnimatorDisplayState = {
  currentStep: number;
  totalSteps: number;
};

class AnimatorDisplay extends React.Component<AnimatorDisplayProps, AnimatorDisplayState> {
  private divId: string;
  private unsubscribe: (() => void) | null = null;
  private activeGraph: Graph | null = null;

  constructor(props: AnimatorDisplayProps) {
    super(props);
    this.divId = `animate-graph-display-${props.index}`;
    this.state = {
      currentStep: props.animator.currentStep,
      totalSteps: props.animator.length
    };
  }

  componentDidMount() {
    const { animator } = this.props;
    this.unsubscribe = animator.subscribe((step, total) => {
      this.setState({ currentStep: step, totalSteps: total });
      this.renderFrame();
    });
    if (animator.length > 0) {
      this.renderFrame();
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
    if (this.activeGraph) this.activeGraph.deactivate();
  }

  renderFrame() {
    const { animator } = this.props;
    if (!animator.currentFrame) return;

    const displayGraph = animator.currentFrame.clone(true);
    displayGraph.selector = `#${this.divId}`;
    if (this.activeGraph) this.activeGraph.deactivate();
    displayGraph.activate();
    this.activeGraph = displayGraph;
  }

  render() {
    const { currentStep, totalSteps } = this.state;
    const { animator } = this.props;

    return (
      <div style={{ marginBottom: '20px' }}>
        <div id={this.divId} style={{ width: '100%', minHeight: '200px' }} />
        {totalSteps === 0
          ? <p style={{ color: '#aaa' }}>No frames captured.</p>
          : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
              <button
                onClick={() => animator.prev()}
                disabled={currentStep === 0}
              >
                Prev
              </button>
              <span>Step {currentStep + 1} / {totalSteps}</span>
              <button
                onClick={() => animator.next()}
                disabled={currentStep >= totalSteps - 1}
              >
                Next
              </button>
            </div>
          )
        }
      </div>
    );
  }
}

type Props = {
  debuggerContext: any;
};

class AnimateGraphTab extends React.Component<Props> {
  componentDidMount() {
    injectCSS();
  }

  render() {
    const { animators } = this.props.debuggerContext.context.moduleContexts['animate_graph'].state as { animators: Animator[] };
    return (
      <div>
        {animators.map((animator, i) => (
          <AnimatorDisplay key={i} animator={animator} index={i} />
        ))}
      </div>
    );
  }
}

export default {
  toSpawn(context: DebuggerContext) {
    const state = context.context?.moduleContexts?.['animate_graph']?.state;
    return (state?.animators?.length ?? 0) > 0;
  },
  body: (debuggerContext: any) => <AnimateGraphTab debuggerContext={debuggerContext} />,
  label: 'Animate Graph',
  iconName: 'graph'
};
