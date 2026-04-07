import { describe, it, expect } from 'vitest';
import { parseDfd, layoutNodes } from './dfd-parser';

describe('parseDfd', () => {
  it('parses process nodes', () => {
    const { nodes } = parseDfd('process P1 "Order Processing"');
    expect(nodes).toHaveLength(1);
    expect(nodes[0]).toEqual({ id: 'P1', label: 'Order Processing', type: 'process' });
  });

  it('parses datastore nodes', () => {
    const { nodes } = parseDfd('datastore D1 "Customer DB"');
    expect(nodes).toHaveLength(1);
    expect(nodes[0]).toEqual({ id: 'D1', label: 'Customer DB', type: 'datastore' });
  });

  it('parses external nodes', () => {
    const { nodes } = parseDfd('external E1 "Customer"');
    expect(nodes).toHaveLength(1);
    expect(nodes[0]).toEqual({ id: 'E1', label: 'Customer', type: 'external' });
  });

  it('parses flow connections', () => {
    const { flows } = parseDfd('flow E1 -> P1 "Places Order"');
    expect(flows).toHaveLength(1);
    expect(flows[0]).toEqual({ from: 'E1', to: 'P1', label: 'Places Order' });
  });

  it('handles flow with no spaces around arrow', () => {
    const { flows } = parseDfd('flow A->B "Data"');
    expect(flows).toHaveLength(1);
    expect(flows[0]).toEqual({ from: 'A', to: 'B', label: 'Data' });
  });

  it('is case-insensitive for keywords', () => {
    const { nodes, flows } = parseDfd(`
      PROCESS P1 "Test"
      DataStore D1 "DB"
      EXTERNAL E1 "User"
      Flow E1 -> P1 "Input"
    `);
    expect(nodes).toHaveLength(3);
    expect(flows).toHaveLength(1);
  });

  it('skips comments and blank lines', () => {
    const { nodes } = parseDfd(`
      # This is a comment
      // Another comment

      process P1 "Test"
    `);
    expect(nodes).toHaveLength(1);
  });

  it('parses a complete DFD', () => {
    const code = `
      external E1 "User"
      process P1 "File Manager"
      process P2 "Parser"
      datastore D1 "File System"

      flow E1 -> P1 "Open/Save"
      flow P1 -> D1 "Read/Write"
      flow P1 -> P2 "Raw Data"
    `;
    const { nodes, flows } = parseDfd(code);
    expect(nodes).toHaveLength(4);
    expect(flows).toHaveLength(3);
    expect(nodes.filter((n) => n.type === 'process')).toHaveLength(2);
    expect(nodes.filter((n) => n.type === 'external')).toHaveLength(1);
    expect(nodes.filter((n) => n.type === 'datastore')).toHaveLength(1);
  });

  it('returns empty arrays for invalid input', () => {
    const { nodes, flows } = parseDfd('this is not valid dfd');
    expect(nodes).toHaveLength(0);
    expect(flows).toHaveLength(0);
  });
});

describe('layoutNodes', () => {
  it('positions externals in left column, processes center, datastores right', () => {
    const nodes = [
      { id: 'E1', label: 'User', type: 'external' as const },
      { id: 'P1', label: 'Process', type: 'process' as const },
      { id: 'D1', label: 'DB', type: 'datastore' as const },
    ];

    layoutNodes(nodes, 900, 300);

    const ext = nodes.find((n) => n.id === 'E1')!;
    const proc = nodes.find((n) => n.id === 'P1')!;
    const ds = nodes.find((n) => n.id === 'D1')!;

    // External should be leftmost, process center, datastore rightmost
    expect(ext.x!).toBeLessThan(proc.x!);
    expect(proc.x!).toBeLessThan(ds.x!);
  });

  it('distributes multiple nodes vertically within columns', () => {
    const nodes = [
      { id: 'P1', label: 'A', type: 'process' as const },
      { id: 'P2', label: 'B', type: 'process' as const },
      { id: 'P3', label: 'C', type: 'process' as const },
    ];

    layoutNodes(nodes, 600, 400);

    // All in same column (center), different y positions
    expect(nodes[0].x).toBe(nodes[1].x);
    expect(nodes[1].x).toBe(nodes[2].x);
    expect(nodes[0].y!).toBeLessThan(nodes[1].y!);
    expect(nodes[1].y!).toBeLessThan(nodes[2].y!);
  });
});
