/* EditionData
*
* - This is the expected data structure for edition query
* - In line with Opensea standard
* - Used for edition page
* 
*/

export type EditionData = {
  collection: string | undefined;
  name: number | string | null;
  artist: string | undefined;
  description: string | undefined;
  image: string | undefined;
  external_url?: string | undefined;
  animation_url?: string | undefined;
  mint: {
    cost?: number | null;
    tier?: number | null;
    account?: number | null;
    membership: number | null;
    transaction: string | undefined;
    address: string | undefined;
  };
  attributes: [
    {
      trait_type: string | undefined;
      value: string | number | null;
      cost?: number | null;
      won?: boolean | null;
      rarity?: number | null;
    },
  ];
};

// If useEdition returns an array of these objects
export type EditionArray = EditionData[];
