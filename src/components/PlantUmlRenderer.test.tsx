import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';

vi.mock('plantuml-encoder', () => ({
  default: {
    encode: vi.fn(),
  },
}));

import { PlantUmlRenderer } from './PlantUmlRenderer';
import plantumlEncoder from 'plantuml-encoder';

const mockedEncode = vi.mocked(plantumlEncoder.encode);

describe('PlantUmlRenderer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders an img tag with the encoded PlantUML URL', async () => {
    mockedEncode.mockReturnValue('SoWkIImgAStDuGh8ISmh2VNr');

    render(<PlantUmlRenderer code="@startuml A -> B @enduml" id="puml-1" />);

    await waitFor(() => {
      expect(mockedEncode).toHaveBeenCalledWith('@startuml A -> B @enduml');
    });

    const img = screen.getByAltText('PlantUML diagram');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://www.plantuml.com/plantuml/svg/SoWkIImgAStDuGh8ISmh2VNr');
  });

  it('shows error state when encode throws', async () => {
    mockedEncode.mockImplementation(() => {
      throw new Error('Encoding failed');
    });

    render(<PlantUmlRenderer code="bad plantuml" id="puml-err" />);

    await waitFor(() => {
      expect(screen.getByText('PlantUML Error')).toBeInTheDocument();
    });

    expect(screen.getByText('Error: Encoding failed')).toBeInTheDocument();
  });

  it('shows error when the img fails to load', async () => {
    mockedEncode.mockReturnValue('encoded-value');

    render(<PlantUmlRenderer code="@startuml foo @enduml" id="puml-img-err" />);

    const img = screen.getByAltText('PlantUML diagram');
    fireEvent.error(img);

    await waitFor(() => {
      expect(screen.getByText('PlantUML Error')).toBeInTheDocument();
    });
  });

  it('handles empty code gracefully', () => {
    render(<PlantUmlRenderer code="" id="puml-empty" />);

    expect(mockedEncode).not.toHaveBeenCalled();
    expect(screen.queryByText('PlantUML Error')).not.toBeInTheDocument();
    expect(screen.queryByAltText('PlantUML diagram')).not.toBeInTheDocument();
  });

  it('handles whitespace-only code gracefully', () => {
    render(<PlantUmlRenderer code="      " id="puml-ws" />);

    expect(mockedEncode).not.toHaveBeenCalled();
    expect(screen.queryByText('PlantUML Error')).not.toBeInTheDocument();
  });

  it('trims code before encoding', async () => {
    mockedEncode.mockReturnValue('trimmed');

    render(<PlantUmlRenderer code="  @startuml A->B @enduml  " id="puml-trim" />);

    await waitFor(() => {
      expect(mockedEncode).toHaveBeenCalledWith('@startuml A->B @enduml');
    });
  });

  it('shows loading text while image has not loaded', () => {
    mockedEncode.mockReturnValue('loading-test');
    render(<PlantUmlRenderer code="@startuml test @enduml" id="puml-loading" />);

    expect(screen.getByText('Rendering PlantUML...')).toBeInTheDocument();
    // Image should be hidden (display: none)
    const img = screen.getByAltText('PlantUML diagram');
    expect(img).toHaveStyle({ display: 'none' });
  });

  it('hides loading text after image loads', async () => {
    mockedEncode.mockReturnValue('load-complete');
    render(<PlantUmlRenderer code="@startuml done @enduml" id="puml-loaded" />);

    const img = screen.getByAltText('PlantUML diagram');
    fireEvent.load(img);

    await waitFor(() => {
      expect(screen.queryByText('Rendering PlantUML...')).not.toBeInTheDocument();
      expect(img).toHaveStyle({ display: 'block' });
    });
  });
});
