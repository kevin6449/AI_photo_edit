
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ControlsPanel } from './components/ControlsPanel';
import { ResultsDisplay } from './components/ResultsDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import type { EditOptions, AssetItem, AssetImages } from './types';
import { editPortrait } from './services/geminiService';

const App: React.FC = () => {
    const [mainImage, setMainImage] = useState<File | null>(null);
    const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
    
    const initialAssets: AssetImages = {
        top: null,
        bottom: null,
        watch: null,
        necklace: null,
        earrings: null,
        glasses: null,
    };
    const [assetImages, setAssetImages] = useState<AssetImages>(initialAssets);

    const initialOptions: EditOptions = {
        hairstyle: '保持原樣',
        hairColor: '保持原樣',
        backgroundStyle: '白底證件',
        lightingStyle: '專業攝影棚光線',
        outfitStyle: '',
        accessories: [],
        age: 30,
        effect: '無',
        pose: '正面視角（胸上半身）',
        variations: 1,
        quality: 1600,
        crop: 'passport',
    };
    const [editOptions, setEditOptions] = useState<EditOptions>(initialOptions);

    const [generatedImages, setGeneratedImages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleMainImageChange = useCallback((file: File | null) => {
        setMainImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setMainImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setMainImagePreview(null);
        }
    }, []);

    const handleAssetChange = useCallback((asset: AssetItem, file: File | null) => {
        setAssetImages(prev => ({ ...prev, [asset]: file }));
    }, []);

    const handleOptionsChange = useCallback(<K extends keyof EditOptions>(key: K, value: EditOptions[K]) => {
        setEditOptions(prev => ({ ...prev, [key]: value }));
    }, []);
    
    const handleGenerate = async () => {
        if (!mainImage) {
            setError('請先上傳主要人像照片。');
            return;
        }

        setIsLoading(true);
        setError(null);
        setGeneratedImages([]);

        try {
            const results = await editPortrait(mainImage, assetImages, editOptions);
            setGeneratedImages(results);
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : '生成圖片時發生未知錯誤。');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-900">
            <Header />
            <main className="flex-grow flex flex-col md:flex-row p-4 gap-4">
                <ControlsPanel
                    mainImage={mainImage}
                    assetImages={assetImages}
                    editOptions={editOptions}
                    onMainImageChange={handleMainImageChange}
                    onAssetChange={handleAssetChange}
                    onOptionChange={handleOptionsChange}
                    onGenerate={handleGenerate}
                    isLoading={isLoading}
                />
                <div className="flex-grow flex flex-col items-center justify-center w-full md:w-2/3">
                    {isLoading && <LoadingSpinner />}
                    {!isLoading && error && (
                        <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg text-center">
                            <h3 className="font-bold">發生錯誤</h3>
                            <p>{error}</p>
                        </div>
                    )}
                    {!isLoading && !error && (
                         <ResultsDisplay 
                            originalImage={mainImagePreview} 
                            generatedImages={generatedImages}
                        />
                    )}
                </div>
            </main>
        </div>
    );
};

export default App;
