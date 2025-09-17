
import React, { useState } from 'react';
import type { AssetItem } from '../types';
import { Tooltip } from './Tooltip';

interface FileInputProps {
    label: string;
    assetKey: AssetItem;
    onAssetChange: (asset: AssetItem, file: File | null) => void;
    tooltipText: string;
}

export const FileInput: React.FC<FileInputProps> = ({ label, assetKey, onAssetChange, tooltipText }) => {
    const [fileName, setFileName] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        onAssetChange(assetKey, file);
        setFileName(file ? file.name : null);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };
    
    const id = `asset-upload-${assetKey}`;

    return (
        <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
                 <label className="text-sm font-medium text-gray-300">{label}</label>
                 <Tooltip text={tooltipText} />
            </div>
            <div className="flex items-center space-x-2">
                 <label htmlFor={id} className="flex-shrink-0 text-xs bg-gray-600 text-gray-200 font-semibold py-1 px-3 rounded-md cursor-pointer hover:bg-gray-500 transition-colors">
                     選擇檔案
                 </label>
                 <input type="file" id={id} accept="image/*" className="hidden" onChange={handleFileChange} />
                 <span className="text-xs text-gray-400 truncate flex-grow" title={fileName || ''}>{fileName || '未選擇'}</span>
                 {preview && <img src={preview} alt={`${label} preview`} className="h-8 w-8 object-cover rounded-sm" />}
            </div>
        </div>
    );
};
