export interface DfdNode {
  id: string;
  label: string;
  type: 'process' | 'datastore' | 'external';
  x?: number;
  y?: number;
}

export interface DfdFlow {
  from: string;
  to: string;
  label: string;
}

/**
 * Parse a simple DFD DSL:
 *   process P1 "Order Processing"
 *   datastore D1 "Customer DB"
 *   external E1 "Customer"
 *   flow E1 -> P1 "Places Order"
 *   flow P1 -> D1 "Store Record"
 */
export function parseDfd(code: string): { nodes: DfdNode[]; flows: DfdFlow[] } {
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

export function layoutNodes(nodes: DfdNode[], width: number, height: number): DfdNode[] {
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
