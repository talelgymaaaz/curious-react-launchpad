import React from 'react';
import SubMenuSection from '../../navigation/SubMenuSection';

const MondeFioriSection = () => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <SubMenuSection
        title="Notre monde"
        items={[
          {
            href: "/monde-fiori/histoire",
            title: "Histoire",
            description: "Collections élégantes pour mariage"
          },
          {
            href: "/monde-fiori/collection",
            title: "collection",
            description: "Design festifs"
          },
          {
            href: "/monde-fiori/dna",
            title: "DNA",
            description: "Design festifs"
          }
        ]}
      />
    </div>
  );
};

export default MondeFioriSection;