
import { GoogleGenAI, Modality } from "@google/genai";
import type { EditOptions, AssetImages, AssetItem } from '../types';

const fileToGenerativePart = async (file: File) => {
    const base64EncodedDataPromise = new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
        reader.readAsDataURL(file);
    });
    return {
        inlineData: {
            data: await base64EncodedDataPromise,
            mimeType: file.type,
        },
    };
};

const buildPrompt = (options: EditOptions, assets: AssetImages): string => {
    let prompt = `You are a world-class photorealistic portrait retoucher. Your task is to meticulously edit the provided main portrait image based on the following instructions, ensuring the subject's core facial identity and features are preserved.

**Primary Instructions:**
- **Subject's apparent age:** Adjust the subject's appearance to look approximately ${options.age} years old.
- **Background Style:** ${options.backgroundStyle}.
- **Lighting Style:** ${options.lightingStyle}.
- **Pose/Composition:** ${options.pose}.
- **Visual Effect:** Apply a '${options.effect}' effect to the image. If '無效果', maintain natural coloring.

`;

    if (options.hairstyle !== '保持原樣' || options.hairColor !== '保持原樣') {
        prompt += "**Hair:**\n";
        if (options.hairstyle !== '保持原樣') {
            prompt += `- Style: Change the hairstyle to ${options.hairstyle}.\n`;
        }
        if (options.hairColor !== '保持原樣') {
            prompt += `- Color: Change the hair color to ${options.hairColor}.\n`;
        }
    }

    prompt += "\n**Clothing & Accessories:**\n";

    if (assets.top) {
        prompt += "- **Top:** Replace the subject's top with the one from the provided 'Top Reference' image.\n";
    } else if (options.outfitStyle) {
        prompt += `- **Outfit:** Change the subject's outfit to: ${options.outfitStyle}.\n`;
    }
    
    if (assets.bottom) {
        prompt += "- **Bottom:** Replace the subject's bottom clothing with the one from the provided 'Bottom Reference' image.\n";
    }

    const accessoriesToProcess: AssetItem[] = ['watch', 'necklace', 'earrings', 'glasses'];
    accessoriesToProcess.forEach(acc => {
        if (assets[acc]) {
            prompt += `- **${acc.charAt(0).toUpperCase() + acc.slice(1)}:** Add the ${acc} from the provided '${acc.charAt(0).toUpperCase() + acc.slice(1)} Reference' image to the subject.\n`;
        }
    });

    if (options.accessories.length > 0) {
        prompt += `- **Additional Accessories:** If not already provided via reference images, please add the following accessories in a style that complements the overall look: ${options.accessories.join(', ')}.\n`;
    }

    prompt += `
**Output Specifications:**
- **Resolution:** Generate the image with the shortest side being approximately ${options.quality} pixels.
- **Fidelity:** The final image must be photorealistic and high-quality.
- **Identity:** It is absolutely crucial to preserve the person's likeness. Do not change their fundamental facial structure.

The first image provided is the main subject. The other provided images are references for clothing and accessories to be added or swapped onto the main subject.
`;
    return prompt;
};

export const editPortrait = async (
    mainImage: File,
    assets: AssetImages,
    options: EditOptions
): Promise<string[]> => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable is not set.");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const promptText = buildPrompt(options, assets);
    const mainImagePart = await fileToGenerativePart(mainImage);
    const assetParts = await Promise.all(
        (Object.keys(assets) as AssetItem[])
            .filter(key => assets[key])
            .map(async (key) => ({
                part: await fileToGenerativePart(assets[key] as File),
                name: key
            }))
    );
    
    const parts: any[] = [{ text: promptText }, mainImagePart];
    assetParts.forEach(asset => {
        parts.push({text: `${asset.name.charAt(0).toUpperCase() + asset.name.slice(1)} Reference:`});
        parts.push(asset.part);
    });

    const generatedImages: string[] = [];

    for (let i = 0; i < options.variations; i++) {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: { parts: parts },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });
        
        if (response.candidates && response.candidates.length > 0) {
            const imagePart = response.candidates[0].content.parts.find(p => p.inlineData);
            if (imagePart && imagePart.inlineData) {
                generatedImages.push(`data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`);
            } else {
                 const textPart = response.candidates[0].content.parts.find(p => p.text);
                 throw new Error(`API did not return an image. Response: ${textPart?.text || 'No text response'}`);
            }
        } else {
            throw new Error('API returned no candidates in the response.');
        }
    }
    
    if (generatedImages.length === 0) {
        throw new Error('Image generation failed. No images were produced.');
    }

    return generatedImages;
};
