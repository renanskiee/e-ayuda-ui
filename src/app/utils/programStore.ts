// Program management store

export interface ProgramRequirement {
  id: string;
  name: string;
  description: string;
  isMandatory: boolean;
  placeholderFile?: {
    name: string;
    type: string;
    url: string;
    uploadedAt: string;
  };
}

export interface Program {
  id: string;
  programName: string;
  programDescription: string;
  targetSector: string;
  assistanceType: string;
  requirements: ProgramRequirement[];
  maxAmount: number;
  budgetAllocation: number;
  startDate: string;
  endDate: string;
  eligibilityCriteria: string;
  status: 'Active' | 'Inactive' | 'Draft';
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// Initial sample programs
const initialPrograms: Program[] = [
  {
    id: 'PROG-001',
    programName: 'Senior Citizen Medical Assistance',
    programDescription: 'Financial assistance for medical expenses of senior citizens',
    targetSector: 'Senior Citizen',
    assistanceType: 'Medical Assistance',
    requirements: [
      {
        id: 'REQ-001',
        name: 'Valid ID',
        description: 'Government-issued ID showing age 60 and above',
        isMandatory: true
      },
      {
        id: 'REQ-002',
        name: 'Medical Certificate',
        description: 'Medical certificate from licensed physician',
        isMandatory: true
      },
      {
        id: 'REQ-003',
        name: 'Barangay Certificate',
        description: 'Certificate of residency from barangay',
        isMandatory: true
      }
    ],
    maxAmount: 5000,
    budgetAllocation: 500000,
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    eligibilityCriteria: 'Must be 60 years old and above, resident of the municipality',
    status: 'Active',
    createdBy: 'head-001',
    createdAt: '2026-01-15',
    updatedAt: '2026-01-15'
  }
];

class ProgramStore {
  private programs: Program[] = [];
  private listeners: Array<() => void> = [];

  constructor() {
    const stored = localStorage.getItem('programs');
    if (stored) {
      this.programs = JSON.parse(stored);
    } else {
      this.programs = [...initialPrograms];
      this.save();
    }
  }

  private save() {
    localStorage.setItem('programs', JSON.stringify(this.programs));
    this.notifyListeners();
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener());
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  getAll(): Program[] {
    return [...this.programs];
  }

  getById(id: string): Program | undefined {
    return this.programs.find(p => p.id === id);
  }

  getBySector(sector: string): Program[] {
    return this.programs.filter(p => p.targetSector === sector);
  }

  getActive(): Program[] {
    return this.programs.filter(p => p.status === 'Active');
  }

  create(program: Omit<Program, 'id' | 'createdAt' | 'updatedAt'>): Program {
    const newProgram: Program = {
      ...program,
      id: `PROG-${String(this.programs.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    this.programs.push(newProgram);
    this.save();
    return newProgram;
  }

  update(id: string, updates: Partial<Program>): boolean {
    const index = this.programs.findIndex(p => p.id === id);
    if (index !== -1) {
      this.programs[index] = {
        ...this.programs[index],
        ...updates,
        updatedAt: new Date().toISOString().split('T')[0]
      };
      this.save();
      return true;
    }
    return false;
  }

  delete(id: string): boolean {
    const index = this.programs.findIndex(p => p.id === id);
    if (index !== -1) {
      this.programs.splice(index, 1);
      this.save();
      return true;
    }
    return false;
  }

  getStats() {
    return {
      total: this.programs.length,
      active: this.programs.filter(p => p.status === 'Active').length,
      inactive: this.programs.filter(p => p.status === 'Inactive').length,
      draft: this.programs.filter(p => p.status === 'Draft').length
    };
  }
}

export const programStore = new ProgramStore();
