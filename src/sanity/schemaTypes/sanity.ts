export type SanityDocument = {
    _id: string;
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    _type: string;
  }
  export interface Post extends SanityDocument {
    _type: "post";
    title: string;
    heading: string;
    description: string;
    mainImage: {
      _type: "image";
      asset: {
        _ref: string;
        _type: "reference";
      };
    };
  }