export type PackSpaceConfig = {
  [key: string]: {
    mainSpace?: string;
    secondarySpace?: string;
    tertiarySpace?: string;
  };
};

export const packSpaceLabels: PackSpaceConfig = {
  'Pack Prestige': {
    mainSpace: 'CHEMISE',
    secondarySpace: 'ACCESSOIRE',
    tertiarySpace: 'ACCESSOIRE'
  },
  'Pack Premium': {
    mainSpace: 'CRAVATTE',
    secondarySpace: 'PORTEFEUILLE',
    tertiarySpace: 'ACCESSOIRE'
  },
  'Pack Trio': {
    mainSpace: 'CEINTURE',
    secondarySpace: 'PORTEFEUILLE',
    tertiarySpace: 'PORTE-CLÉS'
  },
  'Pack Duo': {
    mainSpace: 'PORTEFEUILLE',
    secondarySpace: 'CEINTURE'
  },
  'Pack Mini Duo': {
    mainSpace: 'PORTE-CARTES',
    secondarySpace: 'PORTE-CLÉS'
  },
  'Pack Chemise': {
    mainSpace: 'CHEMISE'
  },
  'Pack Ceinture': {
    mainSpace: 'CEINTURE'
  },
  'Pack Cravatte': {
    mainSpace: 'ACCESSOIRE'
  },
  'Pack Malette': {
    mainSpace: 'MALETTE'
  },
  'Pack Portefeuille': {
    mainSpace: 'PORTEFEUILLE'
  },
  'Pack Porte-carte': {
    mainSpace: 'PORTE-CARTE'
  },
  'Pack Porte-clé': {
    mainSpace: 'PORTE-CLÉ'
  }
};