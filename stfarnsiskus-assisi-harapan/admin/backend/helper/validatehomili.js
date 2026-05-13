function Validatehomili(date) {
    const requiredFields = ["tema", "author", "detail"];
    
    for (const field of requiredFields) {
        const value = date[field];
        
        if (typeof value !== "string" || !value.trim()) {
            throw Object.assign(new Error(`Field ${field} harus diisi.`), {
                statusCode: 400,
            });
        }
    }
}
