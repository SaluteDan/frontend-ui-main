export type ArtworkData = {
  collection: string | undefined;
  artist: string | undefined;
  address: string | undefined;
  description: string | undefined;
  opendate: string | undefined;
  royalty: number | null;
  mint: {
    limit?: number | null;
    cost?: number | null;
    tier?: number;
    count?: number | null;
    account?: number | null;
    vote?: number | null;
    owners?: number | null;
  };
  access: {
    write?: number;
    read?: number;
  };
  attributes: {
    [key: string]: {
      name: string | undefined;
      Weight: number;
      cost: number | null;
      selected: string;
      options: {
        [key: string]: {
          name: string | undefined;
          image: string | undefined;
          Weight: number | null;
          account: number | null;
          input: number | null;
          Optionweight: number | null;
        };
      };
    };
  };
};
export type imageSource = {
  attribute: {
    option1: string | undefined;
    option2: string | undefined;
    option3: string | undefined;
  };
};
