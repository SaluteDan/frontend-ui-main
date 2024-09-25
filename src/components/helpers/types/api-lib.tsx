/*
 * Types
 *
 * - A library of types
 * - Used to define the types of the data returned from the API
 *
 */


// Edition Data 
// - Used to define the data returned from the API for the edition
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
        volume?: number | null;
    };
    membership: number | null;
    transaction: string | undefined;
    address: string | undefined;
    attributes: [
        {
            trait_type: string | undefined;
            value: string | number | null;
            cost?: number | null;
            won?: boolean | null;
            rarity?: number | null;
        }
    ];
};

// Archive Data
// - Used to define the data returned from the API for the archive
export type ArchiveData = {
    collection: string | undefined;
    artist: string | null;
    address: string | undefined;
    description: string | undefined;
    opendate: string | undefined;
    royalty: number | null;
    thumbnail: string | undefined;
    mint: {
        limit: number | null;
        cost: number | null;
        tier: number | null;
        count: number | null;
        account: number | null;
        vote: number | null;
        owners: number | null;
    };
    access: {
        write: number | null;
        read: number | null;
    };
};

// Artwork Data
// - Used to define the data returned from the API for the art generator
export type ArtworkData = {
    collection: string | undefined;
    artist: string | undefined;
    address: string | undefined;
    description: string | undefined;
    opendate: string | undefined;
    royalty: number | null;
    mint: {
        limit: number | null;
        cost: number | null;
        tier: number;
        count: number | null;
        volume: number | null;
    };
    access: {
        write: number;
        read: number;
    };
    attributes: [
        {
            trait_type: string | undefined;
            weight: number;
            cost: number | null;
            options: [
                {
                    value: string | undefined;
                    image: string | undefined;
                    weight: number | null;
                    account: number | null;
                    cost: number | null;
                }
            ]
        }
    ];
};

export type imageSource = {
    attribute: [
        {
            [key: string]: string | undefined;
        }
    ];
};
