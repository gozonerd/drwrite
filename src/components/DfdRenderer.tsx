import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface DfdNode {
  id: string;
  label: string;
  type: 'process' | 'datastore' | 'external';
  x?: number;
  y?: number;
}

interface DfdFlow {
  from: string;
  to: string;
  label: string;
}

interface DfdRendererProps {
  code: string;
  id: string;
}

/**
 * Parse a simple DFD DSL:
 *   process P1 "Order Processing"
 *   datastore D1 "Customer DB"
 *   external E1 "Customer"
 *   flow E1 -> P1 "Places Order"
 *   flow P1 -> D1 "Store Record"
 */
function parseDfd(code: string): { nodes: DfdNode[]; flows: DfdFlow[] } {
  const nodes: DfdNode[] = [];
  const flows: DfdFlow[] = [];

  for (const line of code.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('//')) continue;

    const processMatch = trimmed.match(/^process\s+(\S+)\s+"([^"]+)"/i);
    if (processMatch) {
      nodes.push({ id: processMatch[1], label: processMatch[2], type: 'process' });
      continue;
    }

    const datastoreMatch = trimmed.match(/^datastore\s+(\S+)\s+"([^"]+)"/i);
    if (datastoreMatch) {
      nodes.push({ id: datastoreMatch[1], label: datastoreMatch[2], type: 'datastore' });
      continue;
    }

    const externalMatch = trimmed.match(/^external\s+(\S+)\s+"([^"]+)"/i);
    if (externalMatch) {
      nodes.push({ id: externalMatch[1], label: externalMatch[2], type: 'external' });
      continue;
    }

    const flowMatch = trimmed.match(/^flow\s+(\S+)\s*->\s*(\S+)\s+"([^"]+)"/i);
    if (flowMatch) {
      flows.push({ from: flowMatch[1], to: flowMatch[2], label: flowMatch[3] });
      continue;
    }
  }

  return { nodes, flows };
}

function layoutNodes(nodes: DfdNode[], width: number, height: number): DfdNode[] {
  // Simple grid layout by type: externals left, processes center, datastores right
  const externals = nodes.filter((n) => n.type === 'external');
  const processes = nodes.filter((n) => n.type === 'process');
  const datastores = nodes.filter((n) => n.type === 'datastore');

  const colWidth = width / 3;

  function positionColumn(items: DfdNode[], colIndex: number) {
    const colCenter = colWidth * colIndex + colWidth / 2;
    const spacing = height / (items.length + 1);
    items.forEach((node, i) => {
      node.x = colCenter;
      node.y = spacing * (i + 1);
    });
  }

  positionColumn(externals, 0);
  positionColumn(processes, 1);
  positionColumn(datastores, 2);

  return nodes;
}

export function DfdRenderer({ code, id }: DfdRendererProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!svgRef.current || !code.trim()) return;

    try {
      const { nodes, flows } = parseDfd(code);
      if (nodes.length === 0) {
        setError('No DFD nodes found. Use: process P1 "Label", datastore D1 "Label", external E1 "Label", flow P1 -> D1 "Label"');
        return;
      }

      const width = 700;
      const height = Math.max(350, nodes.length * 80);

      layoutNodes(nodes, width, height);

      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove();
      svg.attr('viewBox', `0 0 ${width} ${height}`);

      // Arrow marker
      svg.append('defs').append('marker')
        .attr('id', `arrow-${id}`)
        .attr('viewBox', '0 0 10 10')
        .attr('refX', 10)
        .attr('refY', 5)
        .attr('markerWidth', 8)
        .attr('markerHeight', 8)
        .attr('orient', 'auto-start-reverse')
        .append('path')
        .attr('d', 'M 0 0 L 10 5 L 0 10 z')
        .attr('fill', '#94a3b8');

      // Draw flows (arrows)
      const nodeMap = new Map(nodes.map((n) => [n.id, n]));
      for (const flow of flows) {
        const from = nodeMap.get(flow.from);
        const to = nodeMap.get(flow.to);
        if (!from || !to || from.x == null || from.y == null || to.x == null || to.y == null) continue;

        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const offset = 50;
        const nx = dx / dist;
        const ny = dy / dist;

        const x1 = from.x + nx * offset;
        const y1 = from.y + ny * offset;
        const x2 = to.x - nx * offset;
        const y2 = to.y - ny * offset;

        svg.append('line')
          .attr('x1', x1).attr('y1', y1)
          .attr('x2', x2).attr('y2', y2)
          .attr('stroke', '#94a3b8')
          .attr('stroke-width', 1.5)
          .attr('marker-end', `url(#arrow-${id})`);

        // Flow label
        svg.append('text')
          .attr('x', (x1 + x2) / 2)
          .attr('y', (y1 + y2) / 2 - 8)
          .attr('text-anchor', 'middle')
          .attr('fill', '#cbd5e1')
          .attr('font-size', '11px')
          .text(flow.label);
      }

      // Draw nodes
      for (const node of nodes) {
        if (node.x == null || node.y == null) continue;

        const g = svg.append('g');

        if (node.type === 'process') {
          // Circle
          g.append('circle')
            .attr('cx', node.x)
            .attr('cy', node.y)
            .attr('r', 40)
            .attr('fill', '#1e3a5f')
            .attr('stroke', '#3b82f6')
            .attr('stroke-width', 2);
        } else if (node.type === 'datastore') {
          // Open rectangle (two horizontal lines)
          g.append('rect')
            .attr('x', node.x - 55)
            .attr('y', node.y - 20)
            .attr('width', 110)
            .attr('height', 40)
            .attr('fill', '#1a2e1a')
            .attr('stroke', '#22c55e')
            .attr('stroke-width', 2);
        } else if (node.type === 'external') {
          // Rectangle
          g.append('rect')
            .attr('x', node.x - 55)
            .attr('y', node.y - 25)
            .attr('width', 110)
            .attr('height', 50)
            .attr('fill', '#2d1f3d')
            .attr('stroke', '#a855f7')
            .attr('stroke-width', 2);
        }

        // Label
        g.append('text')
          .attr('x', node.x)
          .attr('y', node.y + 4)
          .attr('text-anchor', 'middle')
          .attr('fill', '#e2e8f0')
          .attr('font-size', '12px')
          .attr('font-weight', '500')
          .text(node.label);
      }

      setError(null);
    } catch (err) {
      setError(String(err));
    }
  }, [code, id]);

  if (error) {
    return (
      <div className="border border-red-300 dark:border-red-700 rounded p-3 my-2 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 text-sm font-mono">
        <div className="font-semibold mb-1">DFD Error</div>
        <pre className="whitespace-pre-wrap text-xs">{error}</pre>
      </div>
    );
  }

  return (
    <div className="my-2 flex justify-center overflow-x-auto">
      <svg ref={svgRef} className="w-full" style={{ maxHeight: '500px' }} />
    </div>
  );
}
