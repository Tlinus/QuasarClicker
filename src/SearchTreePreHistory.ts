interface PrehistoricEvent {
    name: string;
    date: string;
    description: string;
  }
  
  interface PrehistoricTreeNode {
    id: string;
    name: string;
    events: PrehistoricEvent[];
    children: PrehistoricTreeNode[];
  }
  
  const prehistoricTree: PrehistoricTreeNode = {
    id: 'root',
    name: 'Prehistoric Era',
    events: [],
    children: [
      {
        id: 'stone-age',
        name: 'Stone Age',
        events: [
          {
            name: 'Invention of tools',
            date: '2.6 million years ago',
            description: 'Early humans invent simple tools made of stone and bone.',
          },
          {
            name: 'Discovery of fire',
            date: '1.7 million years ago',
            description: 'Early humans discover how to control and use fire.',
          },
          {
            name: 'Origin of Homo sapiens',
            date: '300,000 years ago',
            description: 'The earliest anatomically modern humans, Homo sapiens, appear in Africa.',
          },
          {
            name: 'Development of language',
            date: '100,000 years ago',
            description: 'Early humans develop the capacity for language and communication.',
          },
          {
            name: 'Megalithic structures',
            date: '10,000 BCE',
            description: 'Humans begin constructing large stone structures like Stonehenge.',
          },
          {
            name: 'Domestication of dogs',
            date: '20,000 BCE',
            description: 'Early humans domesticate dogs, forming one of the earliest known animal domestications.',
          },
        ],
        children: [
          {
            id: 'paleolithic-age',
            name: 'Paleolithic Age',
            events: [
              {
                name: 'Hunting and gathering',
                date: '2.6 million years ago - 10,000 BCE',
                description: 'Humans rely on hunting animals and gathering wild plants for survival.',
              },
              {
                name: 'Cave paintings',
                date: '40,000 BCE - 10,000 BCE',
                description: 'Early humans create elaborate paintings on cave walls.',
              },
              {
                name: 'First evidence of burial practices',
                date: '100,000 years ago',
                description: 'Early humans begin burying their dead, indicating a belief in an afterlife.',
              },
              {
                name: 'Invention of the spear',
                date: '500,000 years ago',
                description: 'Early humans invent the spear, a significant advancement in hunting technology.',
              },
            ],
            children: [],
          },
          {
            id: 'mesolithic-age',
            name: 'Mesolithic Age',
            events: [
              {
                name: 'Transition to agriculture',
                date: '10,000 BCE - 8,000 BCE',
                description: 'Humans begin to transition from hunting and gathering to agriculture.',
              },
              {
                name: 'Development of pottery',
                date: '8,000 BCE',
                description: 'Humans start making pottery for storage and cooking purposes.',
              },
              {
                name: 'Domestication of livestock',
                date: '9,000 BCE',
                description: 'Early humans begin domesticating animals like goats and sheep.',
              },
              {
                name: 'First evidence of fishing',
                date: '7,000 BCE',
                description: 'Early humans begin to rely on fishing as a food source.',
              },
            ],
            children: [],
          },
          {
            id: 'neolithic-age',
            name: 'Neolithic Age',
            events: [
              {
                name: 'Development of agriculture',
                date: '8,000 BCE - 2,000 BCE',
                description: 'Humans develop agriculture and start domesticating plants and animals.',
              },
              {
                name: 'Construction of permanent settlements',
                date: '6,000 BCE',
                description: 'Early humans build permanent settlements and transition to a more sedentary lifestyle.',
              },
              {
                name: 'Invention of the wheel',
                date: '4,000 BCE',
                description: 'Humans invent the wheel, a revolutionary development in transportation.',
              },
              {
                name: 'Emergence of complex societies',
                date: '3,000 BCE',
                description: 'Early humans form complex societies with social hierarchies and organized governance.',
              },
            ],
            children: [],
          },
        ],
      },
      // Other eras or ages can be added here
      {
        id: 'bronze-age',
        name: 'Bronze Age',
        events: [
          // Bronze Age events
        ],
        children: [],
      },
      {
        id: 'iron-age',
        name: 'Iron Age',
        events: [
          // Iron Age events
        ],
        children: [],
      },
    ],
  };