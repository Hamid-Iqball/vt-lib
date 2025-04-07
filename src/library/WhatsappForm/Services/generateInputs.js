const  extractPlaceholders =(text)=>{
    const regex = /\{\{(\d+)\}\}/g;
    let match;
    const placeholders = new Set();

    while ((match = regex.exec(text)) !== null) {
        placeholders.add(Number(match[1]));
    }
    
    return Array.from(placeholders).sort((a, b) => a - b);
}

export const generateInputs = (data) => {

   const result = {};

    data.forEach(item => {
        if (item.text) {
            const placeholders = extractPlaceholders(item.text);
            if (placeholders.length > 0) {
                result[item.type] = placeholders;
            }
        }
    });

    console.log('results', result)

    return result;
}