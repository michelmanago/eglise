import { useState } from "react";

import { capitalize } from "../../utils/utils"

const noCategoryValue = ""

export default function ListEditor({originalPageId, content, setContent, addAttributedMedia, categories}) {
    const [category, setCategory] = useState(() => content);
    console.log(content);

    const onChange = (e) => {
        setCategory(e.currentTarget.value)
        setContent(e.currentTarget.value)
    }
    return (
        <div>
            <div className="text-xl">List</div>
            <select
                value={category || noCategoryValue}
                onChange={onChange}
                className="w-full px-4 py-3 border rounded"
            >
                {/* No category */}
                <option value={noCategoryValue}>Aucune catégorie</option>

                {/* List */}
                {categories.map(cat => (
                    <option key={cat.id} value={cat.title}>
                        {capitalize(cat.title)}
                    </option>
                ))}
            </select>
        </div>
    );
}
