import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { parseDfd, layoutNodes } from '../utils/dfd-parser';
import { DiagramError } from './DiagramError';

interface DfdRendererProps {
  code: string;
  id: string;
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
    return <DiagramError type="DFD" error={error} />;
  }

  return (
    <div className="my-2 flex justify-center overflow-x-auto">
      <svg ref={svgRef} className="w-full" style={{ maxHeight: '500px' }} />
    </div>
  );
}
