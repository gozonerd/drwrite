import { describe, it, expect } from 'vitest';
import { getDiagramBadgeClass, DiagramCodeBlock } from './DiagramCodeBlock';

describe('getDiagramBadgeClass', () => {
  it('returns correct class for mermaid', () => {
    expect(getDiagramBadgeClass('mermaid')).toBe('bg-[rgba(78,201,176,0.80)] text-[#0d1117]');
  });

  it('returns correct class for bpmn', () => {
    expect(getDiagramBadgeClass('bpmn')).toBe('bg-[rgba(88,166,255,0.80)] text-[#0d1117]');
  });

  it('returns correct class for dfd', () => {
    expect(getDiagramBadgeClass('dfd')).toBe('bg-[rgba(63,185,80,0.80)] text-[#0d1117]');
  });

  it('returns correct class for plantuml', () => {
    expect(getDiagramBadgeClass('plantuml')).toBe('bg-[rgba(210,153,34,0.80)] text-[#0d1117]');
  });

  it('returns correct class for graphviz', () => {
    expect(getDiagramBadgeClass('graphviz')).toBe('bg-[rgba(109,179,214,0.80)] text-[#0d1117]');
  });

  it('returns correct class for interactive', () => {
    expect(getDiagramBadgeClass('interactive')).toBe('bg-[rgba(167,139,219,0.80)] text-[#0d1117]');
  });

  it('returns default class for unknown language', () => {
    expect(getDiagramBadgeClass('python')).toBe('bg-[rgba(78,201,176,0.80)] text-[#0d1117]');
  });
});

describe('DiagramCodeBlock extension', () => {
  it('is a TipTap extension object', () => {
    expect(DiagramCodeBlock).toBeDefined();
    expect(DiagramCodeBlock.name).toBe('codeBlock');
  });
});
