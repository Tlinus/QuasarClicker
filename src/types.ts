// src/types.ts

export interface Resource {
    name: string;
    type: string;
    max: number;
    total: number;
    unlocked: boolean;
  }
  
  export interface ResourceType {
    name: string;
    icon: string;
    total: number | (() => number);
  }
  
  export interface Activity {
    name: string;
    multiplierClick: number;
    multiplierPerson: number;
    nbPersonsAssigned: number;
    progressActivity: number;
    resourcesProduced: ResourceToProduced[];
  }
  
  export interface Building {
    name: string;
    count: number;
    cost: { [key: string]: number };
  }
  
  export interface ResourceToProduced {
    name: string;
    produced: number;
  }
  
  export interface ResourcesType {
    [key: string]: ResourceType;
  }
  
  export interface Resources {
    [key: string]: Resource;
  }
  
  export interface Activities {
    [key: string]: Activity;
  }
  
  export interface Buildings {
    [key: string]: Building;
  }
  
  export const resources: Resources = {
    'mushroom': {
      name: 'mushroom',
      type: 'Food',
      total: 0,
      max: 100,
      unlocked: true,
    },
    'berries': {
      name: 'berries',
      type: 'Food',
      total: 5,
      max: 100,
      unlocked: true,
    },
    'fruits': {
      name: 'fruits',
      type: 'Food',
      total: 5,
      max: 100,
      unlocked: true,
    },
    'fish': {
      name: 'fish',
      type: 'Food',
      total: 0,
      max: 100,
      unlocked: false,
    },
    'meat': {
      name: 'meat',
      type: 'Food',
      total: 0,
      max: 100,
      unlocked: true,
    },
    'sticks': {
      name: 'sticks',
      type: 'Wood',
      total: 0,
      max: 100,
      unlocked: true,
    },
    'wood plank': {
      name: 'wood plank',
      type: 'Wood',
      total: 0,
      max: 100,
      unlocked: false,
    },
    'logs': {
      name: 'logs',
      type: 'Wood',
      total: 0,
      max: 100,
      unlocked: false,
    },
    'pebble ': {
      name: 'pebble ',
      type: 'Stone',
      total: 0,
      max: 100,
      unlocked: true,
    },
    'leather': {
      name: 'leather',
      type: 'Utils',
      total: 5,
      max: 100,
      unlocked: true,
    },
    'bones': {
      name: 'bones',
      type: 'Utils',
      total: 0,
      max: 100,
      unlocked: true,
    },
  };
  
  export const activities: Activities = {
    'Idle': {
      name: 'Idle',
      multiplierClick: 1,
      multiplierPerson: 1,
      nbPersonsAssigned: 5,
      progressActivity: 0,
      resourcesProduced: [
        {
          name: 'meat',
          produced: 5,
        },
      ],
    },
    'hunting': {
      name: 'Hunting',
      multiplierClick: 1,
      multiplierPerson: 1,
      nbPersonsAssigned: 0,
      progressActivity: 0,
      resourcesProduced: [
        {
          name: 'meat',
          produced: 5,
        },
        {
          name: 'leather',
          produced: 2,
        },
      ],
    },
    'gathering': {
      name: 'Gathering',
      multiplierClick: 1,
      multiplierPerson: 1,
      nbPersonsAssigned: 0,
      progressActivity: 0,
      resourcesProduced: [
        {
          name: 'fruits',
          produced: 3,
        },
        {
          name: 'mushroom',
          produced: 3,
        },
        {
          name: 'berries',
          produced: 5,
        },
      ],
    },
  };
  
  export const buildings: Buildings = {
    'crafting table': {
      name: 'crafting table',
      count: 0,
      cost: {
        'Wood': 100,
        'Stone': 0,
        'Food': 0,
      },
    },
    'Lumberjack': {
      name: 'Lumberjack',
      count: 0,
      cost: {
        'Wood': 100,
        'Stone': 0,
        'Food': 0,
      },
    },
    'Farm': {
      name: 'Farm',
      count: 0,
      cost: {
        'Wood': 100,
      },
    },
    'Wooden Home': {
      name: 'Wooden Home',
      count: 0,
      cost: {
        'Wood': 100,
      },
    },
    'Stone Home': {
      name: 'Stone Home',
      count: 0,
      cost: {
        'Wood': 50,
        'Stone': 100,
      },
    },
    'tent': {
      name: 'tent',
      count: 0,
      cost: {
        'Wood': 10,
        'leather': 20,
      },
    },
    'crafting tent': {
      name: 'crafting tent',
      count: 0,
      cost: {
        'Wood': 20,
        'leather': 30,
      },
    },
  };

  