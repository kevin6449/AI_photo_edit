
export type AssetItem = 'top' | 'bottom' | 'watch' | 'necklace' | 'earrings' | 'glasses';

export type AssetImages = Record<AssetItem, File | null>;

export interface EditOptions {
    hairstyle: string;
    hairColor: string;
    backgroundStyle: string;
    lightingStyle: string;

    outfitStyle: string;
    accessories: string[];

    age: number;
    effect: string;
    pose: string;
    variations: number;
    quality: number;
    crop: string;
}

export type CropRatio = {
    ratio: number;
    details: string;
};

export type CropRatios = Record<string, CropRatio>;
